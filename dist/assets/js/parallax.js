'use strict';

function isInView(el) {
	var box = el.getBoundingClientRect();
	return box.top < window.innerHeight && box.bottom >= 0;
}

var parallaxes = document.querySelectorAll('.js-parallax');

window.addEventListener('scroll', function () {
	[].forEach.call(parallaxes, function (parallax) {
		var visible = isInView(parallax);
		if (visible) {
			parallax.classList.add('animate');
		}
	});
});