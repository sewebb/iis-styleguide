'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.close = exports.open = exports.clearQueue = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.onOpen = onOpen;
exports.onClose = onClose;

var _focusTrap = require('../../focusTrap');

var _focusTrap2 = _interopRequireDefault(_focusTrap);

var _className = require('../../assets/js/className');

var _className2 = _interopRequireDefault(_className);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Modal action
 * @typedef {Object} ModalAction
 * @property {string} icon - icon name
 * @property {string} color - styleguide color
 * @property {string} modifier - styleguide modifier
 * @property {string} text - action content
 * @property {string} url - action link url
 * @property {string} target - action link target
 * @property {string} key - action click handler key shortcut
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

var queue = [];
var globalOnCloseCallbacks = [];
var globalOnOpenCallbacks = [];
var active = null;
var incrementId = 0;
var modal = null;
var modalContent = null;
var modalActions = null;
var modalClose = null;
var keyHandlers = {};

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
	return Object.entries(obj).filter(function (_ref) {
		var _ref2 = _slicedToArray(_ref, 2),
		    value = _ref2[1];

		return value !== undefined;
	}).map(function (_ref3) {
		var _ref4 = _slicedToArray(_ref3, 2),
		    key = _ref4[0],
		    value = _ref4[1];

		return value !== null ? key + '=' + value : key;
	}).join(' ');
}

/**
 * Create an action DOM node and append to modal actions container.
 *
 * @param {ModalAction} action
 */
function addAction(action) {
	var icon = action.icon ? '\n\t\t<svg class="icon ' + (0, _className2.default)('a-button__icon') + '">\n\t\t\t<use xlink:href="#icon-' + action.icon + '"></use>\n\t\t</svg>\n\t' : '';

	var cls = (0, _className2.default)('a-button') + ' u-m-l-2';

	if (action.color) {
		cls += ' ' + (0, _className2.default)('a-button--' + action.color);
	}

	if (action.modifier) {
		cls += ' ' + (0, _className2.default)('m-modal__button-' + action.modifier);
	}

	if (action.icon) {
		cls += ' ' + (0, _className2.default)('a-button--icon');
	}

	var tag = action.url ? 'a' : 'button';
	var button = '\n\t\t<' + tag + ' ' + objectToAttributes(_extends({}, action.attrs, { href: action.url, target: action.target })) + ' class="' + cls + '">\n\t\t\t<span class="' + (0, _className2.default)('a-button__text') + '">' + action.text + '</span>\n\t\t\t' + icon + '\n\t\t</' + tag + '>\n\t';

	var dummy = document.createElement('div');

	dummy.innerHTML = button;

	var el = dummy.firstElementChild;
	modalActions.appendChild(el);

	if (action.onClick) {
		el.addEventListener('click', function (e) {
			// eslint-disable-next-line no-use-before-define
			action.onClick(e, modal, close);
		});
	}
}

function handleKeyUp(e) {
	Object.entries(keyHandlers).forEach(function (_ref5) {
		var _ref6 = _slicedToArray(_ref5, 2),
		    key = _ref6[0],
		    handler = _ref6[1];

		if (e.key.toLowerCase() === key) {
			// eslint-disable-next-line no-use-before-define
			handler(e, modal, close);
		}
	});
}

/**
 * Global onOpen handler
 *
 * @param {Function} cb
 * @returns {number}
 */
function onOpen(cb) {
	var index = globalOnOpenCallbacks.push(cb) - 1;

	return function () {
		globalOnOpenCallbacks.splice(index, 1);
	};
}

function dispatchOnOpenHandlers(el, id) {
	globalOnOpenCallbacks.forEach(function (cb) {
		return cb(el, id);
	});
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
		modalContent.innerHTML = '\n\t\t\t<h1>' + active.content.title + '</h1>\n\t\t\t' + active.content.content + '\n\t\t';

		if (active.content.actions) {
			modalActions.innerHTML = '';
			active.content.actions.forEach(addAction);

			modalActions.classList.remove('u-hide');
		} else {
			modalActions.classList.add('u-hide');
		}
	}

	(0, _focusTrap2.default)(active.el);

	active.el.setAttribute('aria-hidden', 'false');

	if (active.settings.onOpen) {
		active.settings.onOpen(active.id, active.el);
	}

	dispatchOnOpenHandlers(active.el, active.id);

	setTimeout(function () {
		if (active.el.focusTrap) {
			active.el.focusTrap.activate();
		}
	}, 1);

	// Just to make sure
	keyHandlers = {};

	if (active.content.actions) {
		active.content.actions.forEach(function (action) {
			if (action.key && action.onClick) {
				keyHandlers[action.key] = action.onClick;
			}
		});
	}

	document.addEventListener('keyup', handleKeyUp);
}

