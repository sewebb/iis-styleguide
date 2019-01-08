const createFocusTrap = require('focus-trap');

const domainSearchButton = document.querySelector('.js-toggle-domain-search');
const targetContainer = domainSearchButton.getAttribute('data-a11y-toggle');
const containerElement = document.getElementById(targetContainer);
const focusTrap = createFocusTrap(`#${targetContainer}`, { clickOutsideDeactivates: true });

function myFocusTrap() {
	setTimeout(() => {
		if (domainSearchButton.getAttribute('aria-expanded') === 'true') {
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

if (domainSearchButton) {
	domainSearchButton.addEventListener('click', myFocusTrap);
}

document.addEventListener('keydown', (e) => {
	if (e.keyCode === 9) {
		containerElement.tabIndex = -1;
	}
}, { once: true });
