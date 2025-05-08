"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return track;
    }
});
function track(data) {
    if (window._mtm) {
        window._mtm.push(data);
    } else {
        console.log('Matomo not loaded', data);
    }
}
