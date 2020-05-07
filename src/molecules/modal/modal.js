const containerToggle = require('../../ContainerToggle');

const buttonsToggleModal = document.querySelectorAll('.js-toggle-modal');

if (buttonsToggleModal) {
	[].forEach.call(buttonsToggleModal, (toggleModal) => {
		containerToggle(toggleModal);
	});
}
