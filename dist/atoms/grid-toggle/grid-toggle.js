'use strict';

var element = document.querySelector('.grid-toggle');

function classToggle() {
	var body = document.querySelector('body');
	body.classList.toggle('baseline-grid');
}

if (element) {
	element.addEventListener('click', classToggle);
}