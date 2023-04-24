class OverviewNavigation {
	constructor(element) {
		this.element = element;
		this.button = this.element.querySelector('.js-overview-navigation-button');
		this.isSmallScreen = false;
		this.isOutOfView = false;
		this.minimized = false;

		// a11y-toggle doesn't have a callback for when it's done initializing
		// so we have to wait for the next tick
		document.addEventListener('DOMContentLoaded', () => {
			setTimeout(() => {
				this.attach();
				this.onResize();
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
		this.updateButtonPosition();

		this.isSmallScreen = window.innerWidth <= 961;
		this.update();
	}

	onScroll() {
		this.updateButtonPosition();
		const viewportOffset = this.element.getBoundingClientRect();

		if (viewportOffset.top < 0) {
			this.isOutOfView = true;
		} else if (window.scrollY === 0) {
			this.isOutOfView = false;
		}

		this.update();
	}

	updateButtonPosition() {
		const viewportOffset = this.element.getBoundingClientRect();

		this.button.style.right = `${viewportOffset.width}px`;
		this.button.style.bottom = `${viewportOffset.height}px`;
	}

	minimize() {
		if (this.minimized) {
			return;
		}

		this.element.setAttribute('aria-hidden', 'true');
		this.element.classList.add('is-minimized');
		this.button.setAttribute('aria-expanded', 'false');
		this.button.classList.add('is-fixed');

		this.minimized = true;
	}

	maximize() {
		this.element.setAttribute('aria-hidden', 'false');
		this.element.classList.remove('is-minimized');
		this.button.setAttribute('aria-expanded', 'true');
		this.button.classList.remove('is-fixed');

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
