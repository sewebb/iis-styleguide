'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = focusTrap;

var _focusTrap = require('focus-trap');

var _focusTrap2 = _interopRequireDefault(_focusTrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getContainer(element) {
	return document.getElementById(element.getAttribute('data-a11y-toggle'));
}

function focusTrap(container) {
	if (container && container.getAttribute('data-focus-trap') !== 'false' && !container.focusTrap) {
		container.focusTrap = (0, _focusTrap2.default)('#' + container.id, { clickOutsideDeactivates: true });
		container.setAttribute('data-focus-trap', 'true');
	}
}

var buttons = document.querySelectorAll('[data-a11y-toggle]');

[].forEach.call(buttons, function (button) {
	var container = getContainer(button);

	if (!container) {
		return;
	}

	container.setAttribute('data-container', 'true');

	if (!container.focusTrap) {
		focusTrap(container);
	}
});

function delegate(handler, e) {
	var target = e.target.closest('[data-a11y-toggle]');

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
		var container = getContainer(element);

		if (container) {
			container.tabIndex = -1;
		}
	}
}

function handleFocusTrap(e, element) {
	var container = getContainer(element);

	if (!container) {
		return;
	}

	focusTrap(container);

	// Run on next tick
	setTimeout(function () {
		if (container.getAttribute('aria-hidden') === 'false') {
			container.tabIndex = 0;

			if (container.focusTrap) {
				container.focusTrap.activate();
			}
		} else {
			if (container.focusTrap) {
				container.focusTrap.deactivate();
			}

			container.addEventListener('transitionend', function () {
				container.tabIndex = -1;
			}, { once: true });
		}
	}, 0);
}

document.addEventListener('click', delegate.bind(null, handleFocusTrap));
document.addEventListener('keydown', delegate.bind(null, handleKeyDown), { once: true });