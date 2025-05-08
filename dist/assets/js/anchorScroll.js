"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _smoothscroll = /*#__PURE__*/ _interop_require_default(require("smooth-scroll"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const anchorScroll = new _smoothscroll.default('a[href*="#"]', {
    speed: 1500,
    speedAsDuration: true,
    easing: 'easeOutCubic',
    ignore: '[data-scroll-ignore]'
});
const _default = anchorScroll;
