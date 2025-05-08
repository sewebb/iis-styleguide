"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _hasCookieConsent = /*#__PURE__*/ _interop_require_default(require("../../assets/js/hasCookieConsent"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const readspeakerMenuItem = document.querySelector('#readspeakerMenuItem div');
const readspeakerBtn = document.querySelector('#readspeakerBtn');
let consent = (0, _hasCookieConsent.default)('C0003');
function readSpeakerConsent() {
    if (readspeakerBtn && !consent) {
        readspeakerMenuItem.removeAttribute('id');
        readspeakerMenuItem.removeAttribute('class');
        readspeakerBtn.removeAttribute('role');
        readspeakerBtn.removeAttribute('href');
        readspeakerBtn.setAttribute('href', '/om-webbplatsen/lyssna-pa-webbplatsen/');
    }
}
window.addEventListener('consent.onetrust', (e)=>{
    consent = e.detail.includes('C0003');
    if (!consent) {
        readSpeakerConsent();
    }
});
readSpeakerConsent();
