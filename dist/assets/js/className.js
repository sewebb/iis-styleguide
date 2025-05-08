"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return className;
    }
});
let namespace = null;
function className(classes) {
    if (!namespace) {
        const site = document.getElementById('site');
        if (site && site.hasAttribute('data-namespace')) {
            namespace = site.getAttribute('data-namespace');
        } else {
            namespace = '';
        }
    }
    return classes.split(' ').map((cls)=>`${namespace}${cls}`).join(' ');
}
