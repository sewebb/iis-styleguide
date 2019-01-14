const createFocusTrap = require('focus-trap');

const domainSearchButton = document.querySelector('.js-toggle-domain-search');
const targetContainer = domainSearchButton.getAttribute('data-a11y-toggle');
const searchContainerElement = document.getElementById(targetContainer);
const focusTrap = createFocusTrap(`#${targetContainer}`, { clickOutsideDeactivates: true });

function myFocusTrap() {
	setTimeout(() => {
		if (domainSearchButton.getAttribute('aria-expanded') === 'true') {
			searchContainerElement.tabIndex = 0;
			focusTrap.activate();
		} else {
			focusTrap.deactivate();
			searchContainerElement.addEventListener('transitionend', () => {
				searchContainerElement.tabIndex = -1;
			}, { once: true });
		}
	}, 10);
}

function closeSearch(e) {
	if (e.target !== searchContainerElement
		&& e.target.parentNode !== searchContainerElement
		&& !searchContainerElement.contains(e.target)
		&& e.target !== domainSearchButton
		&& domainSearchButton.getAttribute('aria-expanded') === 'true') {
		window.a11yToggle(searchContainerElement);
	}
}

if (domainSearchButton) {
	domainSearchButton.addEventListener('click', myFocusTrap);
	window.addEventListener('mouseup', closeSearch);
}

if (domainSearchButton.getAttribute('aria-expanded') !== 'true') {
	document.addEventListener('keydown', (e) => {
		if (e.keyCode === 9) {
			searchContainerElement.tabIndex = -1;
		}
	}, { once: true });
}
