const cookieBar = document.querySelector('.js-cookie-disclaimer');
const visibleClass = 'is-visible';
const cookieName = 'internetstiftelsen-cookie-consent';
const acceptButton = document.getElementById('js-accept-cookies');
// const declineButton = document.getElementById('js-decline-cookies');

function isHttps() {
	return (document.location.protocol === 'https:');
}

function setCookie(name, value, days) {
	const d = new Date();
	d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);

	if(isHttps) {
		document.cookie = `${name}=${value};path=/;SameSite=Strict;Secure;expires=${d.toGMTString()}`;
	}

	else {
		document.cookie = `${name}=${value};path=/;SameSite=Strict;expires=${d.toGMTString()}`;
	}
}

function getCookie(name) {
	const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
	return v ? v[2] : null;
}

// No cookie set? Show cookie disclaimer bar
if (!getCookie(cookieName)) {
	if (cookieBar) {
		cookieBar.classList.add(visibleClass);
	}
}

function acceptCookies() {
	setCookie(cookieName, 'YES', 365);
	if (cookieBar) {
		cookieBar.classList.remove(visibleClass);
	}
}

if (acceptButton) {
	acceptButton.addEventListener('click', acceptCookies);
}
