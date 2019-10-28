import Form from './molecules/form/Form';

require('./atoms/grid-toggle/grid-toggle');
require('./atoms/toggle-high-contrast/toggle-high-contrast');
require('./components');

const Button = require('./atoms/button/Button');

const demoButtons = document.querySelectorAll('button.a-button.has-loader');
const demoForms = document.querySelectorAll('[data-form]');

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

if (demoForms.length) {
	demoForms.forEach((element) => new Form(element));
}
