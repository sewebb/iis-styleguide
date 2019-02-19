'use strict';

// Only allow one panel to be opened at a time.
function collapse(toggle) {
	var id = toggle.getAttribute('data-a11y-toggle');
	var collapsibleBox = document.getElementById(id);
	collapsibleBox.setAttribute('aria-hidden', true);
	toggle.setAttribute('aria-expanded', false);
}

var toggles = Array.prototype.slice.call(document.querySelectorAll('[data-a11y-toggle]'));

function collapseAll(event) {
	toggles.filter(function (toggle) {
		return toggle !== event.target;
	}).forEach(collapse);
}

toggles.forEach(function (toggle) {
	toggle.addEventListener('click', collapseAll);
});