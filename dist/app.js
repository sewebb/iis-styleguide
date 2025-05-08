"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("a11y-toggle");
require("./focusTrap");
require("./assets/js/conditional");
require("./atoms/grid-toggle/grid-toggle");
require("./components");
const _Button = /*#__PURE__*/ _interop_require_default(require("./atoms/button/Button"));
const _modal = require("./molecules/modal/modal");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const demoButtons = document.querySelectorAll('button.a-button.has-loader');
if (demoButtons.length) {
    demoButtons.forEach((button)=>{
        const b = new _Button.default(button);
        button.addEventListener('click', ()=>{
            if (b.isLoading()) {
                return;
            }
            b.start();
            setTimeout(()=>{
                b.stop();
            }, 2000);
        });
    });
}
const demoModal = document.querySelector('[data-open-demo-modal]');
if (demoModal) {
    demoModal.addEventListener('click', ()=>{
        (0, _modal.open)({
            title: 'My modal title',
            content: '<p>My modal content.</p>',
            actions: [
                {
                    text: 'Close modal',
                    color: 'peacock-light',
                    modifier: 'primary',
                    attrs: {
                        'data-modal-close': null
                    }
                },
                {
                    text: 'Replace modal',
                    color: 'ruby-light',
                    modifier: 'secondary',
                    attrs: {
                        'data-modal-open': 'modal-container',
                        'data-modal-replace': true
                    }
                }
            ]
        }, {
            onClose: (id)=>console.log('close', id),
            onOpen: (id)=>console.log('open', id)
        });
    });
}
const demoForms = document.querySelectorAll('[data-form]');
[].forEach.call(demoForms, (el)=>{
    if ('form' in el) {
        el.form.events.on('success', (data)=>{
            console.log('Form success', data);
        });
    }
});
