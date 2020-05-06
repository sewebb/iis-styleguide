const createFocusTrap = require('focus-trap');

const button = document.querySelector('.modal-button');
const modal = document.querySelector('#modal-container');

const focusTrapOne = createFocusTrap('#modal-container', {
	onDeactivate() {
		modal.classList.add('m-modal__container--hidden');
	},
});


function openModal() {
	modal.classList.remove('m-modal__container--hidden');
	focusTrapOne.activate();
}

function closeModal() {
	focusTrapOne.deactivate();
}

button.addEventListener('click', (e) => {
	e.preventDefault();
	openModal();
});

modal.addEventListener('click', (e) => {
	if (e.target.classList.contains('modal-close')) {
		e.preventDefault();
		closeModal();
	}
});
