const selectStore = {};

function effectChain(element, value) {
	const options = element.querySelectorAll('option[data-if-chain]');

	if (!(element.name in selectStore)) {
		// First time, cache options
		selectStore[element.name] = [];

		[].forEach.call(options, (el) => {
			selectStore[element.name].push(el.cloneNode(true));
		});
	}

	[].forEach.call(options, (el) => {
		if (element.value === el.value) {
			element.value = '';
		}

		element.removeChild(el);
	});

	if (!value) {
		return;
	}

	const cached = selectStore[element.name];

	if (!cached.length) {
		return;
	}

	const newOptions = cached.filter((el) => el.getAttribute('data-if-chain') === value);

	if (newOptions.length) {
		newOptions.forEach((el) => element.appendChild(el.cloneNode(true)));
	}

	if (newOptions.length === 1) {
		element.value = newOptions[0].value;
	}
}

function effectDisable(element, disable, value) {
	element.disabled = disable;

	if (!disable && element.tagName.toLowerCase() === 'select') {
		effectChain(element, value);
	}
}

function effectToggle(element, show) {
	element.style.display = show ? null : 'none';
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
	const values = element.getAttribute('data-if').split('|').map((match) => match.split(':')[1]).filter((v) => v);
	const matches = values.some((match) => match === value || (match.indexOf('!') === 0 && match.substring(1) !== value));
	const conditionMet = (!values.length && !!value) || matches;

	console.log(values, value, matches);

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
			console.warn('Conditionals must be inside a form to avoid conflicts');
			return;
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
