const element = document.querySelector('.grid-toggle');

function classToggle() {
	const body = document.querySelector('body');
	body.classList.toggle('baseline-grid');
}

if (element) {
	element.addEventListener('click', classToggle);
}
