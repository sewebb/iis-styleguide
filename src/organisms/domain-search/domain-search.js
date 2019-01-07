const createFocusTrap = require('focus-trap');

const domainSearchButton = document.querySelector('.js-toggle-domain-search');
const container = domainSearchButton.getAttribute('data-a11y-toggle');


function myFocusTrap() {
	const focusTrap = createFocusTrap(`#${container}`);
	focusTrap.activate();
}

if (domainSearchButton) {
	domainSearchButton.addEventListener('click', myFocusTrap);
}
