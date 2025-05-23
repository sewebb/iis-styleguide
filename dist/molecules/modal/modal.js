"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    clearQueue: function() {
        return clearQueue;
    },
    close: function() {
        return close;
    },
    onClose: function() {
        return onClose;
    },
    onOpen: function() {
        return onOpen;
    },
    open: function() {
        return open;
    }
});
const _focusTrap = /*#__PURE__*/ _interop_require_default(require("../../focusTrap"));
const _className = /*#__PURE__*/ _interop_require_default(require("../../assets/js/className"));
function _extends() {
    _extends = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
/**
 * Modal action
 * @typedef {Object} ModalAction
 * @property {string} icon - icon name
 * @property {string} color - styleguide color
 * @property {string} modifier - styleguide modifier
 * @property {string} text - action content
 * @property {string} url - action link url
 * @property {string} target - action link target
 * @property {string} key - action click handler key shortcut
 * @property {function} onClick - action click handler
 * @property {object} attrs – action element attributes
 */ /**
 * Modal content
 * @typedef {Object} ModalContent
 * @property {string} title - Modal title
 * @property {string} content - Modal content
 * @property {ModalAction[]} actions - Modal actions
 */ /**
 * Modal settings
 * @typedef {Object} ModalSettings
 * @property {boolean} replaceCurrent - Replace currently displayed modal
 * @property {boolean} skipIfCurrent - Skip if currently displaying modal
 * @property {function} onClose - onClose callback
 * @property {function} onOpen - onOpen callback
 */ const queue = [];
const globalOnCloseCallbacks = [];
const globalOnOpenCallbacks = [];
let active = null;
let incrementId = 0;
let modal = null;
let modalContent = null;
let modalActions = null;
let modalClose = null;
let keyHandlers = {};
/**
 * Increase increment ID and return the latest
 *
 * @returns {number}
 */ function getId() {
    incrementId += 1;
    return incrementId;
}
function objectToAttributes(obj) {
    return Object.entries(obj).filter(([, value])=>value !== undefined).map(([key, value])=>value !== null ? `${key}=${value}` : key).join(' ');
}
/**
 * Create an action DOM node and append to modal actions container.
 *
 * @param {ModalAction} action
 */ function addAction(action) {
    const icon = action.icon ? `
		<svg class="icon ${(0, _className.default)('a-button__icon')}">
			<use xlink:href="#icon-${action.icon}"></use>
		</svg>
	` : '';
    let cls = `${(0, _className.default)('a-button')} u-m-l-2`;
    if (action.color) {
        cls += ` ${(0, _className.default)(`a-button--${action.color}`)}`;
    }
    if (action.modifier) {
        cls += ` ${(0, _className.default)(`m-modal__button-${action.modifier}`)}`;
    }
    if (action.icon) {
        cls += ` ${(0, _className.default)('a-button--icon')}`;
    }
    const tag = action.url ? 'a' : 'button';
    const button = `
		<${tag} ${objectToAttributes(_extends({}, action.attrs, {
        href: action.url,
        target: action.target
    }))} class="${cls}">
			<span class="${(0, _className.default)('a-button__text')}">${action.text}</span>
			${icon}
		</${tag}>
	`;
    const dummy = document.createElement('div');
    dummy.innerHTML = button;
    const el = dummy.firstElementChild;
    modalActions.appendChild(el);
    if (action.onClick) {
        el.addEventListener('click', (e)=>{
            action.onClick(e, modal, close);
        });
    }
}
function handleKeyUp(e) {
    Object.entries(keyHandlers).forEach(([key, handler])=>{
        if (e.key.toLowerCase() === key) {
            handler(e, modal, close);
        }
    });
}
function onOpen(cb) {
    const index = globalOnOpenCallbacks.push(cb) - 1;
    return ()=>{
        globalOnOpenCallbacks.splice(index, 1);
    };
}
function dispatchOnOpenHandlers(el, id) {
    globalOnOpenCallbacks.forEach((cb)=>cb(el, id));
}
/**
 * Display the active modal.
 */ function display() {
    if (active.content.nodeName) {
        // Content is a custom modal
        active.el = active.content;
    } else {
        active.el = modal;
        modalContent.innerHTML = `
			<h1>${active.content.title}</h1>
			${active.content.content}
		`;
        if (active.content.actions) {
            modalActions.innerHTML = '';
            active.content.actions.forEach(addAction);
            modalActions.classList.remove('u-hide');
        } else {
            modalActions.classList.add('u-hide');
        }
    }
    (0, _focusTrap.default)(active.el);
    active.el.setAttribute('aria-hidden', 'false');
    active.el.setAttribute('data-a11y-toggle-open', 'true');
    if (active.settings.onOpen) {
        active.settings.onOpen(active.id, active.el);
    }
    dispatchOnOpenHandlers(active.el, active.id);
    setTimeout(()=>{
        if (active.el.focusTrap) {
            active.el.focusTrap.activate();
        }
    }, 1);
    // Just to make sure
    keyHandlers = {};
    if (active.content.actions) {
        active.content.actions.forEach((action)=>{
            if (action.key && action.onClick) {
                keyHandlers[action.key] = action.onClick;
            }
        });
    }
    document.addEventListener('keyup', handleKeyUp);
}
/**
 * Dispatch the next modal in queue.
 */ function dispatch() {
    if (!modal || active || !queue.length) {
        return;
    }
    active = queue.shift();
    display();
}
function onClose(cb) {
    const index = globalOnCloseCallbacks.push(cb) - 1;
    return ()=>{
        globalOnCloseCallbacks.splice(index, 1);
    };
}
function dispatchOnCloseHandlers(el, id) {
    globalOnCloseCallbacks.forEach((cb)=>cb(el, id));
}
/**
 * Close currently active modal
 * and dispatch next in queue.
 */ function close() {
    if (active) {
        active.el.setAttribute('aria-hidden', 'true');
        active.el.removeAttribute('data-a11y-toggle-open');
        if (active.settings.onClose) {
            active.settings.onClose(active.id);
        }
        dispatchOnCloseHandlers(active.el, active.id);
        document.removeEventListener('keyup', handleKeyUp);
        if (active.el.focusTrap) {
            active.el.focusTrap.deactivate();
        }
        keyHandlers = {};
        active = null;
    }
    setTimeout(()=>{
        dispatch();
    }, 1);
}
/**
 * Create the modal skeleton and add it to the DOM.
 * Done once and cached.
 */ function createModal() {
    if (modal) {
        return;
    }
    const id = 'iisModal';
    const dummy = document.createElement('div');
    dummy.innerHTML = `
		<div id="${id}" class="${(0, _className.default)('m-modal m-modal--has-overlay')}" data-container="true" aria-hidden="true" aria-labelledby="${id}-close">
			<div class="${(0, _className.default)('m-modal__container')}">
				<button type="button" class="${(0, _className.default)('a-button a-button--standalone-icon a-button--transparent')}" data-modal-close aria-expanded="false" data-a11y-toggle="${id}" aria-controls="${id}" id="${id}-close">
					<span class="${(0, _className.default)('a-button__text')} u-visuallyhidden">Stäng</span>
					<svg class="icon ${(0, _className.default)('a-button__icon')}">
						<use xlink:href="#icon-close"></use>
					</svg>
				</button>
				<div class="${(0, _className.default)('m-modal__content')}" data-modal-content></div>
				<div class="${(0, _className.default)('m-modal__buttons')} u-m-t-2 u-hide" data-modal-actions></div>
			</div>
		</div>
	`;
    modal = dummy.firstElementChild;
    modalContent = modal.querySelector('[data-modal-content]');
    modalActions = modal.querySelector('[data-modal-actions]');
    modalClose = modal.querySelector('[data-modal-close]');
    document.body.appendChild(modal);
    modalClose.addEventListener('click', close);
    setTimeout(()=>{
        dispatch();
    }, 1);
}
/**
 * Clear the current modal queue
 */ function clearQueue() {
    queue.length = 0;
}
/**
 * Open a modal.
 *
 * @param {ModalContent|HTMLElement} content
 * @param {ModalSettings} settings
 */ function open(content, settings = {}) {
    if (active && settings.skipIfCurrent) {
        return;
    }
    queue.push({
        id: getId(),
        content,
        settings
    });
    if (settings.replaceCurrent) {
        close();
    } else {
        dispatch();
    }
}
function delegate(e) {
    const openModal = e.target.closest('[data-modal-open]');
    if (openModal) {
        e.preventDefault();
        e.stopPropagation();
        const id = openModal.getAttribute('data-modal-open');
        const modalEl = document.getElementById(id);
        document.querySelector('body').classList.add('prevent-scroll');
        if (modalEl) {
            open(modalEl, {
                replaceCurrent: openModal.hasAttribute('data-modal-replace'),
                skipIfCurrent: openModal.hasAttribute('data-modal-skip')
            });
            [].forEach.call(document.querySelectorAll(`[aria-controls="${id}"]`), (el)=>{
                el.setAttribute('aria-expanded', 'true');
            });
        }
        return false;
    }
    const closeModal = e.target.closest('[data-modal-close]');
    if (closeModal) {
        e.preventDefault();
        e.stopPropagation();
        const id = closeModal.getAttribute('data-modal-close') || active && active.el.id;
        document.querySelector('body').classList.remove('prevent-scroll');
        if (active && active.el.id === id) {
            close();
            [].forEach.call(document.querySelectorAll(`[aria-controls="${id}"]`), (el)=>{
                el.setAttribute('aria-expanded', 'false');
            });
        }
        return false;
    }
    return true;
}
/**
 * Attach global listeners
 */ function attach() {
    document.body.addEventListener('click', delegate);
}
createModal();
attach();
