const whoisComponents = document.querySelectorAll('.js-whois');
const DOMAIN_SEARCH_VALUE = 'first';
const KEYWORD_SEARCH_VALUE = 'second';
const ORGANISATION_SEARCH_VALUE = 'third';
const EMPTY_SEARCH_ERROR = 'Du måste ange en sökning.';
const DOMAIN_SEARCH_ERROR = 'Sökningen måste sluta med .se eller .nu.';
const DOMAIN_SEARCH_CHARACTERS_ERROR = 'Domännamn får bara innehålla bokstäver, siffror, bindestreck och punkt.';
const KEYWORD_SEARCH_CHARACTERS_ERROR = 'Nyckelordet får bara innehålla bokstäver och siffror.';
const KEYWORD_SEARCH_LENGTH_ERROR = 'Sökordet måste innehålla minst 3 tecken.';
const ORGANISATION_SEARCH_ERROR = 'Organisationsnumret måste anges i formatet XXXXXX-XXXX.';
const VALIDATION_DELAY = 1500;

function getSelectedOption(component) {
	return component.querySelector('.js-radiobutton-advanced__input:checked');
}

function getErrorElement(component) {
	return component.querySelector('.js-whois-error');
}

function getFieldGroup(component) {
	return component.querySelector('.js-whois-field-group');
}

function isDomainSearchSelected(selectedOption) {
	return selectedOption?.value === DOMAIN_SEARCH_VALUE;
}

function isKeywordSearchSelected(selectedOption) {
	return selectedOption?.value === KEYWORD_SEARCH_VALUE;
}

function isOrganisationSearchSelected(selectedOption) {
	return selectedOption?.value === ORGANISATION_SEARCH_VALUE;
}

function isValidDomainSearch(value) {
	return /\.(se|nu)$/i.test((value || '').trim());
}

function hasValidDomainCharacters(value) {
	return /^[\p{L}\p{N}.-]+$/u.test((value || '').trim());
}

function hasValidKeywordCharacters(value) {
	return /^[\p{L}\p{N}]+$/u.test((value || '').trim());
}

function isValidOrganisationSearch(value) {
	return /^\d{6}-\d{4}$/.test((value || '').trim());
}

function hasVisibleError(component) {
	const error = getErrorElement(component);

	return Boolean(error && !error.classList.contains('is-hidden') && error.textContent.trim().length);
}

function updateSubmitState(component) {
	const submit = component.querySelector('.js-whois-submit');
	const selectedOption = getSelectedOption(component);

	if (!submit) {
		return;
	}

	submit.disabled = !selectedOption || hasVisibleError(component);
}

function clearValidationTimer(component) {
	if (!component.dataset.validationTimerId) {
		return;
	}

	window.clearTimeout(Number(component.dataset.validationTimerId));
	delete component.dataset.validationTimerId;
}

function scheduleValidationError(component, message) {
	clearValidationTimer(component);

	component.dataset.validationTimerId = window.setTimeout(() => {
		showValidationError(component, message);
		delete component.dataset.validationTimerId;
	}, VALIDATION_DELAY);
}

function clearValidationError(component) {
	const input = component.querySelector('.js-whois-input');
	const error = getErrorElement(component);
	const fieldGroup = getFieldGroup(component);

	clearValidationTimer(component);

	if (input) {
		input.removeAttribute('aria-invalid');
		input.removeAttribute('aria-describedby');
	}

	fieldGroup?.classList.remove('is-invalid');

	if (!error) {
		updateSubmitState(component);
		return;
	}

	error.textContent = '';
	error.classList.add('is-hidden');
	updateSubmitState(component);
}

function showValidationError(component, message) {
	const input = component.querySelector('.js-whois-input');
	const error = getErrorElement(component);
	const fieldGroup = getFieldGroup(component);

	if (input) {
		input.setAttribute('aria-invalid', 'true');
	}

	fieldGroup?.classList.add('is-invalid');

	if (!error) {
		return;
	}

	if (!error.id) {
		error.id = `${input?.id || 'whois-search'}-error`;
	}

	if (input) {
		input.setAttribute('aria-describedby', error.id);
	}

	error.textContent = message;
	error.classList.remove('is-hidden');
	updateSubmitState(component);
}

function validateSearch(component, { report = false } = {}) {
	const input = component.querySelector('.js-whois-input');
	const selectedOption = getSelectedOption(component);

	if (!input || !selectedOption) {
		clearValidationError(component);
		return true;
	}

	const value = input.value.trim();

	if (!value.length) {
		if (report) {
			showValidationError(component, EMPTY_SEARCH_ERROR);
			return false;
		}

		clearValidationError(component);
		return true;
	}

	if (isDomainSearchSelected(selectedOption)) {
		if (!hasValidDomainCharacters(value)) {
			if (report) {
				showValidationError(component, DOMAIN_SEARCH_CHARACTERS_ERROR);
			} else {
				clearValidationError(component);
				scheduleValidationError(component, DOMAIN_SEARCH_CHARACTERS_ERROR);
			}

			return false;
		}

		if (isValidDomainSearch(value)) {
			clearValidationError(component);
			return true;
		}

		if (report) {
			showValidationError(component, DOMAIN_SEARCH_ERROR);
		} else {
			clearValidationError(component);
			scheduleValidationError(component, DOMAIN_SEARCH_ERROR);
		}

		return false;
	}

	if (isKeywordSearchSelected(selectedOption)) {
		if (!hasValidKeywordCharacters(value)) {
			if (report) {
				showValidationError(component, KEYWORD_SEARCH_CHARACTERS_ERROR);
			} else {
				clearValidationError(component);
				scheduleValidationError(component, KEYWORD_SEARCH_CHARACTERS_ERROR);
			}

			return false;
		}

		if (value.length >= 3) {
			clearValidationError(component);
			return true;
		}

		if (report) {
			showValidationError(component, KEYWORD_SEARCH_LENGTH_ERROR);
		} else {
			clearValidationError(component);
			scheduleValidationError(component, KEYWORD_SEARCH_LENGTH_ERROR);
		}

		return false;
	}

	if (isOrganisationSearchSelected(selectedOption)) {
		if (isValidOrganisationSearch(value)) {
			clearValidationError(component);
			return true;
		}

		if (report) {
			showValidationError(component, ORGANISATION_SEARCH_ERROR);
		} else {
			clearValidationError(component);
			scheduleValidationError(component, ORGANISATION_SEARCH_ERROR);
		}

		return false;
	}

	clearValidationError(component);
	return true;
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
		clearValidationError(component);

		return;
	}

	input.setAttribute('placeholder', selectedOption.dataset.placeholder || '');
	input.disabled = false;
	clearValidationError(component);
	updateSubmitState(component);
}

whoisComponents.forEach((component) => {
	component.addEventListener('change', (event) => {
		if (!event.target.matches('.js-radiobutton-advanced__input')) {
			return;
		}

		const input = component.querySelector('.js-whois-input');

		if (input?.value) {
			input.value = '';
		}

		updateSearchState(component);
	});

	component.addEventListener('input', (event) => {
		if (!event.target.matches('.js-whois-input')) {
			return;
		}

		validateSearch(component);
		updateSubmitState(component);
	});

	component.addEventListener('click', (event) => {
		if (!event.target.closest('.js-whois-submit')) {
			return;
		}

		if (!validateSearch(component, { report: true })) {
			event.preventDefault();
			component.querySelector('.js-whois-input')?.focus();
		}
	});

	updateSearchState(component);
});
