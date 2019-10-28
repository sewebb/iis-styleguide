'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = validationMessage;
function validationMessage(message) {
	var _message$split = message.split(':'),
	    _message$split2 = _slicedToArray(_message$split, 2),
	    rule = _message$split2[0],
	    data = _message$split2[1];

	if (!('Iis_Lang' in window)) {
		return rule;
	}

	var validation = window.Iis_Lang.validation;


	if (rule in validation) {
		return validation[rule].replace(new RegExp(':' + rule, 'g'), data);
	}

	return rule;
}