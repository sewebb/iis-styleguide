const createFocusTrap = require('focus-trap');

const megaMenuButton = document.querySelector('.js-toggle-mega-menu');
const targetContainer = megaMenuButton.getAttribute('data-a11y-toggle');
const containerElement = document.getElementById(targetContainer);
const focusTrap = createFocusTrap(`#${targetContainer}`, { clickOutsideDeactivates: true });

function myFocusTrap() {
	containerElement.removeEventListener('transitionend', () => {
		console.log('remove');
	});

	setTimeout(() => {
		if (megaMenuButton.getAttribute('aria-expanded') === 'true') {
			containerElement.tabIndex = 0;
			focusTrap.activate();
		} else {
			focusTrap.deactivate();
			containerElement.addEventListener('transitionend', () => {
				containerElement.tabIndex = -1;
			}, { once: true });
		}
	}, 10);
}

if (megaMenuButton) {
	megaMenuButton.addEventListener('click', myFocusTrap);
}
