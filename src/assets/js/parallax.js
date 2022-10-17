function isInView(el) {
	const box = el.getBoundingClientRect();
	return box.top < window.innerHeight && box.bottom >= 0;
}

const parallaxes = document.querySelectorAll('.js-parallax');

window.addEventListener('scroll', () => {
	[].forEach.call(parallaxes, (parallax) => {
		const visible = isInView(parallax);
		if (visible) {
			parallax.classList.add('animate');
		}
	});
});
