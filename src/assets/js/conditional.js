function effectDisable(element, disable, value) {
	element.disabled = disable;

	if (!disable && element.tagName.toLowerCase() === 'select') {
		const options = element.querySelectorAll(`option[data-if$=":${value}"]`);

		if (options.length === 1) {
			element.value = options[0].value;
		}
	}
}

function effectToggle(element, show) {
	element.style.display = show ? null : 'none';

	// If element is option and it was selected, we need to reset the value
	if (element.tagName.toLowerCase() === 'option' && element.selected && !show) {
		element.closest('select').value = '';
	}
}

function effectText(element, value) {
	if (!element.hasAttribute('data-if-default')) {
		element.setAttribute('data-if-default', element.innerText);
	}

	const values = element.getAttribute('data-if-values').split('|');
	const text = values
		.map((item) => item.split(':'))
		.find(([m]) => m === value);

	element.innerText = (text) ? text[1] : element.getAttribute('data-if-default');
}

function update(element, value) {
	const effect = element.getAttribute('data-if-effect') || 'toggle';
	const [, match] = element.getAttribute('data-if').split(':');
	const conditionMet = (!match && !!value) || (match === value);

	if (effect === 'disable') {
		effectDisable(element, !conditionMet, value);
	} else if (effect === 'toggle') {
		effectToggle(element, conditionMet);
	} else if (effect === 'text') {
		effectText(element, value);
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

	let { value } = target;

	if (['checkbox', 'radio'].includes(target.getAttribute('type'))) {
		value = (target.checked) ? target.value : null;
	}

	[].forEach.call(elements, (element) => update(element, value));
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
			let { value } = related;

			if (['checkbox', 'radio'].includes(related.getAttribute('type'))) {
				value = (related.checked) ? related.value : null;
			}

			update(element, value);
		}
	});
}

init();
document.body.addEventListener('change', delegate);
