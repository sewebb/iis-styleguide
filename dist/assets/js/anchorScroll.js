"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get animateAnchorScroll () {
        return animateAnchorScroll;
    },
    get default () {
        return _default;
    }
});
const _smoothscroll = /*#__PURE__*/ _interop_require_default(require("smooth-scroll"));
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
const DEFAULT_OPTIONS = {
    speed: 1500,
    speedAsDuration: true,
    easing: 'easeOutCubic',
    ignore: '[data-scroll-ignore]'
};
const EASING_ALIASES = {
    easeout: 'easeOutQuad'
};
const anchorScroll = new _smoothscroll.default('a[href*="#"]', DEFAULT_OPTIONS);
const normalizeOptions = (options = {})=>{
    if (!options || typeof options !== 'object') return {};
    const normalized = _extends({}, options);
    const easing = normalized.easing;
    if (typeof easing === 'string') {
        const alias = EASING_ALIASES[easing.toLowerCase()];
        if (alias) normalized.easing = alias;
    }
    return normalized;
};
const animateAnchorScroll = (target, toggle = null, options = {})=>anchorScroll.animateScroll(target, toggle, _extends({}, DEFAULT_OPTIONS, normalizeOptions(options)));
const _default = anchorScroll;
