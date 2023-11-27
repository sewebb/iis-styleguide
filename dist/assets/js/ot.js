'use strict';

document.addEventListener('click', function (e) {
	var el = e.target.closest('[data-ot-dynamic-show-settings]');

	if (el) {
		var otButton = document.getElementById('ot-sdk-btn');

		if (otButton) {
			otButton.click();
		}
	}
});