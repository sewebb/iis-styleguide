'use strict';

// Usage: data-toggle-target="toggleButton" data-toggle-text="First|Second|Third"
function toggleTextOnClick(e) {
	e.preventDefault();

	var el = e.target;
	var target = el.dataset.toggleTarget ? document.getElementById(el.dataset.toggleTarget) : el;
	var i = parseInt(el.dataset.iteration || 0, 10);
	var options = el.dataset.toggleText.split('|');
	var nextIteration = i + 1 === options.length ? 0 : i + 1;

	el.dataset.iteration = nextIteration;
	target.innerText = options[nextIteration];
}

var toggleTextButtons = document.querySelectorAll('[data-toggle-text]');

if (toggleTextButtons) {
	[].forEach.call(toggleTextButtons, function (toggleTextButton) {
		toggleTextButton.addEventListener('click', toggleTextOnClick);
	});
}