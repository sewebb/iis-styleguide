'use strict';

var elements = document.querySelectorAll('.js-height-limit');
function update(innerContainer, button, height) {
	if (button.classList.contains('is-clicked')) {
		return;
	}

	if (innerContainer.offsetHeight >= height) {
		innerContainer.setAttribute('style', 'max-height:' + height + 'px;');
		innerContainer.classList.add('is-limited');
		button.classList.remove('is-hidden');
	} else {
		innerContainer.removeAttribute('style');
		innerContainer.classList.remove('is-limited');
		button.classList.add('is-hidden');
	}
}

function setup(element) {
	var height = element.getAttribute('data-height');
	var innerContainer = element.querySelector('[class*="inner"]');
	var button = element.querySelector('.js-toggle-height');
	var buttonTextElement = button.querySelector('span');
	var buttonText = buttonTextElement.innerText;
	var toggleText = element.getAttribute('data-toggle-text');
	var topPosition = void 0;

	update(innerContainer, button, height);

	button.addEventListener('click', function () {
		innerContainer.classList.toggle('is-limited');
		innerContainer.setAttribute('style', innerContainer.style.maxHeight === height + 'px' ? 'max-height:none' : 'max-height:' + height + 'px');
		buttonTextElement.innerText = buttonTextElement.innerText === buttonText ? toggleText : buttonText;
		button.classList.toggle('is-clicked');

		if (!innerContainer.classList.contains('is-limited')) {
			topPosition = document.documentElement.scrollTop;
		} else {
			window.scroll(0, topPosition);
		}

		setTimeout(function () {
			return update(innerContainer, button, height);
		}, 1);
	});

	window.addEventListener('resize', function () {
		return update(innerContainer, button, height);
	});
}

if (elements) {
	[].forEach.call(elements, setup);
}