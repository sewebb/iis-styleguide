'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = queryToObj;
/** Parse query string to object */
function queryToObj(query) {
	var obj = {};
	var pairs = query.split('&');

	pairs.forEach(function (pair) {
		var _pair$split = pair.split('='),
		    _pair$split2 = _slicedToArray(_pair$split, 2),
		    key = _pair$split2[0],
		    value = _pair$split2[1];

		obj[decodeURIComponent(key)] = decodeURIComponent(value || '');
	});

	return obj;
}