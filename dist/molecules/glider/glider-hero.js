'use strict';

var _gliderJs = require('glider-js');

var _gliderJs2 = _interopRequireDefault(_gliderJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gliderElementHero = document.querySelector('.js-glider-hero');

if (gliderElementHero) {
	var GliderHero = new _gliderJs2.default(gliderElementHero, {
		scrollLock: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: {
			prev: '.js-glider-prev',
			next: '.js-glider-next'
		}
	});

	module.exports = GliderHero;
}