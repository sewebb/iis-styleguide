const cookieBar = document.querySelector('.js-cookie-disclaimer');
const visibleClass = 'is-visible';
const cookieName = 'internetstiftelsen-cookie-consent';
const testCookieSupport = 'Cookies are enabled';
const acceptButton = document.getElementById('js-accept-cookies');
const currentProtocol = document.location.protocol;
let { cookieEnabled } = navigator.cookieEnabled;

// Cookies are disabled
function showCookieFail() {
	console.warn('Cookies are disabled, engage tinfoil hat mode.');
}

// Check for cookie support
(function checkCookieSupport() {
	if (!cookieEnabled) {
		if (currentProtocol === 'https:') {
			document.cookie = `${testCookieSupport}=Yes;path=/;SameSite=Strict;Secure;`;
		} else {
			document.cookie = `${testCookieSupport}=Yes;path=/;SameSite=Strict;`;
		}

		cookieEnabled = document.cookie.indexOf(testCookieSupport) !== -1;
	}
	return cookieEnabled || showCookieFail();
}());

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

// No cookie set? Show cookie disclaimer bar
if (!getCookie(cookieName) && cookieEnabled) {
	if (cookieBar) {
		cookieBar.classList.add(visibleClass);
	}
}

// Cookies accepted
function acceptCookies() {
	setCookie(cookieName, 'YES', 365);
	if (cookieBar) {
		cookieBar.classList.remove(visibleClass);
	}
}

// Button click
if (acceptButton) {
	acceptButton.addEventListener('click', acceptCookies);
}
