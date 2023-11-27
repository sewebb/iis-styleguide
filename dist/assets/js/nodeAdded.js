'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = nodeAdded;
var callbacks = {};

function dispatch(node, cbs) {
	cbs.forEach(function (cb) {
		return cb(node);
	});
}

var observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		mutation.addedNodes.forEach(function (node) {
			if (node.nodeType === Node.ELEMENT_NODE) {
				Object.entries(callbacks).forEach(function (_ref) {
					var _ref2 = _slicedToArray(_ref, 2),
					    selector = _ref2[0],
					    selectorCallbacks = _ref2[1];

					if (node.matches(selector)) {
						dispatch(node, selectorCallbacks);
					} else if (node.id === 'siteMain') {
						var child = node.querySelector(selector);

						if (child) {
							dispatch(child, selectorCallbacks);
						}
					}
				});
			}
		});
	});
});

observer.observe(document.body, {
	childList: true,
	subtree: true
});

function nodeAdded(selector, callback) {
	if (!(selector in callbacks)) {
		callbacks[selector] = [];
	}

	callbacks[selector].push(callback);

	return function unsubscribe() {
		var index = callbacks[selector].indexOf(callback);

		if (index > -1) {
			callbacks[selector].splice(index, 1);
		}
	};
}