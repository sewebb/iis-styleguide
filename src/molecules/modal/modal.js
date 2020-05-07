const createFocusTrap = require('focus-trap');

const button = document.querySelector('.js-modal-open');
const modal = document.querySelector('#modal-container');
const focusTrapOne = createFocusTrap('#modal-container', {
	onDeactivate() {
		modal.classList.add('is-hidden');
		modal.setAttribute('aria-hidden', 'true');
	},
});


function openModal() {
	modal.classList.remove('is-hidden');
	modal.setAttribute('aria-hidden', 'false');
	focusTrapOne.activate();
}

function closeModal() {
	focusTrapOne.deactivate();
}

if (button) {
	button.addEventListener('click', (e) => {
		e.preventDefault();
		openModal();
	});
}

if (modal) {
	modal.addEventListener('click', (e) => {
		if (e.target.classList.contains('js-modal-close')) {
			e.preventDefault();
			closeModal();
		}
	});
}
