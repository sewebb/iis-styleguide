const selects = document.querySelectorAll('.js-natural-language-select');
const inputs = document.querySelectorAll('.js-natural-language-input');

function setWidth(select) {
	const tempTextElement = select.nextElementSibling;
	tempTextElement.innerText = select.options[select.selectedIndex].text;

	// Show temp select to get it's width
	tempTextElement.classList.remove('is-hidden');

	const className = select.className.split('-');
	const extraWidth = (className.indexOf('arrow') !== -1) ? 43 : 3;
	const selectWidth = tempTextElement.offsetWidth + extraWidth;

	// Hide temp select again
	tempTextElement.classList.add('is-hidden');

	// Set width to select
	select.style.width = `${selectWidth}px`;
}

function setColor(select) {
	const { color } = select.options[select.selectedIndex].dataset;
	select.dataset.color = color;
}

if (selects) {
	[].forEach.call(selects, (select) => {
		select.addEventListener('change', () => {
			setColor(select);
			setWidth(select);
		});

		window.addEventListener('resize', () => {
			setWidth(select);
		});

		// Next tick
		setTimeout(() => {
			setColor(select);
			setWidth(select);
		}, 0);
	});
}

function setInputWidth(input) {
	const tempTextElement = input.nextElementSibling;

	tempTextElement.innerHTML = input.value;

	// Show temp select to get it's width
	tempTextElement.classList.remove('is-hidden');
	const selectWidth = tempTextElement.offsetWidth + 7;
	// Hide temp select again
	tempTextElement.classList.add('is-hidden');
	input.style.width = `${selectWidth}px`;
}

if (inputs) {
	[].forEach.call(inputs, (input) => {
		setTimeout(() => {
			setInputWidth(input);
		}, 0);

		input.addEventListener('keyup', () => {
			setInputWidth(input);
		});

		window.addEventListener('resize', () => {
			setInputWidth(input);
		});
	});
}
