function update(element, value) {
	const effect = element.getAttribute('data-if-effect') || 'toggle';
	const [, match] = element.getAttribute('data-if').split(':');
	const conditionMet = (!match && !!value) || (match === value);

	if (effect === 'disable') {
		element.disabled = !conditionMet;
	} else if (effect === 'toggle') {
		element.style.display = conditionMet ? null : 'none';
	} else if (effect === 'text') {
		if (!element.hasAttribute('data-if-default')) {
			element.setAttribute('data-if-default', element.innerText);
		}

		const values = element.getAttribute('data-if-values').split('|');
		const text = values
			.map((item) => item.split(':'))
			.find(([m]) => m === value);

		element.innerText = (text) ? text[1] : element.getAttribute('data-if-default');
	}

	// If element is option and it was selected, we need to reset the value
	if (element.tagName.toLowerCase() === 'option' && element.selected && !conditionMet) {
		element.closest('select').value = '';
	}
}

function delegate({ target }) {
	const { name } = target;

	if (!name) {
		return;
	}

	const elements = document.querySelectorAll(`[data-if^="${name}"]`);

	if (!elements.length) {
		return;
	}

	[].forEach.call(elements, (element) => update(element, target.value));
}

function init() {
	const elements = document.querySelectorAll('[data-if]');

	[].forEach.call(elements, (element) => {
		const [name] = element.getAttribute('data-if').split(':');
		const form = element.closest('form');

		if (!form) {
			throw new Error('Conditionals must be inside a form to avoid conflicts');
		}

		const related = form.querySelector(`[name="${name}"]`);

		if (related) {
			update(element, related.value);
		}
	});
}

init();
document.body.addEventListener('change', delegate);
