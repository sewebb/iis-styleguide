'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var selectStore = {};

function effectChain(element, value) {
	var options = element.querySelectorAll('option[data-if-chain]');
	var oldValue = element.value;

	if (!(element.name in selectStore)) {
		// First time, cache options
		selectStore[element.name] = [];

		[].forEach.call(options, function (el) {
			selectStore[element.name].push(el.cloneNode(true));
		});
	}

	[].forEach.call(options, function (el) {
		if (element.value === el.value) {
			element.value = '';
		}

		element.removeChild(el);
	});

	if (!value) {
		return;
	}

	var cached = selectStore[element.name];

	if (!cached.length) {
		return;
	}

	var newOptions = cached.filter(function (el) {
		return el.getAttribute('data-if-chain') === value;
	});

	if (newOptions.length) {
		newOptions.forEach(function (el) {
			return element.appendChild(el.cloneNode(true));
		});
	}

	if (newOptions.length === 1) {
		element.value = newOptions[0].value;
	}

	if (oldValue !== element.value) {
		element.dispatchEvent(new Event('change', { bubbles: true }));
	}
}

function effectDisable(element, disable, value) {
	element.disabled = disable;

	if (!disable && element.tagName.toLowerCase() === 'select') {
		effectChain(element, value);
	}
}

function effectToggle(element, show) {
	element.style.display = show ? null : 'none';
}

function effectText(element, value) {
	if (!element.hasAttribute('data-if-default')) {
		element.setAttribute('data-if-default', element.innerText);
	}

	var values = element.getAttribute('data-if-values').split('|');
	var text = values.map(function (item) {
		return item.split(':');
	}).find(function (_ref) {
		var _ref2 = _slicedToArray(_ref, 1),
		    m = _ref2[0];

		return m === value;
	});

	element.innerText = text ? text[1] : element.getAttribute('data-if-default');
}

function update(element, value) {
	var effect = element.getAttribute('data-if-effect') || 'toggle';
	var values = element.getAttribute('data-if').split('|').map(function (match) {
		return match.split(':')[1];
	}).filter(function (v) {
		return v;
	});
	var matches = values.some(function (match) {
		return match === value || match.indexOf('!') === 0 && match.substring(1) !== value;
	});
	var conditionMet = !values.length && !!value || matches;

	if (effect === 'disable') {
		effectDisable(element, !conditionMet, value);
	} else if (effect === 'toggle') {
		effectToggle(element, conditionMet);
	} else if (effect === 'text') {
		effectText(element, value);
	}
}

function init() {
	var elements = document.querySelectorAll('[data-if]');

	[].forEach.call(elements, function (element) {
		var _element$getAttribute = element.getAttribute('data-if').split(':'),
		    _element$getAttribute2 = _slicedToArray(_element$getAttribute, 1),
		    name = _element$getAttribute2[0];

		var form = element.closest('form');

		if (!form) {
			console.warn('Conditionals must be inside a form to avoid conflicts');
			return;
		}

		var related = form.querySelector('[name="' + name + '"]');

		if (related) {
			var value = related.value;


			if (['checkbox', 'radio'].includes(related.getAttribute('type'))) {
				value = related.checked ? related.value : null;
			}

			update(element, value);
		}
	});
}

function delegate(_ref3) {
	var target = _ref3.target;
	var name = target.name;


	if (!name) {
		return;
	}

	var elements = document.querySelectorAll('[data-if^="' + name + '"]');

	if (!elements.length) {
		return;
	}

	var value = target.value;


	if (['checkbox', 'radio'].includes(target.getAttribute('type'))) {
		value = target.checked ? target.value : null;
	}

	[].forEach.call(elements, function (element) {
		return update(element, value);
	});
}

init();
document.body.addEventListener('change', delegate);