"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return getCurrentCueIndex;
    }
});
function getCurrentCueIndex(target) {
    const activeCue = target.activeCues[0];
    const { cues } = target;
    return Math.max(Array.prototype.indexOf.call(cues, activeCue), 0);
}