/**
 * Dispatch the next modal in queue.
 */
function dispatch() {
	if (!modal || active || !queue.length) {
		return;
	}

	active = queue.shift();

	display();
}

/**
 * Global onClose handler
 *
 * @param {Function} cb
 * @returns {number}
 */
function onClose(cb) {
	var index = globalOnCloseCallbacks.push(cb) - 1;

	return function () {
		globalOnCloseCallbacks.splice(index, 1);
	};
}

function dispatchOnCloseHandlers(el, id) {
	globalOnCloseCallbacks.forEach(function (cb) {
		return cb(el, id);
	});
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

		dispatchOnCloseHandlers(active.el, active.id);

		document.removeEventListener('keyup', handleKeyUp);

		if (active.el.focusTrap) {
			active.el.focusTrap.deactivate();
		}

		keyHandlers = {};
		active = null;
	}

	setTimeout(function () {
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

	var id = 'iisModal';
	var dummy = document.createElement('div');

	dummy.innerHTML = '\n\t\t<div id="' + id + '" class="' + (0, _className2.default)('m-modal m-modal--has-overlay') + '" data-container="true" aria-hidden="true" aria-labelledby="' + id + '-close">\n\t\t\t<div class="' + (0, _className2.default)('m-modal__container') + '">\n\t\t\t\t<button type="button" class="' + (0, _className2.default)('a-button a-button--standalone-icon a-button--transparent') + '" data-modal-close aria-expanded="false" data-a11y-toggle="' + id + '" aria-controls="' + id + '" id="' + id + '-close">\n\t\t\t\t\t<span class="' + (0, _className2.default)('a-button__text') + ' u-visuallyhidden">St\xE4ng</span>\n\t\t\t\t\t<svg class="icon ' + (0, _className2.default)('a-button__icon') + '">\n\t\t\t\t\t\t<use xlink:href="#icon-close"></use>\n\t\t\t\t\t</svg>\n\t\t\t\t</button>\n\t\t\t\t<div class="' + (0, _className2.default)('m-modal__content') + '" data-modal-content></div>\n\t\t\t\t<div class="' + (0, _className2.default)('m-modal__buttons') + ' u-m-t-2 u-hide" data-modal-actions></div>\n\t\t\t</div>\n\t\t</div>\n\t';

	modal = dummy.firstElementChild;
	modalContent = modal.querySelector('[data-modal-content]');
	modalActions = modal.querySelector('[data-modal-actions]');
	modalClose = modal.querySelector('[data-modal-close]');

	document.body.appendChild(modal);

	modalClose.addEventListener('click', close);

	setTimeout(function () {
		dispatch();
	}, 1);
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
function open(content) {
	var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	if (active && settings.skipIfCurrent) {
		return;
	}

	queue.push({
		id: getId(),
		content: content,
		settings: settings
	});

	if (settings.replaceCurrent) {
		close();
	} else {
		dispatch();
	}
}

function delegate(e) {
	var openModal = e.target.closest('[data-modal-open]');

	if (openModal) {
		e.preventDefault();
		e.stopPropagation();

		var id = openModal.getAttribute('data-modal-open');
		var modalEl = document.getElementById(id);

		if (modalEl) {
			open(modalEl, {
				replaceCurrent: openModal.hasAttribute('data-modal-replace'),
				skipIfCurrent: openModal.hasAttribute('data-modal-skip')
			});

			[].forEach.call(document.querySelectorAll('[aria-controls="' + id + '"]'), function (el) {
				el.setAttribute('aria-expanded', 'true');
			});
		}

		return false;
	}

	var closeModal = e.target.closest('[data-modal-close]');

	if (closeModal) {
		e.preventDefault();
		e.stopPropagation();

		var _id = closeModal.getAttribute('data-modal-close') || active && active.el.id;

		if (active && active.el.id === _id) {
			close();

			[].forEach.call(document.querySelectorAll('[aria-controls="' + _id + '"]'), function (el) {
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

createModal();
attach();

exports.clearQueue = clearQueue;
exports.open = open;
exports.close = close;