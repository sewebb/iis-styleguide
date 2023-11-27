import 'a11y-toggle';
import './focusTrap';
import './assets/js/conditional';

require('./atoms/grid-toggle/grid-toggle');
require('./components');

const Button = require('./atoms/button/Button');
const { open, onClose, onOpen } = require('./molecules/modal/modal');

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

const demoModal = document.querySelector('[data-open-demo-modal]');

if (demoModal) {
	demoModal.addEventListener('click', () => {
		open({
			title: 'My modal title',
			content: '<p>My modal content.</p>',
			actions: [
				{
					text: 'Open modal',
					color: 'peacock-light',
					modifier: 'primary',
					attrs: {
						'data-modal-close': null,
					},
				},
				{
					text: 'Replace modal',
					color: 'ruby-light',
					modifier: 'secondary',
					attrs: {
						'data-modal-open': 'modal-container',
						'data-modal-replace': true,
					},
				},
			],
		}, {
			onClose: (id) => console.log('close', id),
			onOpen: (id) => console.log('open', id),
		});
	});
}

// eslint-disable-next-line no-unused-vars
const unsubscribe = onClose((el, id) => {
	console.log('Global onClose', el, id);
});

// Call unsubscribe to remove callback

// eslint-disable-next-line no-unused-vars
const unsubscribeOpen = onOpen((el, id) => {
	console.log('Global onOpen', el, id);
});

// Call unsubscribe to remove callback

const demoForms = document.querySelectorAll('[data-form]');

[].forEach.call(demoForms, (el) => {
	if ('form' in el) {
		el.form.events.on('success', (data) => {
			console.log('Form success', data);
		});
	}
});
