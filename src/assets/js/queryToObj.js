/** Parse query string to object */
export default function queryToObj(query) {
	const obj = {};
	const pairs = query.split('&');

	pairs.forEach((pair) => {
		const [key, value] = pair.split('=');
		obj[decodeURIComponent(key)] = decodeURIComponent(value || '');
	});

	return obj;
}
