import getCookieByName from './getCookieByName';
import queryToObj from './queryToObj';

export default function hasCookieConsent(category) {
	const cookie = getCookieByName('OptanonConsent');

	if (!cookie) {
		return false;
	}

	const cookieObj = queryToObj(cookie);

	if (!('groups' in cookieObj)) {
		return false;
	}

	const groups = Object.fromEntries(cookieObj.groups.split(',').map((group) => group.trim().split(':')));

	if (!(category in groups)) {
		return false;
	}

	return groups[category] === '1';
}
