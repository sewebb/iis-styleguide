// TODO, fix tab logic when tabbing from last and first element in container
const createFocusTrap = require('focus-trap');

const megaMenuButton = document.querySelector('.js-toggle-mega-menu');
const container = megaMenuButton.getAttribute('data-a11y-toggle');

function myFocusTrap() {
	const focusTrap = createFocusTrap(`#${container}`);
	focusTrap.activate();
}

if (megaMenuButton) {
	megaMenuButton.addEventListener('click', myFocusTrap);
}
