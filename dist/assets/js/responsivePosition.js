'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _throttle = require('lodash/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var breakpoints = {
	xs: 0,
	smxs: 469,
	sm: 576,
	md: 769,
	lg: 961,
	xl: 1200,
	xxl: 1400
};

var matchedBreakpoints = [];

function repositionElement(element) {
	var positions = element.getAttribute('data-responsive').split(',');
	var position = null;

	positions.forEach(function (item) {
		var _item$split = item.split(':'),
		    _item$split2 = _slicedToArray(_item$split, 2),
		    bp = _item$split2[0],
		    id = _item$split2[1];

		if (matchedBreakpoints.includes(bp)) {
			position = id;
		}
	});

	if (position === null) {
		return;
	}

	var newParent = document.getElementById(position);

	if (!newParent || element.parentNode === newParent) {
		return;
	}

	newParent.appendChild(element);
}

function dispatch() {
	var elements = document.querySelectorAll('[data-responsive]');

	if (!elements.length) {
		return;
	}

	var width = window.innerWidth;

	matchedBreakpoints = Object.entries(breakpoints).filter(function (_ref) {
		var _ref2 = _slicedToArray(_ref, 2),
		    min = _ref2[1];

		return width >= min;
	}).map(function (_ref3) {
		var _ref4 = _slicedToArray(_ref3, 1),
		    bp = _ref4[0];

		return bp;
	});

	if (matchedBreakpoints.length) {
		[].forEach.call(elements, repositionElement);
	}
}

var onResize = (0, _throttle2.default)(dispatch, 100);

window.addEventListener('resize', onResize);
dispatch();