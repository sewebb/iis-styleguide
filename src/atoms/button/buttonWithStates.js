class Button {
	constructor(button, disabled = true) {
		this.button = button;
		this.disabled = disabled;
		this.dataset = button.dataset;

		this.states = {
			default: {
				text: undefined,
				icon: undefined,
			},
			activated: {
				text: undefined,
				icon: undefined,
			},
			deactivate: {
				text: undefined,
				icon: undefined,
			},
			current: 'default',
		};

		this.build();
	}

	build() {
		const className = this.button.classList.item(0);

		this.states = {
			default: {
				text: this.dataset.statebuttonDefaultText,
				icon: this.dataset.statebuttonDefaultIcon,
			},
			activated: {
				text: this.dataset.statebuttonActivatedText,
				icon: this.dataset.statebuttonActivatedIcon,
			},
			deactivate: {
				text: this.dataset.statebuttonDeactivateText,
				icon: this.dataset.statebuttonDeactivateIcon,
			},
			current: this.dataset.statebuttonStateCurrent,
		};

		console.log('this.states', this.states);

		const html = `
			<svg class="icon ${className}__spinner">
				<use xlink:href="#icon-spinner-white"></use>
			</svg>
		`;

		this.button.appendChild(document.createRange().createContextualFragment(html));
	}

	isLoading() {
		return this.button.classList.contains('is-loading');
	}

	start() {
		if (this.disabled) {
			this.button.setAttribute('disabled', 'disabled');
		}

		this.button.classList.add('is-loading');
	}

	stop() {
		if (this.disabled) {
			this.button.removeAttribute('disabled');
		}

		this.button.classList.remove('is-loading');
	}
}

module.exports = Button;
