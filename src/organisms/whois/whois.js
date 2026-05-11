const whoisComponents = document.querySelectorAll('.js-whois');

function getSelectedOption(component) {
	return component.querySelector('.js-radiobutton-advanced__input:checked');
}

function updateSearchState(component) {
	const input = component.querySelector('.js-whois-input');
	const submit = component.querySelector('.js-whois-submit');
	const selectedOption = getSelectedOption(component);

	if (!input || !submit) {
		return;
	}

	if (!selectedOption) {
		input.setAttribute('placeholder', '');
		input.disabled = true;
		submit.disabled = true;

		return;
	}

	input.setAttribute('placeholder', selectedOption.dataset.placeholder || '');
	input.disabled = false;
	submit.disabled = false;
}

whoisComponents.forEach((component) => {
	component.addEventListener('change', (event) => {
		if (!event.target.matches('.js-radiobutton-advanced__input')) {
			return;
		}

		updateSearchState(component);
	});

	updateSearchState(component);
});
