'use strict';

var elements = document.querySelectorAll('.js-toggle-input-type');

if (elements) {
	[].forEach.call(elements, function (element) {
		element.addEventListener('click', function () {
			var input = element.previousElementSibling;
			input.type = input.type === 'password' ? 'text' : 'password';
		});
	});
}