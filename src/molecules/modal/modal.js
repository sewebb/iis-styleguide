import className from '../../assets/js/className';

/**
 * Modal content
 * @typedef {Object} ModalContent
 * @property {string} title - Modal title
 * @property {string} content - Modal content
 */

/**
 * Modal action
 * @typedef {Object} ModalAction
 * @property {string} icon - icon name
 * @property {string} color - styleguide color
 * @property {string} text - action content
 * @property {string} url - action link url
 * @property {string} target - action link target
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

	let cls = `${className(`a-button a-button--${action.color}`)} u-m-l-2`;

	if (action.icon) {
		cls += ` ${className('a-button--icon')}`;
	}

	const button = `
		<a href="${action.url}" class="${cls}" target="${action.target}">
			<span class="goto10-a-button__text">${action.text}</span>
			${icon}
		</a>
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

		if (active.actions) {
			modalActions.innerHTML = '';
			active.actions.forEach(addAction);

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
	if (!active) {
		return;
	}

	active.el.setAttribute('aria-hidden', 'true');

	if (active.settings.onClose) {
		active.settings.onClose(active.id);
	}

	active = null;

	dispatch();
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
 * @param {ModalAction[]} actions
 * @param {ModalSettings} settings
 */
function open(content, actions = null, settings = {}) {
	queue.push({
		id: getId(),
		content,
		actions,
		settings,
	});

	dispatch();
}

window.addEventListener('load', createModal);

export {
	clearQueue,
	open,
	close,
};
