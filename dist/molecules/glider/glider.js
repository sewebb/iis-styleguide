'use strict';

var _gliderJs = require('glider-js');

var _gliderJs2 = _interopRequireDefault(_gliderJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gliderWrappers = document.querySelectorAll('.glider-contain');

if (gliderWrappers) {
	[].forEach.call(gliderWrappers, function (gliderWrapper) {
		var gliderElement = gliderWrapper.querySelector('.js-glider');
		var dots = gliderWrapper.classList.toString();
		var glider = new _gliderJs2.default(gliderElement, {
			scrollLock: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: '.' + dots + '+.glider-dots',
			arrows: {
				prev: gliderWrapper.querySelector('.js-glider-prev'),
				next: gliderWrapper.querySelector('.js-glider-next')
			},
			responsive: [{
				breakpoint: 961,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			}, {
				breakpoint: 769,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}, {
				breakpoint: 469,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}]
		});
		module.exports = glider;
	});
}