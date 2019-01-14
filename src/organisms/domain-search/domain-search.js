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

function closeSearch(e) {
	if (e.target !== containerElement
		&& e.target.parentNode !== containerElement
		&& e.target !== domainSearchButton) {
		window.a11yToggle(containerElement);
	}
}

if (domainSearchButton) {
	domainSearchButton.addEventListener('click', myFocusTrap);
	window.addEventListener('mouseup', closeSearch);
}

if (domainSearchButton.getAttribute('aria-expanded') !== 'true') {
	document.addEventListener('keydown', (e) => {
		if (e.keyCode === 9) {
			containerElement.tabIndex = -1;
		}
	}, { once: true });
}
