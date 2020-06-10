const elements = document.querySelectorAll('.js-height-limit');

if (elements) {
	[].forEach.call(elements, (element) => {
		const height = element.getAttribute('data-height');
		const innerContainer = element;
		element.setAttribute('style', `max-height:${height}px;`);
		element.addEventListener('click', () => {
			console.log('foo');
		});

		window.addEventListener('resize', () => {
			if (element.offsetHeight >= height) {
				element.classList.add('is-limited');
			} else {
				element.classList.remove('is-limited');
			}
		});
	});
}
