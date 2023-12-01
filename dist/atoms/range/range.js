'use strict';

var ranges = document.querySelectorAll('.js-range-wrapper');
function setValue(range, rangeValue) {
	var val = range.value;
	var min = range.min ? range.min : 0;
	var max = range.max ? range.max : 100;
	var newVal = Number((val - min) * 100 / (max - min));
	rangeValue.innerHTML = val;

	// Sorta magic numbers based on size of the native UI thumb
	rangeValue.style.left = 'calc(' + newVal + '% + (' + (8 - newVal * 0.15) + 'px))';
}

ranges.forEach(function (wrap) {
	var range = wrap.querySelector('.js-range');
	var rangeValue = wrap.querySelector('.js-range-value');

	range.addEventListener('input', function () {
		setValue(range, rangeValue);
		range.focus();
	});

	setValue(range, rangeValue);
});