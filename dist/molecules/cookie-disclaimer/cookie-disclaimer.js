'use strict';

var cookieBar = document.querySelector('.js-cookie-disclaimer');
var visibleClass = 'is-visible';
var cookieName = 'internetstiftelsen-cookie-consent';
// const testCookieSupport = 'Cookies are enabled';
var acceptButton = document.getElementById('js-accept-cookies');
var currentProtocol = document.location.protocol;
// const { cookieEnabled } = navigator.cookieEnabled;

// Cookies are disabled
// function showCookieFail() {
// 	console.warn('Cookies are disabled.');
// }

// Check for cookie support
// (function checkCookieSupport() {
// 	if (!cookieEnabled) {
// 		if (currentProtocol === 'https:') {
// 			document.cookie = `${testCookieSupport}=Yes;path=/;SameSite=Strict;Secure;`;
// 		} else {
// 			document.cookie = `${testCookieSupport}=Yes;path=/;SameSite=Strict;`;
// 		}
//
// 		cookieEnabled = document.cookie.indexOf(testCookieSupport) !== -1;
// 	}
// 	return cookieEnabled || showCookieFail();
// }());

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

// No cookie set? Show cookie disclaimer bar
// if (!getCookie(cookieName) && cookieEnabled) {
if (!getCookie(cookieName)) {
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