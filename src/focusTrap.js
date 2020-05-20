import createFocusTrap from 'focus-trap';

function getContainer(element) {
	return document.getElementById(element.getAttribute('data-a11y-toggle'));
}

function focusTrap(container) {
	if (container && container.getAttribute('data-focus-trap') !== 'false' && !container.focusTrap) {
		container.focusTrap = createFocusTrap(`#${container.id}`, { clickOutsideDeactivates: true });
		container.setAttribute('data-focus-trap', 'true');
	}
}

const buttons = document.querySelectorAll('[data-a11y-toggle');

[].forEach.call(buttons, (button) => {
	const container = getContainer(button);

	if (!container) {
		return;
	}

	container.setAttribute('data-container', 'true');

	if (!container.focusTrap) {
		focusTrap(container);
	}
});

function delegate(handler, e) {
	const target = e.target.closest('[data-a11y-toggle]');

	if (!target) {
		return;
	}

	handler(e, target);
}

function handleKeyDown(e, element) {
	if (element.getAttribute('aria-expanded') === 'true') {
		return;
	}

	if (e.keyCode === 9) {
		const container = getContainer(element);

		if (container) {
			container.tabIndex = -1;
		}
	}
}

function handleFocusTrap(e, element) {
	const container = getContainer(element);

	if (!container) {
		return;
	}

	focusTrap(container);

	// Run on next tick
	setTimeout(() => {
		if (container.getAttribute('aria-hidden') === 'false') {
			container.tabIndex = 0;

			if (container.focusTrap) {
				container.focusTrap.activate();
			}
		} else {
			if (container.focusTrap) {
				container.focusTrap.deactivate();
			}

			container.addEventListener('transitionend', () => {
				container.tabIndex = -1;
			}, { once: true });
		}
	}, 0);
}

function handleMouseUp(e) {
	const button = e.target.closest('[data-a11y-toggle]');
	const containers = document.querySelectorAll('[data-container]');

	if (!e.target.closest('[data-focus-trap]')) {
		[].forEach.call(containers, (container) => {
			const id = (button) ? button.getAttribute('data-a11y-toggle') : '';

			if (container.getAttribute('aria-hidden') === 'false' && container.id !== id) {
				window.a11yToggle(container);
			}
		});
	}
}

document.addEventListener('click', delegate.bind(null, handleFocusTrap));
document.addEventListener('keydown', delegate.bind(null, handleKeyDown), { once: true });
document.addEventListener('mouseup', handleMouseUp);
