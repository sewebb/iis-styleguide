'use strict';

var _debounce = require('../../assets/js/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var slidingForm = document.querySelector('[class*="--sliding"]');
var staticForm = document.querySelector('[class*="--static"]');
var closeButton = document.querySelector('[class*="--sliding"] .js-close-mailchimp-popup');
var timeout = void 0;
var timer = void 0;
var throttle = 66; // Trigger event every 66ms
var visibleClass = 'is-visible';
var cookieName = 'internetstiftelsen-mailchimp-form-closed';
var currentProtocol = document.location.protocol;
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var noForm = urlParams.get('noForm');

// Set cookie
function setCookie(name, value, days) {
	var d = new Date();
	d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);

	if (currentProtocol === 'https:') {
		document.cookie = name + '=' + value + ';path=/;SameSite=Strict;Secure;expires=' + d.toGMTString();
	} else {
		document.cookie = name + '=' + value + ';path=/;SameSite=Strict;expires=' + d.toGMTString();
	}
}

// Get cookie
function getCookie(name) {
	var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
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
	var top = element.offsetTop;
	var height = element.offsetHeight;

	while (element.offsetParent) {
		element = element.offsetParent; // eslint-disable-line
		top += element.offsetTop;
	}

	return top < window.pageYOffset + window.innerHeight && top + height > window.pageYOffset;
}

function slideForm() {
	if (!getCookie(cookieName)) {
		var inViewport = isInViewport(staticForm);
		clearTimeout(timer);

		if (!inViewport) {
			// The static form is not in the viewport, start timeout to show the sliding form
			timer = setTimeout(function () {
				slidingForm.classList.add(visibleClass);
				slidingForm.setAttribute('aria-hidden', 'false');
			}, timeout);
		} else {
			slidingForm.classList.remove(visibleClass);
			slidingForm.setAttribute('aria-hidden', 'true');
		}
	}
}

var elementIsInViewport = (0, _debounce2.default)(function () {
	if (slidingForm) {
		slideForm();
	}
}, throttle);

window.addEventListener('scroll', function () {
	elementIsInViewport();
});
function closeForm() {
	setCookie(cookieName, 'YES', 7);
	slidingForm.classList.remove(visibleClass);
	slidingForm.setAttribute('aria-hidden', 'true');
}

if (closeButton) {
	closeButton.addEventListener('click', function () {
		closeForm();
	});
}