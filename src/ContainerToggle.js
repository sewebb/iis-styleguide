const createFocusTrap = require('focus-trap');
const megaMenu = require('./organisms/mega-menu/mega-menu');

class ContainerToggle {
	constructor(element) {
		this.element = element;
		this.targetContainer = this.element.getAttribute('data-a11y-toggle');
		this.containerElement = document.getElementById(this.targetContainer);
		this.focusTrap = createFocusTrap(`#${this.targetContainer}`, { clickOutsideDeactivates: true });

		this.attach();
	}

	attach() {
		this.element.addEventListener('click', this.handleFocusTrap.bind(this));
		window.addEventListener('mouseup', this.closeSearch.bind(this));

		document.addEventListener('keydown', (e) => {
			if (this.element.getAttribute('aria-expanded') === 'true') {
				return;
			}

			if (e.keyCode === 9) {
				this.containerElement.tabIndex = -1;
			}
		}, { once: true });
	}

	handleFocusTrap() {
		setTimeout(() => {
			if (this.element.getAttribute('aria-expanded') === 'true') {
				this.containerElement.tabIndex = 0;
				this.focusTrap.activate();

				if (megaMenu) {
					megaMenu.hide();
				}
			} else {
				this.focusTrap.deactivate();
				this.containerElement.addEventListener('transitionend', () => {
					this.containerElement.tabIndex = -1;
				}, { once: true });
			}
		}, 10);
	}

	closeSearch(e) {
		if (e.target !== this.containerElement
			&& e.target.parentNode !== this.containerElement
			&& !this.containerElement.contains(e.target)
			&& e.target !== this.element
			&& this.element.getAttribute('aria-expanded') === 'true') {
			window.a11yToggle(this.containerElement);
		}
	}
}

module.exports = (element) => new ContainerToggle(element);
