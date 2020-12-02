'use strict';

var selects = document.querySelectorAll('.js-natural-language-select');
var inputs = document.querySelectorAll('.js-natural-language-input');

function sync(el, option) {
	var color = option.dataset.color;


	el.dataset.color = color;
	el.innerText = option.innerText;
}

function setupSelect(select) {
	var parent = select.parentNode;
	var text = parent.querySelector('label');

	select.addEventListener('change', function () {
		sync(text, select.options[select.selectedIndex]);
	});

	// Next tick
	setTimeout(function () {
		sync(text, select.options[select.selectedIndex]);
	}, 0);
}

if (selects) {
	[].forEach.call(selects, setupSelect);
}

function syncInput(el, input, value) {
	el.innerText = value;

	setTimeout(function () {
		var selectWidth = el.getBoundingClientRect().width;
		input.style.width = selectWidth + 'px';
	}, 0);
}

if (inputs) {
	[].forEach.call(inputs, function (input) {
		var text = input.nextElementSibling;

		syncInput(text, input, input.value);

		input.addEventListener('input', function (e) {
			syncInput(text, input, e.target.value);
		});

		input.addEventListener('change', function (e) {
			syncInput(text, input, e.target.value);
		});
	});
}