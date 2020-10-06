'use strict';

var selects = document.querySelectorAll('.js-natural-language-select');
var inputs = document.querySelectorAll('.js-natural-language-input');

if (selects) {
	[].forEach.call(selects, function (select) {
		var tempTextElement = select.nextElementSibling;

		function setWidth() {
			var optionText = select.options[select.selectedIndex].text;
			tempTextElement.innerText = optionText;

			// Show temp select to get it's width
			tempTextElement.classList.remove('is-hidden');

			var selectWidth = '';

			var className = select.className.split('-');

			if (className.indexOf('arrow') !== -1) {
				selectWidth = tempTextElement.offsetWidth + 43;
			} else {
				selectWidth = tempTextElement.offsetWidth + 3;
			}

			// Hide temp select again
			tempTextElement.classList.add('is-hidden');

			// Set width to select
			select.style.width = selectWidth + 'px';
		}
		setWidth();

		select.addEventListener('change', function () {
			var color = select.options[select.selectedIndex].dataset.color;

			select.dataset.color = color;

			setWidth();
		});

		window.addEventListener('resize', function () {
			setWidth();
		});
	});
}

if (inputs) {
	[].forEach.call(inputs, function (input) {
		var tempTextElement = input.nextElementSibling;

		function setWidth() {
			tempTextElement.innerHTML = input.value;

			// Show temp select to get it's width
			tempTextElement.classList.remove('is-hidden');
			var selectWidth = tempTextElement.offsetWidth + 7;
			// Hide temp select again
			tempTextElement.classList.add('is-hidden');
			input.style.width = selectWidth + 'px';
		}

		setWidth();

		input.addEventListener('keyup', function () {
			setWidth();
		});

		window.addEventListener('resize', function () {
			setWidth();
		});
	});
}