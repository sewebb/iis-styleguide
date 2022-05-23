'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var objToQuery = function objToQuery(obj) {
	var exclude = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	var query = [];

	Object.entries(obj).forEach(function (_ref) {
		var _ref2 = _slicedToArray(_ref, 2),
		    key = _ref2[0],
		    value = _ref2[1];

		if (exclude.indexOf(key) > -1) {
			return;
		}

		var queryKey = parent ? parent + '[' + key + ']' : key;

		if (Array.isArray(value)) {
			value.forEach(function (subValue) {
				return query.push(queryKey + '[]=' + encodeURIComponent(subValue));
			});
		} else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
			query.push(objToQuery(value, exclude, queryKey));
		} else {
			query.push(queryKey + '=' + encodeURIComponent(value));
		}
	});

	return query.join('&');
};

exports.default = function (obj, exclude) {
	return objToQuery(obj, exclude);
};