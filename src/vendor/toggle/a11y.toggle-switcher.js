// Only allow one panel to be opened at a time.
function collapse(toggle) {
	const id = toggle.getAttribute('data-a11y-toggle');
	const collapsibleBox = document.getElementById(id);
	collapsibleBox.setAttribute('aria-hidden', true);
	toggle.setAttribute('aria-expanded', false);
}

const toggles = Array.prototype.slice.call(
	document.querySelectorAll('[data-a11y-toggle]'),
);

function collapseAll(event) {
	toggles
		.filter(toggle => toggle !== event.target)
		.forEach(collapse);
}

toggles.forEach((toggle) => {
	toggle.addEventListener('click', collapseAll);
});
