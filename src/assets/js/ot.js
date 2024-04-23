document.addEventListener('click', (e) => {
	const el = e.target.closest('[data-ot-dynamic-show-settings]');

	if (el) {
		const otButton = document.getElementById('ot-sdk-btn');

		if (otButton) {
			otButton.click();
		}
	}
});
