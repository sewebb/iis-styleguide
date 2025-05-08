"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return hasCookieConsent;
    }
});
const _getCookieByName = /*#__PURE__*/ _interop_require_default(require("./getCookieByName"));
const _queryToObj = /*#__PURE__*/ _interop_require_default(require("./queryToObj"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function hasCookieConsent(category, defaultIfNoCookie = true) {
    const cookie = (0, _getCookieByName.default)('OptanonConsent');
    if (!cookie) {
        return defaultIfNoCookie;
    }
    const cookieObj = (0, _queryToObj.default)(cookie);
    if (!('groups' in cookieObj)) {
        return defaultIfNoCookie;
    }
    const groups = Object.fromEntries(cookieObj.groups.split(',').map((group)=>group.trim().split(':')));
    if (!(category in groups)) {
        return defaultIfNoCookie;
    }
    return groups[category] === '1';
}
