'use strict';

var createFocusTrap = require('focus-trap');

var button = document.querySelector('.js-modal-open');
var modal = document.querySelector('#modal-container');
var focusTrapOne = createFocusTrap('#modal-container', {
	onDeactivate: function onDeactivate() {
		modal.classList.add('is-hidden');
		modal.setAttribute('aria-hidden', 'true');
	}
});

function openModal() {
	modal.classList.remove('is-hidden');
	modal.setAttribute('aria-hidden', 'false');
	focusTrapOne.activate();
}

function closeModal() {
	focusTrapOne.deactivate();
}

if (button) {
	button.addEventListener('click', function (e) {
		e.preventDefault();
		openModal();
	});
}

if (modal) {
	modal.addEventListener('click', function (e) {
		if (e.target.classList.contains('js-modal-close')) {
			e.preventDefault();
			closeModal();
		}
	});
}