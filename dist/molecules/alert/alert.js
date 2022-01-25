'use strict';

var alerts = document.querySelectorAll('.js-dismiss-alert');

function dismiss(alert) {
	var target = alert.querySelector('[data-a11y-toggle]');
	var id = target.closest('[role]').getAttribute('id');
	var idElement = document.getElementById(id);

	if (sessionStorage.getItem(id) !== 'is-dismissed') {
		window.addEventListener('DOMContentLoaded', function () {
			idElement.setAttribute('aria-hidden', 'false');
		});

		target.addEventListener('click', function () {
			sessionStorage.setItem(id, 'is-dismissed');
		});
	}
}

if (alerts) {
	[].forEach.call(alerts, dismiss);
}