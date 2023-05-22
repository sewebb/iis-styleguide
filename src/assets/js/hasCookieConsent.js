import getCookieByName from './getCookieByName';
import queryToObj from './queryToObj';

export default function hasCookieConsent(category, defaultIfNoCookie = true) {
	const cookie = getCookieByName('OptanonConsent');

	if (!cookie) {
		return defaultIfNoCookie;
	}

	const cookieObj = queryToObj(cookie);

	if (!('groups' in cookieObj)) {
		return defaultIfNoCookie;
	}

	const groups = Object.fromEntries(cookieObj.groups.split(',').map((group) => group.trim().split(':')));

	if (!(category in groups)) {
		return defaultIfNoCookie;
	}

	return groups[category] === '1';
}
