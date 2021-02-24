"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var debounce = function debounce(func) {
	var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	var inDebounce = void 0;

	return function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var context = undefined;
		clearTimeout(inDebounce);
		inDebounce = setTimeout(function () {
			return func.apply(context, args);
		}, delay);
	};
};

exports.default = function (func, delay) {
	return debounce(func, delay);
};