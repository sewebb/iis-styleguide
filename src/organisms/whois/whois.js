const LORDICON_SCRIPT_SRC = 'https://cdn.lordicon.com/lordicon-1.1.0.js';
const whoisComponents = document.querySelectorAll('.js-whois');
const DOMAIN_SEARCH_VALUE = 'first';
const KEYWORD_SEARCH_VALUE = 'second';
const ORGANISATION_SEARCH_VALUE = 'third';
const VALIDATION_DELAY = 1500;
const DEFAULT_I18N = {
	selectSearchTypePlaceholder: 'Välj först vad du vill söka efter...',
	emptySearchError: 'Du måste ange en sökning.',
	domainSearchError: 'Sökningen måste sluta med .se eller .nu.',
	domainSearchCharactersError: 'Domännamn får bara innehålla bokstäver, siffror, bindestreck och punkt.',
	keywordSearchCharactersError: 'Nyckelordet får bara innehålla bokstäver och siffror.',
	keywordSearchLengthError: 'Sökordet måste innehålla minst 3 tecken.',
	organisationSearchError: 'Organisationsnumret måste anges i formatet XXXXXX-XXXX.',
};

function getWhoisI18n() {
	return window.internetstiftelsen?.i18n?.whois || {};
}

function getTranslation(key) {
	const translation = getWhoisI18n()[key];

	return typeof translation === 'string' && translation.length
		? translation
		: DEFAULT_I18N[key];
}

function ensureLordIconScript() {
	if (!document.querySelector('lord-icon')) {
		return;
	}

	if (window.customElements?.get('lord-icon')) {
		return;
	}

	if (document.querySelector(`script[src="${LORDICON_SCRIPT_SRC}"]`)) {
		return;
	}

	const script = document.createElement('script');

	script.src = LORDICON_SCRIPT_SRC;
	script.async = true;
	script.setAttribute('data-lordicon-script', 'true');
	document.head.appendChild(script);
}

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
			showValidationError(component, getTranslation('emptySearchError'));
			return false;
		}

		clearValidationError(component);
		return true;
	}

	if (isDomainSearchSelected(selectedOption)) {
		if (!hasValidDomainCharacters(value)) {
			if (report) {
				showValidationError(component, getTranslation('domainSearchCharactersError'));
			} else {
				clearValidationError(component);
				scheduleValidationError(component, getTranslation('domainSearchCharactersError'));
			}

			return false;
		}

		if (isValidDomainSearch(value)) {
			clearValidationError(component);
			return true;
		}

		if (report) {
			showValidationError(component, getTranslation('domainSearchError'));
		} else {
			clearValidationError(component);
			scheduleValidationError(component, getTranslation('domainSearchError'));
		}

		return false;
	}

	if (isKeywordSearchSelected(selectedOption)) {
		if (!hasValidKeywordCharacters(value)) {
			if (report) {
				showValidationError(component, getTranslation('keywordSearchCharactersError'));
			} else {
				clearValidationError(component);
				scheduleValidationError(component, getTranslation('keywordSearchCharactersError'));
			}

			return false;
		}

		if (value.length >= 3) {
			clearValidationError(component);
			return true;
		}

		if (report) {
			showValidationError(component, getTranslation('keywordSearchLengthError'));
		} else {
			clearValidationError(component);
			scheduleValidationError(component, getTranslation('keywordSearchLengthError'));
		}

		return false;
	}

	if (isOrganisationSearchSelected(selectedOption)) {
		if (isValidOrganisationSearch(value)) {
			clearValidationError(component);
			return true;
		}

		if (report) {
			showValidationError(component, getTranslation('organisationSearchError'));
		} else {
			clearValidationError(component);
			scheduleValidationError(component, getTranslation('organisationSearchError'));
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
		input.setAttribute('placeholder', getTranslation('selectSearchTypePlaceholder'));
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

ensureLordIconScript();

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
