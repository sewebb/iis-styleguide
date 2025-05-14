"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return focusTrap;
    }
});
const _focustrap = require("focus-trap");
function getContainer(element) {
    return document.getElementById(element.getAttribute('data-a11y-toggle'));
}
function focusTrap(container) {
    if (container && container.getAttribute('data-focus-trap') !== 'false' && !container.focusTrap) {
        container.focusTrap = (0, _focustrap.createFocusTrap)(`#${container.id}`, {
            clickOutsideDeactivates: true
        });
        container.setAttribute('data-focus-trap', 'true');
    }
}
const buttons = document.querySelectorAll('[data-a11y-toggle]');
[].forEach.call(buttons, (button)=>{
    const container = getContainer(button);
    if (!container) {
        return;
    }
    container.setAttribute('data-container', 'true');
    if (!container.focusTrap) {
        focusTrap(container);
    }
});
function delegate(handler, e) {
    const target = e.target.closest('[data-a11y-toggle]');
    if (!target) {
        return;
    }
    handler(e, target);
}
function handleKeyDown(e, element) {
    if (element.getAttribute('aria-expanded') === 'true') {
        return;
    }
    if (e.keyCode === 9) {
        const container = getContainer(element);
        if (container) {
            container.tabIndex = -1;
        }
    }
}
function handleFocusTrap(e, element) {
    const container = getContainer(element);
    if (!container) {
        return;
    }
    focusTrap(container);
    // Run on next tick
    setTimeout(()=>{
        if (container.getAttribute('aria-hidden') === 'false') {
            container.tabIndex = 0;
            if (container.focusTrap) {
                container.focusTrap.activate();
            }
        } else {
            if (container.focusTrap) {
                container.focusTrap.deactivate();
            }
            container.addEventListener('transitionend', ()=>{
                container.tabIndex = -1;
            }, {
                once: true
            });
        }
    }, 0);
}
document.addEventListener('click', delegate.bind(null, handleFocusTrap));
document.addEventListener('keydown', delegate.bind(null, handleKeyDown), {
    once: true
});
