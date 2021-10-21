'use strict';

var _smoothScroll = require('smooth-scroll');

var _smoothScroll2 = _interopRequireDefault(_smoothScroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var anchorScroll = new _smoothScroll2.default('a[href*="#"]', {
	easing: 'easeOutCubic'
});

module.exports = anchorScroll;