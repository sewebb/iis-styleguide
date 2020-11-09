'use strict';

var selects = document.querySelectorAll('.js-natural-language-select');
var inputs = document.querySelectorAll('.js-natural-language-input');

function setWidth(select) {
	var tempTextElement = select.nextElementSibling;
	tempTextElement.innerText = select.options[select.selectedIndex].text;

	// Show temp select to get it's width
	tempTextElement.classList.remove('is-hidden');

	var className = select.className.split('-');
	var extraWidth = className.indexOf('arrow') !== -1 ? 43 : 3;
	var selectWidth = tempTextElement.offsetWidth + extraWidth;

	// Hide temp select again
	tempTextElement.classList.add('is-hidden');

	// Set width to select
	select.style.width = selectWidth + 'px';
}

function setColor(select) {
	var color = select.options[select.selectedIndex].dataset.color;

	select.dataset.color = color;
}

if (selects) {
	[].forEach.call(selects, function (select) {
		select.addEventListener('change', function () {
			setColor(select);
			setWidth(select);
		});

		window.addEventListener('resize', function () {
			setWidth(select);
		});

		// Next tick
		setTimeout(function () {
			setColor(select);
			setWidth(select);
		}, 0);
	});
}

function setInputWidth(input) {
	var tempTextElement = input.nextElementSibling;

	tempTextElement.innerHTML = input.value;

	// Show temp select to get it's width
	tempTextElement.classList.remove('is-hidden');
	var selectWidth = tempTextElement.offsetWidth + 7;
	// Hide temp select again
	tempTextElement.classList.add('is-hidden');
	input.style.width = selectWidth + 'px';
}

if (inputs) {
	[].forEach.call(inputs, function (input) {
		setTimeout(function () {
			setInputWidth(input);
		}, 0);

		input.addEventListener('keyup', function () {
			setInputWidth(input);
		});

		window.addEventListener('resize', function () {
			setInputWidth(input);
		});
	});
}