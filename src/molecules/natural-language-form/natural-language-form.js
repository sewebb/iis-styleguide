const elements = document.querySelectorAll('.js-natural-language-select');

if (elements) {
	[].forEach.call(elements, (element) => {
		const tempTextElement = element.nextElementSibling;

		function setWidth() {
			const optionText = element.options[element.selectedIndex].text;
			tempTextElement.innerText = optionText;

			// Show temp element to get it's width
			tempTextElement.classList.remove('is-hidden');
			const elementWidth = tempTextElement.offsetWidth + 3;
			// Hide temp element again
			tempTextElement.classList.add('is-hidden');
			element.style.width = `${elementWidth}px`;
		}
		setWidth();

		element.addEventListener('change', () => {
			const { color } = element.options[element.selectedIndex].dataset;
			element.dataset.color = color;

			setWidth();
		});

		window.addEventListener('resize', () => {
			setWidth();
		});
	});
}
