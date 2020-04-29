require('./atoms/grid-toggle/grid-toggle');
require('./components');

const Button = require('./atoms/button/button');
const ButtonWithStates = require('./atoms/button/buttonWithStates');

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

const demoButtonsMultipleStates = document.querySelectorAll('button.a-button.has-states');

if (demoButtonsMultipleStates.length) {
	demoButtonsMultipleStates.forEach((button) => {
		const b = new ButtonWithStates(button);

		button.addEventListener('click', () => {
			console.log('click button with state');
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
