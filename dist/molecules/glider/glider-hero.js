'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.initHeroGlider = initHeroGlider;

var _gliderJs = require('glider-js');

var _gliderJs2 = _interopRequireDefault(_gliderJs);

var _nodeAdded = require('../../assets/js/nodeAdded');

var _nodeAdded2 = _interopRequireDefault(_nodeAdded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/prefer-default-export
function initHeroGlider(node) {
	if (node.hasAttribute('data-glider-initialized')) {
		return;
	}

	var dataLayer = window.dataLayer || [];
	var gliderLinks = document.querySelectorAll('.glider-slide a');

	var GliderHero = new _gliderJs2.default(node, {
		scrollLock: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		rewind: true,
		arrows: {
			prev: '.js-glider-prev',
			next: '.js-glider-next'
		}
	});

	node.setAttribute('data-glider-initialized', 'true');

	var autoplayDelay = node.dataset.timeout;

	if (autoplayDelay) {
		var autoplay = setInterval(function () {
			GliderHero.scrollItem('next');
		}, parseInt(autoplayDelay, 10));

		node.addEventListener('mouseover', function () {
			if (autoplay !== null) {
				clearInterval(autoplay);
				autoplay = null;
			}
		}, 0);

		node.addEventListener('mouseout', function () {
			if (autoplay === null) {
				autoplay = setInterval(function () {
					GliderHero.scrollItem('next');
				}, parseInt(autoplayDelay, 10));
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
}

(0, _nodeAdded2.default)('.js-glider-hero', initHeroGlider);

var gliderElementHero = document.querySelector('.js-glider-hero');

if (gliderElementHero) {
	initHeroGlider(gliderElementHero);
}