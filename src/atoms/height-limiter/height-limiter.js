const elements = document.querySelectorAll('.js-height-limit');

if (elements) {
	[].forEach.call(elements, (element) => {
		const height = element.getAttribute('data-height');
		const innerContainer = element.querySelector('[class*="inner"]');
		const button = element.querySelector('.js-toggle-height');
		const buttonText = button.querySelector('span');

		if (element.offsetHeight >= height) {
			innerContainer.setAttribute('style', `max-height:${height}px;`);
			innerContainer.classList.add('is-limited');
			button.classList.remove('is-hidden');
		} else {
			innerContainer.removeAttribute('style');
			innerContainer.classList.remove('is-limited');
			button.classList.add('is-hidden');
		}

		button.addEventListener('click', () => {
			innerContainer.classList.toggle('is-limited');
			innerContainer.setAttribute('style', (innerContainer.style.maxHeight === `${height}px`) ? 'max-height:none' : `max-height:${height}px`);
			buttonText.innerText = (buttonText.innerText === 'Visa mer') ? 'Visa mindre' : 'Visa mer';
			button.classList.toggle('is-clicked');
		});

		window.addEventListener('resize', () => {
			if (innerContainer.offsetHeight >= height) {
				innerContainer.setAttribute('style', `max-height:${height}px;`);
				innerContainer.classList.add('is-limited');
				button.classList.remove('is-hidden');
			} else {
				innerContainer.removeAttribute('style');
				innerContainer.classList.remove('is-limited');
				button.classList.add('is-hidden');
			}
		});
	});
}
