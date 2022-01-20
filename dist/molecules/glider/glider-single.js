'use strict';

var _gliderJs = require('glider-js');

var _gliderJs2 = _interopRequireDefault(_gliderJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gliderElementSingle = document.querySelector('.js-glider-single');

if (gliderElementSingle) {
	var GliderSingle = new _gliderJs2.default(gliderElementSingle, {
		scrollLock: true,
		slidesToShow: 1,
		slidesToScroll: 1
	});

	var nextBtns = document.querySelectorAll('.js-glider-next');
	var prevBtns = document.querySelectorAll('.js-glider-prev');
	var siteMain = document.querySelector('#siteMain');
	var zoomImages = document.querySelectorAll('.js-zoom');
	var slideIndex = GliderSingle.getCurrentSlide();
	var bounding = 0;

	var scrollTop = function scrollTop() {
		siteMain.scrollIntoView();
	};

	if (nextBtns) {
		[].forEach.call(nextBtns, function (nextBtn) {
			nextBtn.addEventListener('click', function () {
				GliderSingle.scrollItem(slideIndex += 1, true);

				if (siteMain) {
					bounding = siteMain.getBoundingClientRect();
					if (bounding.top < 0) {
						scrollTop();
					}
				}
			});
		});
	}

	if (prevBtns) {
		[].forEach.call(prevBtns, function (prevBtn) {
			prevBtn.addEventListener('click', function () {
				GliderSingle.scrollItem(slideIndex -= 1, true);

				if (siteMain) {
					bounding = siteMain.getBoundingClientRect();
					if (bounding.top < 0) {
						scrollTop();
					}
				}
			});
		});
	}

	if (zoomImages) {
		[].forEach.call(zoomImages, function (zoomImage) {
			zoomImage.addEventListener('click', function () {
				zoomImage.classList.toggle('is-zoomed');
			});
		});
	}

	module.exports = GliderSingle;
}