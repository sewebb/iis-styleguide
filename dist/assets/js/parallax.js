'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.cache = cache;
function isInView(el) {
	var box = el.getBoundingClientRect();
	return box.top < window.innerHeight && box.bottom >= 0;
}

var parallaxes = [];

// eslint-disable-next-line import/prefer-default-export
function cache() {
	parallaxes = document.querySelectorAll('.js-parallax');
}

cache();

window.addEventListener('scroll', function () {
	[].forEach.call(parallaxes, function (parallax) {
		if (parallax.classList.contains('animate')) {
			return;
		}

		var visible = isInView(parallax);
		if (visible) {
			parallax.classList.add('animate');
		}
	});
});