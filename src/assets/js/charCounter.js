import className from './className';
import htmlTextLength from './htmlTextLength';

class CharCounter {
	constructor(el) {
		this.el = el;
		this.counterEl = null;
		this.isRichText = this.el.dataset.richText !== undefined;
		this.min = parseInt(this.el.getAttribute('data-min') || 0, 10);
		this.max = parseInt(this.el.getAttribute('data-max') || 0, 10);

		if (!this.min && !this.max) {
			console.warn('Either min or max must be set and greater than 0.');
			return;
		}

		if (this.isRichText) {
			this.waitForEditor();

			return;
		}

		this.build();
		this.attach();
	}

	waitForEditor() {
		if (this.el.editor) {
			this.build();
			this.attach();
		} else {
			this.el.addEventListener('editor-ready', () => {
				this.build();
				this.attach();
			});
		}
	}

	count() {
		if (this.isRichText) {
			return htmlTextLength(this.el.editor.getHTML());
		}

		return this.el.value.length;
	}

	setCountText() {
		const count = this.count();

		if (this.min && count < this.min) {
			this.counterEl.textContent = `${count}/${this.min}`;
			this.counterEl.className = `color-ruby ${className('a-meta')}`;

			return;
		}

		if (this.max && count > this.max) {
			this.counterEl.textContent = `${count}/${this.max}`;
			this.counterEl.classList.remove('color-granit');
			this.counterEl.className = `color-ruby ${className('a-meta')}`;

			return;
		}

		this.counterEl.textContent = `${count}/${this.max || this.min}`;
		this.counterEl.className = `color-jade ${className('a-meta')}`;
	}

	build() {
		const counter = document.createElement('small');
		let wrapper;

		if (this.isRichText) {
			wrapper = this.el.editor.options.element;
			wrapper.style.paddingRight = '3.8333333333rem';
		} else {
			wrapper = document.createElement('div');

			wrapper.className = 'u-position-relative';
			this.el.parentNode.insertBefore(wrapper, this.el);
			wrapper.appendChild(this.el);

			this.el.style.paddingRight = '3.8333333333rem';
		}

		counter.className = `color-granit ${className('a-meta')}`;
		counter.style.cssText = 'position: absolute; top: 5px; right: 10px; z-index: 501;';

		wrapper.appendChild(counter);

		this.counterEl = counter;
		this.setCountText();
	}

	attach() {
		if (this.isRichText) {
			this.el.editor.on('update', () => {
				this.setCountText();
			});
		} else {
			this.el.addEventListener('input', () => {
				this.setCountText();
			});
		}
	}
}

const elements = document.querySelectorAll('[data-min], [data-max]');
elements.forEach((el) => {
	el.charCounter = new CharCounter(el);
});
