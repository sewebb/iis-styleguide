const createFocusTrap = require('focus-trap');

const megaMenuButton = document.querySelector('.js-toggle-mega-menu');
const targetContainer = megaMenuButton.getAttribute('data-a11y-toggle');
const menuContainerElement = document.getElementById(targetContainer);
const focusTrap = createFocusTrap(`#${targetContainer}`, { clickOutsideDeactivates: true });

function myFocusTrap() {
	setTimeout(() => {
		if (megaMenuButton.getAttribute('aria-expanded') === 'true') {
			menuContainerElement.tabIndex = 0;
			focusTrap.activate();
		} else {
			focusTrap.deactivate();
			menuContainerElement.addEventListener('transitionend', () => {
				menuContainerElement.tabIndex = -1;
			}, { once: true });
		}
	}, 10);
}

function closeMenu(e) {
	if (e.target !== menuContainerElement
		&& e.target.parentNode !== menuContainerElement
		&& !menuContainerElement.contains(e.target)
		&& e.target !== megaMenuButton
		&& megaMenuButton.getAttribute('aria-expanded') === 'true') {
		window.a11yToggle(menuContainerElement);
	}
}

if (megaMenuButton) {
	megaMenuButton.addEventListener('click', myFocusTrap);
	window.addEventListener('mouseup', closeMenu);
}

if (megaMenuButton.getAttribute('aria-expanded') !== 'true') {
	document.addEventListener('keydown', (e) => {
		if (e.keyCode === 9) {
			menuContainerElement.tabIndex = -1;
		}
	}, { once: true });
}
