/**
 * Lightweight DOM sugar.
 */
class Element {
	constructor(element) {
		this.elements = (typeof element === 'string') ? document.querySelectorAll(element) : [element];
	}

	onElement(elements, callback) {
		if (!elements) {
			return;
		}

		[].forEach.call(elements, (element) => {
			if (Object.prototype.toString.call(element) === '[object Array]') {
				this.onElement(element, callback);
			} else {
				callback.call(this, element);
			}
		});
	}

	addClass(className) {
		this.onElement(this.elements, (element) => { element.classList.add(className); });

		return this;
	}

	removeClass(className) {
		this.onElement(this.elements, (element) => { element.classList.remove(className); });

		return this;
	}

	className(className) {
		this.onElement(this.elements, (element) => {
			if (element.className !== className) {
				element.className = className;
			}
		});

		return this;
	}

	style(style, value) {
		this.onElement(this.elements, (element) => {
			if (element.style[style] !== value) {
				element.style[style] = value;
			}
		});

		return this;
	}

	text(text) {
		this.onElement(this.elements, (element) => {
			if (element.textContent !== text) {
				element.textContent = text;
			}
		});

		return this;
	}

	html(html) {
		this.onElement(this.elements, (element) => {
			if (element.innerHTML !== html) {
				element.innerHTML = html;
			}
		});

		return this;
	}

	value(value) {
		this.onElement(this.elements, (element) => { element.value = value; });

		return this;
	}

	callback(callback) {
		this.onElement(this.elements, callback);

		return this;
	}

	callbackRAF(callback) {
		window.requestAnimationFrame(() => this.callback(callback));
	}

	hide() {
		this.onElement(this.elements, (element) => { element.style.display = 'none'; });

		return this;
	}

	show() {
		this.onElement(this.elements, (element) => { element.style.display = ''; });

		return this;
	}

	visible(visible) {
		if (visible) {
			this.show();
		} else {
			this.hide();
		}

		return this;
	}
}

function el(element) {
	return new Element(element);
}

export default el;
