'use strict';

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var elements = document.querySelectorAll('[data-form]');

if (elements.length) {
	elements.forEach(function (element) {
		return new _Form2.default(element);
	});
}