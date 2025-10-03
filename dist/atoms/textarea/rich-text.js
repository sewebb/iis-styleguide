"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get init () {
        return init;
    },
    get setupTextArea () {
        return setupTextArea;
    }
});
const _core = require("@tiptap/core");
const _extensiondocument = /*#__PURE__*/ _interop_require_default(require("@tiptap/extension-document"));
const _extensionparagraph = /*#__PURE__*/ _interop_require_default(require("@tiptap/extension-paragraph"));
const _extensiontext = /*#__PURE__*/ _interop_require_default(require("@tiptap/extension-text"));
const _extensionbulletlist = /*#__PURE__*/ _interop_require_default(require("@tiptap/extension-bullet-list"));
const _extensionorderedlist = /*#__PURE__*/ _interop_require_default(require("@tiptap/extension-ordered-list"));
const _extensionheading = /*#__PURE__*/ _interop_require_default(require("@tiptap/extension-heading"));
const _extensionlistitem = /*#__PURE__*/ _interop_require_default(require("@tiptap/extension-list-item"));
const _extensionbold = /*#__PURE__*/ _interop_require_default(require("@tiptap/extension-bold"));
const _extensionitalic = /*#__PURE__*/ _interop_require_default(require("@tiptap/extension-italic"));
const _extensionlink = require("@tiptap/extension-link");
const _extensionhistory = /*#__PURE__*/ _interop_require_default(require("@tiptap/extension-history"));
const _className = /*#__PURE__*/ _interop_require_default(require("../../assets/js/className"));
const _modal = require("../../molecules/modal/modal");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function clearAndCapitalize(str) {
    return str.replace(/-/, '').toUpperCase();
}
function kebabToCamel(str) {
    return str.replace(/-\w/g, clearAndCapitalize);
}
function kebabToPascal(str) {
    return str.replace(/(^\w|-\w)/g, clearAndCapitalize);
}
function insertHeading(button, editor) {
    const levelAttr = button.dataset.richTextControl;
    const level = parseInt(levelAttr.replace('heading-', ''), 10);
    editor.commands.toggleHeading({
        level
    });
    const toolbar = button.parentElement; // The toolbar div
    const headingButtons = toolbar.querySelectorAll('button[data-rich-text-control^="heading-"]');
    headingButtons.forEach((btn)=>{
        btn.classList.remove('is-active');
    });
    if (editor.isActive('heading', {
        level
    })) {
        button.classList.add('is-active');
    }
}
function insertLink(el, editor) {
    const addLink = (e, modal, close)=>{
        e.preventDefault();
        let value = modal.querySelector('input').value.trim();
        if (!value.length) {
            editor.commands.unsetLink();
        } else {
            const isAbsolute = new RegExp('(?:^[a-z][a-z0-9+.-]*:|//)', 'i');
            if (!isAbsolute.test(value)) {
                value = `https://${value}`;
            }
            editor.commands.toggleLink({
                href: value
            });
        }
        close();
    };
    if (editor.view.state.selection.empty) {
        return;
    }
    const currentValue = editor.getAttributes('link').href ? editor.getAttributes('link').href : '';
    (0, _modal.open)({
        title: 'Lägg till länk',
        content: `
			<p class="u-m-b-0 u-m-t-default"><input type="url" value="${currentValue}" class="${(0, _className.default)('a-input')}"></p>
		`,
        actions: [
            {
                text: 'Avbryt',
                color: 'transparent',
                attrs: {
                    'data-modal-close': null
                }
            },
            {
                text: 'Spara',
                modifier: 'primary',
                key: 'enter',
                onClick: addLink
            }
        ]
    }, {
        onOpen (id, modal) {
            modal.querySelector('input').focus();
        }
    });
}
function createToolbarButton(el, control, editor) {
    const button = document.createElement('button');
    const iconId = [
        'link'
    ].includes(control) ? control : `richtext-${control}`;
    button.setAttribute('data-rich-text-control', control);
    button.value = kebabToCamel(control);
    button.innerHTML = `
		<span class="u-visuallyhidden">${control.replace('-', ' ')}</span>
		<svg class="icon">
			<use xlink:href="#icon-${iconId}"></use>
		</svg>
	`;
    el.appendChild(button);
    button.addEventListener('click', (e)=>{
        e.preventDefault();
        if (control === 'link') {
            insertLink(el, editor);
        } else if (control === 'heading-2' || control === 'heading-3') {
            insertHeading(button, editor);
        } else {
            const method = `toggle${kebabToPascal(control)}`;
            editor.chain().focus()[method]().run();
        }
    });
}
function toogleButtonState(editor, el) {
    const buttons = el.parentNode.querySelectorAll('[data-rich-text-control]');
    buttons.forEach((button)=>{
        const control = button.getAttribute('data-rich-text-control');
        const value = kebabToCamel(control);
        // 🧠 Handle heading separately
        if (control === 'heading-2' || control === 'heading-3') {
            const level = parseInt(control.replace('heading-', ''), 10);
            if (editor.isActive('heading', {
                level
            })) {
                button.classList.add('is-active');
            } else {
                button.classList.remove('is-active');
            }
            return;
        }
        // 🔠 Handle all others like bold, italic, bullet-list, etc.
        if (editor.isActive(value)) {
            button.classList.add('is-active');
        } else {
            button.classList.remove('is-active');
        }
        // 🔗 Special logic for link
        if (value === 'link') {
            button.disabled = editor.view.state.selection.empty;
        }
    });
}
function createToolbar(el, editor) {
    const toolbar = document.createElement('div');
    toolbar.className = (0, _className.default)('a-textarea__toolbar');
    el.parentNode.insertBefore(toolbar, el);
    [
        'heading-2',
        'heading-3',
        'bold',
        'italic',
        'link',
        'bullet-list',
        'ordered-list'
    ].forEach((control)=>{
        createToolbarButton(toolbar, control, editor);
    });
}
function getHTML(editor) {
    const html = editor.getHTML();
    return html.replace(/<li><p>/g, '<li>').replace(/<\/p><\/li>/g, '</li>');
}
function setupTextArea(el, onChange = ()=>{}) {
    const editorEl = document.createElement('div');
    const editor = new _core.Editor({
        element: editorEl,
        extensions: [
            _extensiondocument.default,
            _extensionparagraph.default,
            _extensiontext.default,
            _extensionlistitem.default,
            _extensionbulletlist.default,
            _extensionorderedlist.default,
            _extensionheading.default.configure({
                levels: [
                    2,
                    3
                ]
            }),
            _extensionbold.default,
            _extensionitalic.default,
            _extensionlink.Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'u-link'
                }
            }),
            _extensionhistory.default.configure({
                depth: 10
            })
        ],
        content: el.value,
        onTransaction (props) {
            toogleButtonState(props.editor, editorEl);
        },
        onUpdate (props) {
            const html = getHTML(props.editor);
            el.value = html;
            onChange(html);
        }
    });
    editorEl.className = el.className;
    editorEl.classList.add((0, _className.default)('a-textarea--rich-text'));
    el.classList.add((0, _className.default)('a-textarea--hidden'));
    el.editor = editor;
    el.parentNode.insertBefore(editorEl, el);
    createToolbar(editorEl, editor);
    const event = new CustomEvent('editor-ready', {
        detail: {
            editor
        }
    });
    el.dispatchEvent(event);
}
function init() {
    const els = document.querySelectorAll('textarea[data-rich-text]');
    if (els.length) {
        [].forEach.call(els, (el)=>setupTextArea(el));
    }
}
init();
