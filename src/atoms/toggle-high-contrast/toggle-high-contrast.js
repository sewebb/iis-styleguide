const element = document.querySelector('.js-toggle-high-contrast');

function classToggle() {
	const body = document.querySelector('body');
	body.classList.toggle('high-contrast');
}

if (element) {
	element.addEventListener('click', classToggle);
}
