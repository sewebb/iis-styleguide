class OverviewNavigation {
	constructor(element) {
		this.element = element;
		this.button = this.element.querySelector('.js-overview-navigation-button');
		this.isSmallScreen = false;
		this.isOutOfView = false;
		this.minimized = null;

		// a11y-toggle doesn't have a callback for when it's done initializing
		// so we have to wait for the next tick
		document.addEventListener('DOMContentLoaded', () => {
			setTimeout(() => {
				this.attach();
				this.onResize();
				this.closeMenu();
			}, 0);
		});
	}

	attach() {
		window.addEventListener('resize', this.onResize.bind(this));
		window.addEventListener('scroll', this.onScroll.bind(this));
	}

	update() {
		if (this.isSmallScreen || this.isOutOfView) {
			this.minimize();
		} else {
			this.maximize();
		}
	}

	onResize() {
		this.isSmallScreen = window.innerWidth <= 961;
		this.update();
	}

	onScroll() {
		const viewportOffset = this.element.getBoundingClientRect();

		if (viewportOffset.top < 0) {
			this.isOutOfView = true;
		} else if (window.scrollY === 0) {
			this.isOutOfView = false;
		}

		this.update();
	}

	// Close the overview menu when clicking any link inside it
	closeMenu() {
		const links = this.element.querySelectorAll('a');

		[].forEach.call(links, (link) => {
			link.addEventListener('click', () => {
				this.button.click();
			});
		});
	}

	updateButtonPosition() {
		const elementOffset = this.element.getBoundingClientRect();
		const buttonRect = this.button.getBoundingClientRect();

		// Use right and bottom to place this.button at the top left corner of the element
		this.button.style.right = `${window.innerWidth - elementOffset.right + elementOffset.width - buttonRect.width}px`;
		this.button.style.bottom = `${window.innerHeight - elementOffset.top - buttonRect.height}px`;
	}

	minimize() {
		if (this.minimized === true) {
			return;
		}

		this.button.style.transition = 'none';
		this.updateButtonPosition();

		this.element.offsetHeight; // force reflow
		this.button.style.transition = 'right 0.25s ease-out, bottom 0.25s ease-out, opacity 0.25s ease-out';

		this.element.setAttribute('aria-hidden', 'true');
		this.element.classList.add('is-minimized');

		this.button.setAttribute('aria-expanded', 'false');
		this.button.classList.add('is-fixed');
		this.button.style.opacity = 1;

		this.minimized = true;
	}

	maximize() {
		if (this.minimized === false) {
			return;
		}

		this.element.setAttribute('aria-hidden', 'false');
		this.element.classList.remove('is-minimized');


		this.element.offsetHeight; // force reflow

		this.updateButtonPosition();
		this.button.setAttribute('aria-expanded', 'true');
		this.button.classList.remove('is-fixed');
		this.button.style.opacity = 0;

		this.minimized = false;
	}
}

const overviewNavigations = document.querySelectorAll('.js-overview-navigation');

if (overviewNavigations) {
	[].forEach.call(
		overviewNavigations,
		(overviewNavigation) => new OverviewNavigation(overviewNavigation),
	);
}
