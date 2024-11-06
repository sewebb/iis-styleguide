'use strict';

// Usage: data-toggle-icon-target="targetSvg" data-toggle-icon="copy|check"
function toggleIconOnClick(e) {
	e.preventDefault();

	var el = e.target;

	var target = el.dataset.toggleIconTarget ? document.getElementById(el.dataset.toggleIconTarget) : el;
	var i = parseInt(el.dataset.iconIteration || 0, 10);
	var options = el.dataset.toggleIcon.split('|');
	var nextIteration = i + 1 === options.length ? 0 : i + 1;

	el.dataset.iconIteration = nextIteration;
	var useElement = target.querySelector('use');
	useElement.setAttribute('xlink:href', '#icon-' + options[nextIteration]);
}

document.addEventListener('click', function (e) {
	if (e.target.closest('[data-toggle-icon]')) {
		toggleIconOnClick(e);
		return false;
	}
});