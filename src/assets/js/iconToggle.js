// Usage: data-toggle-icon-target="targetSvg" data-toggle-icon="copy|check"
function toggleIconOnClick(e) {
	e.preventDefault();

	const el = e.target;
	/* eslint-disable-next-line */
	const target = (el.dataset.toggleIconTarget) ? document.getElementById(el.dataset.toggleIconTarget) : el;
	const i = parseInt(el.dataset.iconIteration || 0, 10);
	const options = el.dataset.toggleIcon.split('|');
	const nextIteration = (i + 1) === options.length ? 0 : i + 1;

	el.dataset.iconIteration = nextIteration;
	const useElement = target.querySelector('use');
	useElement.setAttribute('xlink:href', `#icon-${options[nextIteration]}`);
}

/* eslint-disable */
document.addEventListener('click', (e) => {
	if (e.target.closest('[data-toggle-icon]')) {
		toggleIconOnClick(e);
		return false;
	}
});
