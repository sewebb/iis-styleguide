'use strict';

var ranges = document.querySelectorAll('.js-range-wrapper');
function setValue(range, rangeValue, rangeInput) {
	var val = range.value;
	var min = range.min ? range.min : 0;
	var max = range.max ? range.max : 100;
	var newVal = Number((val - min) * 100 / (max - min));
	rangeValue.innerHTML = val;

	if (rangeInput) {
		rangeInput.value = val;
	}

	// Sorta magic numbers based on size of the native UI thumb
	rangeValue.style.left = 'calc(' + newVal + '% + (' + (8 - newVal * 0.15) + 'px))';
}

ranges.forEach(function (wrap) {
	var range = wrap.querySelector('.js-range');
	var rangeValue = wrap.querySelector('.js-range-value');
	var rangeInput = wrap.querySelector('.js-range-input');

	range.addEventListener('input', function () {
		setValue(range, rangeValue, rangeInput);
		range.focus();
	});

	if (rangeInput) {
		rangeInput.addEventListener('input', function () {
			if (rangeInput.value !== '') {
				range.value = rangeInput.value;
				rangeValue.innerHTML = rangeInput.value;
				setValue(range, rangeValue, rangeInput);
			}
			rangeInput.focus();
		});
	}

	setValue(range, rangeValue, rangeInput);
});