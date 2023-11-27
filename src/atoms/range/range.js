const ranges = document.querySelectorAll('.js-range-wrapper');
function setValue(range, rangeValue) {
	const val = range.value;
	const min = range.min ? range.min : 0;
	const max = range.max ? range.max : 100;
	const newVal = Number(((val - min) * 100) / (max - min));
	rangeValue.innerHTML = val;

	// Sorta magic numbers based on size of the native UI thumb
	rangeValue.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}

ranges.forEach((wrap) => {
	const range = wrap.querySelector('.js-range');
	const rangeValue = wrap.querySelector('.js-range-value');

	range.addEventListener('input', () => {
		setValue(range, rangeValue);
		range.focus();
	});

	setValue(range, rangeValue);
});
