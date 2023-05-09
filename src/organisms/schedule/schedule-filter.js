const el = document.querySelector('.js-filter');

if (el) {
	const observer = new IntersectionObserver(
		([e]) => document.querySelector('.js-filter').classList.toggle('is-sticky', e.intersectionRatio < 1),
		{ threshold: [1] },
	);

	observer.observe(el);
}
