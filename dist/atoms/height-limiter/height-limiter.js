'use strict';

var elements = document.querySelectorAll('.js-height-limit');

if (elements) {
	[].forEach.call(elements, function (element) {
		var height = element.getAttribute('data-height');
		var innerContainer = element.querySelector('[class*="inner"]');
		var button = element.querySelector('.js-toggle-height');
		var buttonTextElement = button.querySelector('span');
		var buttonText = buttonTextElement.innerText;
		var toggleText = element.getAttribute('data-toggle-text');

		if (element.offsetHeight >= height) {
			innerContainer.setAttribute('style', 'max-height:' + height + 'px;');
			innerContainer.classList.add('is-limited');
			button.classList.remove('is-hidden');
		} else {
			innerContainer.removeAttribute('style');
			innerContainer.classList.remove('is-limited');
			button.classList.add('is-hidden');
		}

		button.addEventListener('click', function () {
			innerContainer.classList.toggle('is-limited');
			innerContainer.setAttribute('style', innerContainer.style.maxHeight === height + 'px' ? 'max-height:none' : 'max-height:' + height + 'px');
			buttonTextElement.innerText = buttonTextElement.innerText === buttonText ? toggleText : buttonText;
			button.classList.toggle('is-clicked');
		});

		window.addEventListener('resize', function () {
			if (innerContainer.offsetHeight >= height) {
				innerContainer.setAttribute('style', 'max-height:' + height + 'px;');
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