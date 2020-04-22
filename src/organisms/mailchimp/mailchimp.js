const slidingForm = document.querySelector('[class*="--sliding"]');
const staticForm = document.querySelector('[class*="--static"]');
const closeButton = document.querySelector('[class*="--sliding"] .js-close-mailchimp-popup');
const timeout = slidingForm.getAttribute('data-timeout');
let timer;
const throttle = 66; // Trigger event every 66ms
const visibleClass = 'is-visible';
const cookieName = 'internetstiftelsen-mailchimp-form-closed';
const currentProtocol = document.location.protocol;

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

function isInViewport(element) {
	let top = element.offsetTop;
	const height = element.offsetHeight;

	while (element.offsetParent) {
		element = element.offsetParent; // eslint-disable-line
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
			}, timeout);
		} else {
			slidingForm.classList.remove(visibleClass);
		}
	}
}

const debounce = (func, delay) => {
	let inDebounce;

	return (...args) => {
		const context = this;
		clearTimeout(inDebounce);
		inDebounce = setTimeout(() => func.apply(context, args), delay);
	};
};

const elementIsInViewport = debounce(() => {
	if (slidingForm) {
		slideForm();
	}
}, throttle);

window.addEventListener('scroll', () => {
	elementIsInViewport();
});
function closeForm() {
	setCookie(cookieName, 'YES', 1);
	slidingForm.classList.remove(visibleClass);
	slidingForm.tabIndex = -1;
}

if (closeButton) {
	closeButton.addEventListener('click', () => {
		closeForm();
	});
}
