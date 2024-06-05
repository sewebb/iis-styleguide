// Usage: data-toggle-target="toggleButton" data-toggle-text="First|Second|Third"
function toggleTextOnClick(e) {
	e.preventDefault();

	const el = e.target;
	const target = (el.dataset.toggleTarget) ? document.getElementById(el.dataset.toggleTarget) : el;
	const i = parseInt(el.dataset.iteration || 0, 10);
	const options = el.dataset.toggleText.split('|');
	const nextIteration = (i + 1) === options.length ? 0 : i + 1;

	el.dataset.iteration = nextIteration;
	target.innerText = options[nextIteration];
}

const toggleTextButton = document.querySelector('[data-toggle-text]');

if (toggleTextButton) {
	toggleTextButton.addEventListener('click', toggleTextOnClick);
}
