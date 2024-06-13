class CharCounter {
	constructor(el) {
		this.el = el;
		this.wrapper = this.el.closest('[class*="field-group"]');
		this.counterEl = null;
		this.min = parseInt(this.el.getAttribute('data-min') || 0, 10);
		this.max = parseInt(this.el.getAttribute('data-max') || 0, 10);

		if (!this.min && !this.max) {
			console.warn('Either min or max must be set and greater than 0.');
			return;
		}

		this.build();
		this.attach();
	}

	count() {
		return this.el.value.length;
	}

	setCountText() {
		const count = this.count();

		if (this.min && count < this.min) {
			this.counterEl.textContent = `${count}/${this.min}`;
			this.counterEl.className = 'color-ruby';

			return;
		}

		if (this.max && count > this.max) {
			this.counterEl.textContent = `${count}/${this.max}`;
			this.counterEl.classList.remove('color-granit');
			this.counterEl.className = 'color-ruby';

			return;
		}

		this.counterEl.textContent = `${count}/${this.max || this.min}`;
		this.counterEl.className = 'color-jade';
	}

	// eslint-disable-next-line class-methods-use-this
	build() {
		const counter = document.createElement('small');

		counter.className = 'color-granit';
		counter.style.cssText = 'position: absolute; top: 5px; right: 10px; z-index: 501;';

		this.wrapper.appendChild(counter);

		this.counterEl = counter;
		this.setCountText();
	}

	attach() {
		this.el.addEventListener('input', () => {
			this.setCountText();
		});
	}
}

const elements = document.querySelectorAll('[data-min], [data-max]');
elements.forEach((el) => {
	el.charCounter = new CharCounter(el);
});
