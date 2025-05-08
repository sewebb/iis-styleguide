"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _className = /*#__PURE__*/ _interop_require_default(require("./className"));
const _htmlTextLength = /*#__PURE__*/ _interop_require_default(require("./htmlTextLength"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class CharCounter {
    waitForEditor() {
        if (this.el.editor) {
            this.build();
            this.attach();
        } else {
            this.el.addEventListener('editor-ready', ()=>{
                this.build();
                this.attach();
            });
        }
    }
    count() {
        if (this.isRichText) {
            return (0, _htmlTextLength.default)(this.el.editor.getHTML());
        }
        return this.el.value.length;
    }
    setCountText() {
        const count = this.count();
        if (this.min && count < this.min) {
            this.counterEl.textContent = `${count}/${this.min}`;
            this.counterEl.className = `backgrond-ruby-light ${(0, _className.default)('a-meta')}`;
            this.el.setAttribute('aria-invalid', 'true');
            return;
        }
        if (this.max && count > this.max) {
            this.counterEl.textContent = `${count}/${this.max}`;
            this.counterEl.className = `background-ruby-light ${(0, _className.default)('a-meta')}`;
            this.el.setAttribute('aria-invalid', 'true');
            return;
        }
        this.counterEl.textContent = `${count}/${this.max || this.min}`;
        this.counterEl.className = `background-jade-light ${(0, _className.default)('a-meta')}`;
        this.el.removeAttribute('aria-invalid');
        this.counterEl.closest('.field-group').classList.remove('is-invalid');
    }
    build() {
        const counter = document.createElement('small');
        let wrapper;
        if (this.isRichText) {
            wrapper = this.el.editor.options.element;
            wrapper.style.paddingRight = '3.8333333333rem';
        } else {
            wrapper = document.createElement('div');
            wrapper.className = 'u-position-relative';
            this.el.parentNode.insertBefore(wrapper, this.el);
            wrapper.appendChild(this.el);
            this.el.style.paddingRight = '3.8333333333rem';
        }
        counter.className = `color-cyberspace ${(0, _className.default)('a-meta')}`;
        counter.style.cssText = 'position: absolute; top: .5rem; right: .5rem; z-index: 501;background-color: #ff9fb4; border-radius: 0.25rem; padding: .25rem; line-height: 1;margin: 0';
        wrapper.appendChild(counter);
        this.counterEl = counter;
        this.setCountText();
    }
    attach() {
        if (this.isRichText) {
            this.el.editor.on('update', ()=>{
                this.setCountText();
            });
        } else {
            this.el.addEventListener('input', ()=>{
                this.setCountText();
            });
        }
    }
    constructor(el){
        this.el = el;
        this.counterEl = null;
        this.isRichText = this.el.dataset.richText !== undefined;
        this.min = parseInt(this.el.getAttribute('data-min') || 0, 10);
        this.max = parseInt(this.el.getAttribute('data-max') || 0, 10);
        if (!this.min && !this.max) {
            console.warn('Either min or max must be set and greater than 0.');
            return;
        }
        if (this.isRichText) {
            this.waitForEditor();
            return;
        }
        this.build();
        this.attach();
    }
}
const elements = document.querySelectorAll('[data-min], [data-max]');
elements.forEach((el)=>{
    el.charCounter = new CharCounter(el);
});
