"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _Form = /*#__PURE__*/ _interop_require_default(require("./Form"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const elements = document.querySelectorAll('[data-form]');
if (elements.length) {
    elements.forEach((element)=>{
        element.form = new _Form.default(element);
    });
}
