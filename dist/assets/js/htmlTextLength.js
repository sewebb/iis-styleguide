"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return htmlTextLength;
    }
});
function htmlTextLength(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent.length;
}
