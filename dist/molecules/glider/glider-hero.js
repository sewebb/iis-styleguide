'use strict';

var _gliderJs = require('glider-js');

var _gliderJs2 = _interopRequireDefault(_gliderJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gliderElementHero = document.querySelector('.js-glider-hero');
var dataLayer = window.dataLayer || [];
var gliderLinks = document.querySelectorAll('.glider-slide a');

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
	} else {
		document.querySelector('.js-glider-prev').addEventListener('click', function () {
			dataLayer.push({
				event: 'carousel',
				eventInfo: {
					category: 'carousel',
					action: 'click',
					label: 'arrow_left'
				}
			});
		});

		document.querySelector('.js-glider-next').addEventListener('click', function () {
			dataLayer.push({
				event: 'carousel',
				eventInfo: {
					category: 'carousel',
					action: 'click',
					label: 'arrow_right'
				}
			});
		});

		[].forEach.call(gliderLinks, function (gliderLink) {
			gliderLink.addEventListener('click', function () {
				var linkTarget = gliderLink.href;
				console.log(linkTarget);
				dataLayer.push({
					event: 'carousel',
					eventInfo: {
						category: 'carousel',
						action: 'click',
						label: linkTarget
					}
				});
			});
		});
	}

	module.exports = GliderHero;
}