export default function track(data) {

	if (window._mtm) {

		window._mtm.push(data);
	} else {
		console.log('Matomo not loaded', data);
	}
}

