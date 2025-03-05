import hasCookieConsent from '../../assets/js/hasCookieConsent';

const readspeakerMenuItem = document.querySelector('#readspeakerMenuItem div');
const readspeakerBtn = document.querySelector('#readspeakerBtn');
let consent = hasCookieConsent('C0003');

function readSpeakerConsent() {
	if(readspeakerBtn && !consent) {
		readspeakerMenuItem.removeAttribute('id');
		readspeakerMenuItem.removeAttribute('class');
		readspeakerBtn.removeAttribute('role');
		readspeakerBtn.removeAttribute('href');
		readspeakerBtn.setAttribute('href','/om-webbplatsen/lyssna-pa-webbplatsen/');
	}
}

window.addEventListener('consent.onetrust', (e) => {
	consent = e.detail.includes('C0003');

	if(!consent) {
		readSpeakerConsent();
	}
});

readSpeakerConsent();
