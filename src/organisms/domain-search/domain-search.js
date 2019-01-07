const createFocusTrap = require('focus-trap');

const domainSearchButton = document.querySelector('.js-toggle-domain-search');
const container = domainSearchButton.getAttribute('data-a11y-toggle');


function myFocusTrap() {
	const focusTrap = createFocusTrap(`#${container}`, { clickOutsideDeactivates: true });
	setTimeout(() => {
		if (domainSearchButton.getAttribute('aria-expanded') === 'true') {
			focusTrap.activate();
		} else {
			focusTrap.deactivate();
		}
	}, 10);
}

if (domainSearchButton) {
	domainSearchButton.addEventListener('click', myFocusTrap);
}
