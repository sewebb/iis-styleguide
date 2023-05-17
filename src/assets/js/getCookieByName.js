export default function getCookieByName(name) {
	const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));

	if (match) {
		return match[2];
	}

	return null;
}
