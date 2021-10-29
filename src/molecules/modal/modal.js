import className from '../../assets/js/className';

/**
 * Modal action
 * @typedef {Object} ModalAction
 * @property {string} icon - icon name
 * @property {string} color - styleguide color
 * @property {string} modifier - styleguide modifier
 * @property {string} text - action content
 * @property {string} url - action link url
 * @property {string} target - action link target
 * @property {function} onClick - action click handler
 * @property {object} attrs – action element attributes
 */

/**
 * Modal content
 * @typedef {Object} ModalContent
 * @property {string} title - Modal title
 * @property {string} content - Modal content
 * @property {ModalAction[]} actions - Modal actions
 */

/**
 * Modal settings
 * @typedef {Object} ModalSettings
 * @property {boolean} replaceCurrent - Replace currently displayed modal
 * @property {boolean} skipIfCurrent - Skip if currently displaying modal
 * @property {function} onClose - onClose callback
 * @property {function} onOpen - onOpen callback
 */

const queue = [];
let active = null;
let incrementId = 0;
let modal = null;
let modalContent = null;
let modalActions = null;
let modalClose = null;

/**
 * Increase increment ID and return the latest
 *
 * @returns {number}
 */
function getId() {
	incrementId += 1;

	return incrementId;
}

function objectToAttributes(obj) {
	return Object.entries(obj)
		.filter(([, value]) => value !== undefined)
		.map(([key, value]) => ((value !== null) ? `${key}=${value}` : key))
		.join(' ');
}

/**
 * Create an action DOM node and append to modal actions container.
 *
 * @param {ModalAction} action
 */
function addAction(action) {
	const icon = (action.icon) ? `
		<svg class="icon ${className('a-button__icon')}">
			<use xlink:href="#icon-${action.icon}"></use>
		</svg>
	` : '';

	let cls = `${className(`a-button a-button--${action.color}`)} ${className(`m-modal__button-${action.modifier}`)} u-m-l-2`;

	if (action.icon) {
		cls += ` ${className('a-button--icon')}`;
	}

	const tag = (action.url) ? 'a' : 'button';
	const button = `
		<${tag} ${objectToAttributes({ ...action.attrs, href: action.url, target: action.target })} class="${cls}">
			<span class="${className('a-button__text')}">${action.text}</span>
			${icon}
		</${tag}>
	`;

	modalActions.appendChild(document.createRange().createContextualFragment(button));
}

/**
 * Display the active modal.
 */
function display() {
	if (active.content.nodeName) {
		// Content is a custom modal
		active.el = active.content;
	} else {
		active.el = modal;
		modalContent.innerHTML = `
			<h1>${active.content.title}</h1>
			${active.content.content}
		`;

		if (active.content.actions) {
			modalActions.innerHTML = '';
			active.content.actions.forEach(addAction);

			modalActions.classList.remove('u-hide');
		} else {
			modalActions.classList.add('u-hide');
		}
	}

	active.el.setAttribute('aria-hidden', 'false');

	if (active.settings.onOpen) {
		active.settings.onOpen(active.id);
	}
}

/**
 * Dispatch the next modal in queue.
 */
function dispatch() {
	if (active || !queue.length) {
		return;
	}

	active = queue.shift();

	display();
}

/**
 * Close currently active modal
 * and dispatch next in queue.
 */
function close() {
	if (active) {
		active.el.setAttribute('aria-hidden', 'true');

		if (active.settings.onClose) {
			active.settings.onClose(active.id);
		}

		active = null;
	}

	setTimeout(() => {
		dispatch();
	}, 1);
}

/**
 * Create the modal skeleton and add it to the DOM.
 * Done once and cached.
 */
function createModal() {
	if (modal) {
		return;
	}

	const id = 'iisModal';
	const dummy = document.createElement('div');

	dummy.innerHTML = `
		<div id="${id}" class="${className('m-modal m-modal--has-overlay')}" data-container="true" aria-hidden="true" aria-labelledby="${id}-close">
			<div class="${className('m-modal__container')}">
				<button type="button" class="${className('a-button a-button--standalone-icon a-button--transparent')}" data-modal-close aria-expanded="false" data-a11y-toggle="${id}" aria-controls="${id}" id="${id}-close">
					<span class="${className('a-button__text')} u-visuallyhidden">Stäng</span>
					<svg class="icon ${className('a-button__icon')}">
						<use xlink:href="#icon-close"></use>
					</svg>
				</button>
				<div class="${className('m-modal__content')}" data-modal-content></div>
				<div class="${className('m-modal__buttons')} u-m-t-2 u-hide" data-modal-actions></div>
			</div>
		</div>
	`;

	modal = dummy.firstElementChild;
	modalContent = modal.querySelector('[data-modal-content]');
	modalActions = modal.querySelector('[data-modal-actions]');
	modalClose = modal.querySelector('[data-modal-close]');

	document.body.appendChild(modal);

	modalClose.addEventListener('click', close);
}

/**
 * Clear the current modal queue
 */
function clearQueue() {
	queue.length = 0;
}

/**
 * Open a modal.
 *
 * @param {ModalContent|HTMLElement} content
 * @param {ModalSettings} settings
 */
function open(content, settings = {}) {
	if (active && settings.skipIfCurrent) {
		return;
	}

	queue.push({
		id: getId(),
		content,
		settings,
	});

	if (settings.replaceCurrent) {
		close();
	} else {
		dispatch();
	}
}

function delegate(e) {
	const openModal = e.target.closest('[data-modal-open]');

	if (openModal) {
		e.preventDefault();
		e.stopPropagation();

		const id = openModal.getAttribute('data-modal-open');
		const modalEl = document.getElementById(id);

		if (modalEl) {
			open(modalEl, {
				replaceCurrent: openModal.hasAttribute('data-modal-replace'),
				skipIfCurrent: openModal.hasAttribute('data-modal-skip'),
			});

			[].forEach.call(document.querySelectorAll(`[aria-controls="${id}"]`), (el) => {
				el.setAttribute('aria-expanded', 'true');
			});
		}

		return false;
	}

	const closeModal = e.target.closest('[data-modal-close]');

	if (closeModal) {
		e.preventDefault();
		e.stopPropagation();

		const id = closeModal.getAttribute('data-modal-close') || (active && active.el.id);

		if (active && active.el.id === id) {
			close();

			[].forEach.call(document.querySelectorAll(`[aria-controls="${id}"]`), (el) => {
				el.setAttribute('aria-expanded', 'false');
			});
		}

		return false;
	}

	return true;
}

/**
 * Attach global listeners
 */
function attach() {
	document.body.addEventListener('click', delegate);
}

window.addEventListener('load', () => {
	createModal();
	attach();
});

export {
	clearQueue,
	open,
	close,
};
