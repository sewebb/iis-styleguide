import debounce from '../../assets/js/debounce';
import hasCookieConsent from '../../assets/js/hasCookieConsent';

let consent = hasCookieConsent('C0003');

const slidingForm = document.querySelector('[class*="--sliding"]');
const staticForm = document.querySelector('[class*="--static"]');
const closeButton = document.querySelector('[class*="--sliding"] .js-close-mailchimp-popup');
let timeout;
let timer;
const throttle = 66; // Trigger event every 66ms
const visibleClass = 'is-visible';
const cookieName = 'internetstiftelsen-mailchimp-form-closed';
const currentProtocol = document.location.protocol;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const noForm = urlParams.get('noForm');

// Set cookie
function setCookie(name, value, days) {
	const d = new Date();
	d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);

	if (currentProtocol === 'https:') {
		document.cookie = `${name}=${value};path=/;SameSite=Strict;Secure;expires=${d.toGMTString()}`;
	} else {
		document.cookie = `${name}=${value};path=/;SameSite=Strict;expires=${d.toGMTString()}`;
	}
}

// Get cookie
function getCookie(name) {
	const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
	return v ? v[2] : null;
}

// User is sent from email campaign with URL parameter ?noForm=true,
// set cookie and don't show slide-in form
if (noForm) {
	setCookie(cookieName, 'YES', 7);
}

if (slidingForm) {
	timeout = slidingForm.getAttribute('data-slider-delay');

	// Add hidden attribute on page load
	slidingForm.setAttribute('aria-hidden', 'true');
}

function isInViewport(element) {
	let top = element.offsetTop;
	const height = element.offsetHeight;

	while (element.offsetParent) {
		// eslint-disable-next-line no-param-reassign
		element = element.offsetParent;
		top += element.offsetTop;
	}

	return (
		top < (window.pageYOffset + window.innerHeight)
		&& (top + height) > window.pageYOffset
	);
}

function slideForm() {
	if (!getCookie(cookieName)) {
		const inViewport = isInViewport(staticForm);
		clearTimeout(timer);

		if (!inViewport) {
			// The static form is not in the viewport, start timeout to show the sliding form
			timer = setTimeout(() => {
				slidingForm.classList.add(visibleClass);
				slidingForm.setAttribute('aria-hidden', 'false');
			}, timeout);
		} else {
			slidingForm.classList.remove(visibleClass);
			slidingForm.setAttribute('aria-hidden', 'true');
		}
	}
}

const elementIsInViewport = debounce(() => {
	if (consent && slidingForm) {
		slideForm();
	}
}, throttle);

window.addEventListener('scroll', () => {
	elementIsInViewport();
});


function closeForm() {
	setCookie(cookieName, 'YES', 7);
	slidingForm.classList.remove(visibleClass);
	slidingForm.setAttribute('aria-hidden', 'true');
}

if (closeButton) {
	closeButton.addEventListener('click', () => {
		closeButton.blur();
		closeForm();
	});
}
