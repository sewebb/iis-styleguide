const cookieBar = document.querySelector('.m-cookie-disclaimer');
const visibleClass = 'is-visible';
const cookieName = 'internetstiftelsen-cookie-consent';
const declineButton = document.getElementById('js-decline-cookies');
const acceptButton = document.getElementById('js-accept-cookies');

function setCookie(name, value, days) {
	const d = new Date();
	d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
	document.cookie = `${name}=${value};path=/;expires=${d.toGMTString()}`;
}

function getCookie(name) {
	const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
	return v ? v[2] : null;
}

function deleteCookie(name) { setCookie(name, '', -1); }

// No cookie set? Show cookie disclaimer bar
if (!getCookie(cookieName)) {
	cookieBar.classList.add(visibleClass);
}

function declineCookies() {
	deleteCookie(cookieName); // Delete cookie if set before
	cookieBar.classList.remove(visibleClass);
}

function acceptCookies() {
	setCookie(cookieName, 'YES', { expires: 365 });
	cookieBar.classList.remove(visibleClass);
}

declineButton.addEventListener('click', declineCookies);
acceptButton.addEventListener('click', acceptCookies);
