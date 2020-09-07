const colors = ['ruby', 'ruby-light', 'jade', 'jade-light', 'lemon', 'lemon-light'];

/**
 * A button wrapper with helpful state management
 *
 * @class
 * @constructor
 * @public
 */
class Button {
	/**
	 * New button instance
	 *
	 * @param {Node} button
	 * @param {object} config
	 */
	constructor(button, config = {}, initialState = {}) {
		/**
		 * The html element
		 * @type {Node}
		 */
		this.element = button;
		this.base = this.element.classList.item(0);
		this.config = {
			hasStates: false,
			...config,
		};

		this.state = {
			loading: false,
			activated: false,
			mouseover: false,
			focus: false,
			...initialState,
		};

		this.m = (m) => `${this.base}--${m}`;
		this.e = (e) => `${this.base}__${e}`;
		this.on = (...args) => this.element.addEventListener(...args);
		this.off = (...args) => this.element.removeEventListener(...args);

		this.build();

		if (this.config.hasStates) {
			this.attach();
		}

		this.render();
	}

	removeIcon() {
		// Remove current icon
		const currentIcon = this.element.querySelector('.icon');

		if (currentIcon) {
			currentIcon.parentNode.removeChild(currentIcon);
		}
	}

	buildIcon(icon, className) {
		this.removeIcon();

		const html = `
			<svg class="icon ${this.e(className)}">
				<use xlink:href="#icon-${icon}"></use>
			</svg>
		`;

		this.element.appendChild(document.createRange().createContextualFragment(html));
	}

	build() {
		this.buildIcon('spinner-white', 'spinner');
	}

	attach() {
		this.on('mouseover', this.onMouseEnter);
		this.on('focus', this.onFocus);
		this.on('mouseleave', this.onMouseLeave);
		this.on('blur', this.onBlur);
	}

	setState(newState) {
		this.state = { ...this.state, ...newState };
		this.render();
	}

	onMouseEnter = () => this.setState({ mouseover: true });

	onMouseLeave = () => this.setState({ mouseover: false });

	onFocus = (e) => {
		console.log(e);
		this.setState({ focus: true });
	};

	onBlur = () => {
		if (!this.element.disabled) {
			this.setState({ focus: false });
		}
	};

	isLoading() {
		return this.state.loading;
	}

	isActivated() {
		return this.state.activated;
	}

	start() {
		this.setState({ loading: true, mouseover: false });
	}

	stop() {
		this.setState({ activated: false });
	}

	activate() {
		this.setState({ activated: true, loading: false });
	}

	deactivate() {
		this.setState({ activated: false, loading: false });
	}

	render() {
		if (this.isLoading()) {
			this.buildIcon('spinner-white', 'spinner');

			this.element.setAttribute('disabled', 'disabled');
			this.element.classList.add('is-loading');

			return;
		}

		const clone = this.element.cloneNode();

		this.element.removeAttribute('disabled');
		clone.classList.remove('is-loading');

		if (!this.config.hasStates) {
			return;
		}

		if (this.state.focus) {
			setTimeout(() => {
				this.element.focus();
			}, 0);
		}

		let state;
		const over = (this.state.focus) ? true : this.state.mouseover;

		if (this.isActivated() && !over) {
			state = 'active';
		} else if (this.isActivated() && over) {
			state = 'deactivate';
		} else {
			state = 'default';
		}

		const color = this.config[`${state}Color`];
		const icon = this.config[`${state}Icon`];
		const text = this.config[`${state}Text`];

		if (color) {
			colors.forEach((c) => clone.classList.remove(this.m(c)));
			clone.classList.add(this.m(color));
		}

		if (icon) {
			const prevIcon = this.element.querySelector(`.${this.e('icon')}`);

			if (prevIcon) {
				prevIcon.parentNode.removeChild(prevIcon);
			}

			this.buildIcon(icon, 'icon');

			clone.classList.add(this.m('icon'));
		} else {
			this.removeIcon();
			clone.classList.remove(this.m('icon'));
		}

		if (text) {
			this.element.querySelector(`.${this.e('text')}`).innerHTML = text;
		}

		this.element.className = clone.className;
	}
}

module.exports = Button;
