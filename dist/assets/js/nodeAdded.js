"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return nodeAdded;
    }
});
const callbacks = {};
function dispatch(node, cbs) {
    cbs.forEach((cb)=>cb(node));
}
const observer = new MutationObserver((mutations)=>{
    mutations.forEach((mutation)=>{
        mutation.addedNodes.forEach((node)=>{
            if (node.nodeType === Node.ELEMENT_NODE) {
                Object.entries(callbacks).forEach(([selector, selectorCallbacks])=>{
                    if (node.matches(selector)) {
                        dispatch(node, selectorCallbacks);
                    } else if (node.id === 'siteMain') {
                        const child = node.querySelector(selector);
                        if (child) {
                            dispatch(child, selectorCallbacks);
                        }
                    }
                });
            }
        });
    });
});
observer.observe(document.body, {
    childList: true,
    subtree: true
});
function nodeAdded(selector, callback) {
    if (!(selector in callbacks)) {
        callbacks[selector] = [];
    }
    callbacks[selector].push(callback);
    return function unsubscribe() {
        const index = callbacks[selector].indexOf(callback);
        if (index > -1) {
            callbacks[selector].splice(index, 1);
        }
    };
}
