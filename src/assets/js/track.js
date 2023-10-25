export default function track(data) {
	// eslint-disable-next-line no-underscore-dangle
	if (window._mtm) {
		// eslint-disable-next-line no-underscore-dangle
		window._mtm.push(data);
	} else {
		console.log('GTM not loaded', data);
	}
}
