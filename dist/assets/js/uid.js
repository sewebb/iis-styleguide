"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return uid;
    }
});
function uid() {
    return (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, '');
}
