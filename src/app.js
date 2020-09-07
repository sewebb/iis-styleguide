import './molecules/form';

require('./atoms/grid-toggle/grid-toggle');
require('./components');

const Button = require('./atoms/button/Button');

const demoButtons = document.querySelectorAll('button.a-button.has-loader');

if (demoButtons.length) {
	demoButtons.forEach((button) => {
		const b = new Button(button);

		button.addEventListener('click', () => {
			if (b.isLoading()) {
				return;
			}

			b.start();

			setTimeout(() => {
				b.stop();
			}, 2000);
		});
	});
}

/**
 * @type {NodeListOf<HTMLButtonElement>}
 */
const demoButtonsMultipleStates = document.querySelectorAll('button.a-button.has-states');

if (demoButtonsMultipleStates.length) {
	demoButtonsMultipleStates.forEach((button) => {
		const b = new Button(button, {
			hasStates: true,
			defaultColor: button.getAttribute('data-button-default-color'),
			defaultText: button.getAttribute('data-button-default-text'),
			defaultIcon: button.getAttribute('data-button-default-icon'),
			activeIcon: button.getAttribute('data-button-activated-icon'),
			activeColor: button.getAttribute('data-button-activated-color'),
			activeText: button.getAttribute('data-button-activated-text'),
			deactivateColor: button.getAttribute('data-button-deactivate-color'),
			deactivateText: button.getAttribute('data-button-deactivate-text'),
			deactivateIcon: button.getAttribute('data-button-deactivate-icon'),
		}, {
			activated: button.getAttribute('data-button-state') === 'activated',
		});

		b.on('click', () => {
			b.start();

			if (!b.isActivated()) {
				// Fake request
				setTimeout(() => {
					b.activate();
				}, 1000);
			} else {
				b.start();

				// Fake request
				setTimeout(() => {
					b.deactivate();
				}, 1000);
			}
		});
	});
}
