// Usage: data-toggle-target="toggleButton" data-toggle-text="First|Second|Third"
function toggleTextOnClick(e) {
	e.preventDefault();

	const el = e.target;

	if (!el.dataset.toggleText) {
		console.warn('No data-toggle-text attribute found on element', el);
		return;
	}

	const target = (el.dataset.toggleTarget) ? document.getElementById(el.dataset.toggleTarget) : el;
	const i = parseInt(el.dataset.iteration || 0, 10);
	const options = el.dataset.toggleText.split('|');
	const nextIteration = (i + 1) === options.length ?	 0 : i + 1;
	const ariaPressed = el.getAttribute('aria-pressed');

	el.dataset.iteration = nextIteration.toString();
	target.innerText = options[nextIteration];

	if (ariaPressed) {
		el.setAttribute('aria-pressed', ariaPressed === 'true' ? 'false' : 'true');
	}
}


document.addEventListener('click', (e) => {
	if (e.target.closest('[data-toggle-text]')) {
		toggleTextOnClick(e);
		return false;
	}
});
