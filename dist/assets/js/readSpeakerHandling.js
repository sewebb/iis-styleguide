'use strict';

var _hasCookieConsent = require('../../assets/js/hasCookieConsent');

var _hasCookieConsent2 = _interopRequireDefault(_hasCookieConsent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readspeakerMenuItem = document.querySelector('#readspeakerMenuItem div');
var readspeakerBtn = document.querySelector('#readspeakerBtn');
var consent = (0, _hasCookieConsent2.default)('C0003');

function readSpeakerConsent() {
	if (readspeakerBtn && !consent) {
		readspeakerMenuItem.removeAttribute('id');
		readspeakerMenuItem.removeAttribute('class');
		readspeakerBtn.removeAttribute('role');
		readspeakerBtn.removeAttribute('href');
		readspeakerBtn.setAttribute('href', '/om-webbplatsen/lyssna-pa-webbplatsen/');
	}
}

window.addEventListener('consent.onetrust', function (e) {
	consent = e.detail.includes('C0003');

	if (!consent) {
		readSpeakerConsent();
	}
});

readSpeakerConsent();