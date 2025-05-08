/**
 * Creates a document fragment from a string of html content
 *
 * @param html
 * @returns {DocumentFragment}
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _default = (html)=>document.createRange().createContextualFragment(html);
