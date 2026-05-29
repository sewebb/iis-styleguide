const LORDICON_SCRIPT_SRC = 'https://cdn.lordicon.com/lordicon-1.1.0.js';
const whoisComponents = document.querySelectorAll('.js-whois');
const DOMAIN_SEARCH_VALUE = 'first';
const KEYWORD_SEARCH_VALUE = 'second';
const ORGANISATION_SEARCH_VALUE = 'third';
const VALIDATION_DELAY = 1500;
const DESKTOP_DEFAULT_SELECTION = window.matchMedia('(min-width: 769px)');
const PERSONAL_IDENTITY_NUMBER_REGEX = /^(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[-+]?\d{4}$/;
const ORGANISATION_NUMBER_REGEX = /^\d{2}[2-9]\d{7}$/;
const DEFAULT_I18N = {
	selectSearchTypePlaceholder: 'Välj först vad du vill söka efter...',
	emptySearchError: 'Du måste ange en sökning.',
	domainSearchError: 'Sökningen måste sluta med .se eller .nu.',
	domainSearchCharactersError: 'Domännamn får bara innehålla bokstäver, siffror, bindestreck och punkt.',
	keywordSearchCharactersError: 'Nyckelordet får bara innehålla bokstäver och siffror.',
	keywordSearchLengthError: 'Sökordet måste innehålla minst 3 tecken.',
	organisationSearchError: 'Organisationsnumret måste anges i formatet XXXXXX-XXXX.',
	organisationPersonalNumberError: 'Du kan inte söka med ett personnummer här. Ange ett organisationsnummer i stället.',
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

function getSearchTypeOptions(component) {
	return Array.from(component.querySelectorAll('.js-radiobutton-advanced__input'));
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

function normalizeDigits(value) {
	return (value || '').trim().replace(/[^\d]/g, '');
}

function passesLuhn(value) {
	const digits = String(value || '');

	if (!/^\d+$/.test(digits)) {
		return false;
	}

	const sum = digits
		.split('')
		.reduce((total, digit, index) => {
			let current = Number(digit);

			if (index % 2 === 0) {
				current *= 2;
				current = current > 9 ? current - 9 : current;
			}

			return total + current;
		}, 0);

	return sum % 10 === 0;
}

function isValidDate(year, month, day) {
	const date = new Date(year, month - 1, day);

	return date.getFullYear() === year
		&& date.getMonth() === month - 1
		&& date.getDate() === day;
}

function inferFullYear(twoDigitYear, month, day, separator) {
	const now = new Date();
	const currentCentury = Math.floor(now.getFullYear() / 100) * 100;
	const currentYearShort = now.getFullYear() % 100;
	const currentMonth = now.getMonth() + 1;
	const currentDay = now.getDate();
	const inputDateValue = (twoDigitYear * 10000) + (month * 100) + day;
	const currentDateValue = (currentYearShort * 10000) + (currentMonth * 100) + currentDay;
	let year = currentCentury + twoDigitYear;

	if (separator === '+' || inputDateValue > currentDateValue) {
		year -= 100;
	}

	return year;
}

function getPersonalIdentityNumberParts(value) {
	const rawValue = (value || '').trim();
	const digits = normalizeDigits(rawValue);

	if (!PERSONAL_IDENTITY_NUMBER_REGEX.test(rawValue) || (digits.length !== 10 && digits.length !== 12)) {
		return null;
	}

	const separator = rawValue.includes('+') ? '+' : '-';
	const normalizedTenDigits = digits.slice(-10);
	const month = Number(normalizedTenDigits.slice(2, 4));
	const day = Number(normalizedTenDigits.slice(4, 6));
	const year = digits.length === 12
		? Number(digits.slice(0, 4))
		: inferFullYear(Number(normalizedTenDigits.slice(0, 2)), month, day, separator);

	return {
		year,
		month,
		day,
		normalizedTenDigits,
	};
}

function isPersonalIdentityNumber(value) {
	const parts = getPersonalIdentityNumberParts(value);

	if (!parts) {
		return false;
	}

	return isValidDate(parts.year, parts.month, parts.day)
		&& passesLuhn(parts.normalizedTenDigits);
}

function isValidOrganisationSearch(value) {
	const trimmedValue = (value || '').trim();
	const normalizedValue = normalizeDigits(value);

	return /^\d{2}[2-9]\d{3}-?\d{4}$/.test(trimmedValue)
		&& ORGANISATION_NUMBER_REGEX.test(normalizedValue)
		&& passesLuhn(normalizedValue);
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
		if (isPersonalIdentityNumber(value)) {
			if (report) {
				showValidationError(component, getTranslation('organisationPersonalNumberError'));
			} else {
				clearValidationError(component);
				scheduleValidationError(component, getTranslation('organisationPersonalNumberError'));
			}

			return false;
		}

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

function syncResponsiveSearchTypeSelection(component) {
	if (component.dataset.responsiveDefaultSearchType !== 'true' || component.dataset.userSelectedSearchType === 'true') {
		return;
	}

	const options = getSearchTypeOptions(component);
	const firstOption = options.find((option) => option.value === DOMAIN_SEARCH_VALUE) || options[0];
	const selectedOption = getSelectedOption(component);
	const input = component.querySelector('.js-whois-input');

	if (!firstOption) {
		return;
	}

	if (DESKTOP_DEFAULT_SELECTION.matches) {
		if (!selectedOption) {
			firstOption.checked = true;
			component.dataset.autoSelectedSearchType = 'true';
			component.dataset.syncingResponsiveDefault = 'true';
			firstOption.dispatchEvent(new Event('change', { bubbles: true }));
			delete component.dataset.syncingResponsiveDefault;
		}

		return;
	}

	if (component.dataset.autoSelectedSearchType !== 'true') {
		return;
	}

	options.forEach((option) => {
		option.checked = false;
	});

	if (input?.value) {
		input.value = '';
	}

	delete component.dataset.autoSelectedSearchType;
	component.dataset.syncingResponsiveDefault = 'true';
	firstOption.dispatchEvent(new Event('change', { bubbles: true }));
	delete component.dataset.syncingResponsiveDefault;
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

		if (component.dataset.responsiveDefaultSearchType === 'true' && component.dataset.syncingResponsiveDefault !== 'true') {
			if (component.dataset.autoSelectedSearchType === 'true' && event.target.value === DOMAIN_SEARCH_VALUE && DESKTOP_DEFAULT_SELECTION.matches) {
				component.dataset.autoSelectedSearchType = 'true';
			} else {
				component.dataset.userSelectedSearchType = 'true';
				delete component.dataset.autoSelectedSearchType;
			}
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

	syncResponsiveSearchTypeSelection(component);
	updateSearchState(component);
});

function syncResponsiveWhoisDefaults() {
	whoisComponents.forEach((component) => {
		syncResponsiveSearchTypeSelection(component);
		updateSearchState(component);
	});
}

if (DESKTOP_DEFAULT_SELECTION.addEventListener) {
	DESKTOP_DEFAULT_SELECTION.addEventListener('change', syncResponsiveWhoisDefaults);
} else {
	DESKTOP_DEFAULT_SELECTION.addListener(syncResponsiveWhoisDefaults);
}
