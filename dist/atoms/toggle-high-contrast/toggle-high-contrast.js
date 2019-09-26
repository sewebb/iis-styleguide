'use strict';

var element = document.querySelector('.js-toggle-high-contrast');

function classToggle() {
	var body = document.querySelector('body');
	body.classList.toggle('high-contrast');
}

if (element) {
	element.addEventListener('click', classToggle);
}