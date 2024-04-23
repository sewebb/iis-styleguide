const el = document.querySelector('.js-filter');

if (el) {
	const observer = new IntersectionObserver(
		([e]) => el.classList.toggle('is-sticky', e.intersectionRatio < 1),
		{ threshold: [1] },
	);

	observer.observe(el);
}
