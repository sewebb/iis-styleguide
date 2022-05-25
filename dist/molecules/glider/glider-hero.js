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
		rewind: true,
		arrows: {
			prev: '.js-glider-prev',
			next: '.js-glider-next'
		}
	});

	var autoplayDelay = gliderElementHero.dataset.timeout;

	if (autoplayDelay) {
		var autoplay = setInterval(function () {
			GliderHero.scrollItem('next');
		}, autoplayDelay);

		gliderElementHero.addEventListener('mouseover', function () {
			if (autoplay !== null) {
				clearInterval(autoplay);
				autoplay = null;
			}
		}, 0);

		gliderElementHero.addEventListener('mouseout', function () {
			if (autoplay === null) {
				autoplay = setInterval(function () {
					GliderHero.scrollItem('next');
				}, autoplayDelay);
			}
		}, 0);
	}

	module.exports = GliderHero;
}