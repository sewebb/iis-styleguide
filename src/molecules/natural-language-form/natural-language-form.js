const selects = document.querySelectorAll('.js-natural-language-select');
const inputs = document.querySelectorAll('.js-natural-language-input');

if (selects) {
	[].forEach.call(selects, (select) => {
		const tempTextElement = select.nextElementSibling;

		function setWidth() {
			const optionText = select.options[select.selectedIndex].text;
			tempTextElement.innerText = optionText;

			// Show temp select to get it's width
			tempTextElement.classList.remove('is-hidden');

			let selectWidth = '';

			const className = select.className.split('-');

			if (className.indexOf('arrow') !== -1) {
				selectWidth = tempTextElement.offsetWidth + 43;
			} else {
				selectWidth = tempTextElement.offsetWidth + 3;
			}

			// Hide temp select again
			tempTextElement.classList.add('is-hidden');

			// Set width to select
			select.style.width = `${selectWidth}px`;
		}
		setWidth();

		select.addEventListener('change', () => {
			const { color } = select.options[select.selectedIndex].dataset;
			select.dataset.color = color;

			setWidth();
		});

		window.addEventListener('resize', () => {
			setWidth();
		});
	});
}

if (inputs) {
	[].forEach.call(inputs, (input) => {
		const tempTextElement = input.nextElementSibling;

		function setWidth() {
			tempTextElement.innerHTML = input.value;

			// Show temp select to get it's width
			tempTextElement.classList.remove('is-hidden');
			const selectWidth = tempTextElement.offsetWidth + 7;
			// Hide temp select again
			tempTextElement.classList.add('is-hidden');
			input.style.width = `${selectWidth}px`;
		}

		setWidth();

		input.addEventListener('keyup', () => {
			setWidth();
		});

		window.addEventListener('resize', () => {
			setWidth();
		});
	});
}
