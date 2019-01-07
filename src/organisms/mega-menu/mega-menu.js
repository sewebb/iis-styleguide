const createFocusTrap = require('focus-trap');

const megaMenuButton = document.querySelector('.js-toggle-mega-menu');
const container = megaMenuButton.getAttribute('data-a11y-toggle');

function myFocusTrap() {
	const focusTrap = createFocusTrap(`#${container}`, { clickOutsideDeactivates: true });
	setTimeout(() => {
		if (megaMenuButton.getAttribute('aria-expanded') === 'true') {
			focusTrap.activate();
		} else {
			focusTrap.deactivate();
		}
	}, 10);
}

if (megaMenuButton) {
	megaMenuButton.addEventListener('click', myFocusTrap);
}
