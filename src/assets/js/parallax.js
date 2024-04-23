function isInView(el) {
	const box = el.getBoundingClientRect();
	return box.top < window.innerHeight && box.bottom >= 0;
}

let parallaxes = [];

// eslint-disable-next-line import/prefer-default-export
export function cache() {
	parallaxes = document.querySelectorAll('.js-parallax');
}

cache();

window.addEventListener('scroll', () => {
	[].forEach.call(parallaxes, (parallax) => {
		if (parallax.classList.contains('animate')) {
			return;
		}

		const visible = isInView(parallax);
		if (visible) {
			parallax.classList.add('animate');
		}
	});
});
