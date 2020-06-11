class ButtonWithStates {
	init(button) {
		this.button = button;
		this.dataset = button.dataset;
		this.buttonTexElm = this.button.querySelector('.a-button__text');

		// "iis-a-button" or "goto10-a-button" or similar.
		this.cssNamespace = this.button.classList.item(0);

		// Keep a reference to the original className so we can use
		// it as a base when adding classes for each state.
		// Will be something like "a-button a-button--large has-states"
		this.originalClassName = this.button.className;

		// Get state info from button data attributes.
		this.states = {
			default: {
				name: 'default',
				text: this.dataset.statebuttonDefaultText,
				icon: this.dataset.statebuttonDefaultIcon,
				backgroundColor: 'lemon',
			},
			defaultHover: {
				name: 'defaultHover',
				text: this.dataset.statebuttonDefaultText,
				icon: this.dataset.statebuttonDefaultIcon,
				backgroundColor: 'lemon-light',
			},
			activated: {
				name: 'activated',
				text: this.dataset.statebuttonActivatedText,
				icon: this.dataset.statebuttonActivatedIcon,
				backgroundColor: 'jade',
			},
			deactivate: {
				name: 'deactivate',
				text: this.dataset.statebuttonDeactivateText,
				icon: this.dataset.statebuttonDeactivateIcon,
				backgroundColor: 'ruby',
			},
			current: this.dataset.statebuttonStateCurrent,
		};

		// Switch to default state.
		this.switchToState(this.states.current);

		this.addListeners();
	}

	/**
	 * Add listeners.
	 */
	addListeners() {
		this.button.addEventListener('mouseenter', this.handleMouseEnter);
		this.button.addEventListener('mouseleave', this.handleMouseLeave);
		this.button.addEventListener('click', this.handleClick);
	}

	/**
	 * Handle mouse enter.
	 */
	handleMouseEnter = () => {
		switch (this.states.current) {
			case 'default':
				this.switchToState('defaultHover');
				break;
			case 'activated':
				this.switchToState('deactivate');
				break;
			default:
			// Do nothing.
		}
	};

	/**
	 * Handle mouse leave.
	 */
	handleMouseLeave = () => {
		switch (this.states.current) {
			case 'defaultHover':
				this.switchToState('default');
				break;
			case 'deactivate':
				this.switchToState('activated');
				break;
			default:
			// Do nothing.
		}
	};

	/**
	 * Handle clicks on button.
	 */
	handleClick = () => {
		switch (this.states.current) {
			case 'default':
			case 'defaultHover':
				this.switchToState('activated');
				break;
			case 'deactivate':
				this.switchToState('default');
				break;
			default:
			// Do nothing.
		}
	};

	/**
	 * Switch to a state.
	 */
	switchToState(newStateName) {
		const newStateObj = this.states[newStateName];

		// Update text.
		this.buttonTexElm.innerText = newStateObj.text;

		// Update className.
		this.button.className = this.originalClassName;
		this.button.classList.add(`background-${newStateObj.backgroundColor}`);

		// Remove any previous icon.
		const prevIcon = this.button.querySelector('.icon');
		if (prevIcon) {
			this.button.querySelector('.icon').remove();
			this.button.classList.remove(`${this.cssNamespace}--icon`);
		}

		// And new icon.
		const iconName = newStateObj.icon;
		if (iconName) {
			this.button.classList.add(`${this.cssNamespace}--icon`);
			const iconClass = `icon ${this.cssNamespace}__icon`;
			const html = `
				<svg class="${iconClass}">
					<use xlink:href="#icon-${iconName}"></use>
				</svg>
			`;

			this.button.appendChild(
				document.createRange().createContextualFragment(html),
			);
		}

		// State updated, set new state as current state.
		const prevStateName = this.states.current;
		this.states.current = newStateName;

		// Trigger events for activating and deactivating.
		let eventName;
		if (
			prevStateName === 'defaultHover'
			&& this.states.current === 'activated'
		) {
			eventName = 'activated';
		} else if (
			prevStateName === 'deactivate'
			&& this.states.current === 'default'
		) {
			eventName = 'deactivated';
		}
		if (eventName) {
			const event = new Event(eventName);
			this.button.dispatchEvent(event);
		}
	}
}

module.exports = ButtonWithStates;
