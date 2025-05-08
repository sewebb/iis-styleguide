"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _track = /*#__PURE__*/ _interop_require_default(require("../../assets/js/track"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const haveIBeenPwnedSubmit = document.querySelector('#o-search-result-submit');
if (haveIBeenPwnedSubmit) {
    haveIBeenPwnedSubmit.addEventListener('submit', function() {
        (0, _track.default)({
            event: 'guided_tour'
        });
    });
}
