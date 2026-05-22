const radiobuttonAdvancedGroups = document.querySelectorAll('.js-radiobutton-advanced');
const optionsSelector = '.js-radiobutton-advanced__options';
const optionSelector = '.js-radiobutton-advanced__option';
const inputSelector = '.js-radiobutton-advanced__input';
const statusSelector = '.js-radiobutton-advanced__status';
const collapsedLayout = window.matchMedia('(max-width: 768px)');
const keyboardInteractionGroups = new WeakSet();
const keyboardExpandKeys = ['Enter', ' ', 'Spacebar'];
const keyboardSelectionKeys = ['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'End', 'Home', ' ', 'Spacebar'];

function getOptions(group) {
	return Array.from(group.querySelectorAll(optionSelector));
}

function getInput(option) {
	return option.querySelector(inputSelector);
}

function getVisibleOption(options) {
	return options.find((option) => {
		const input = getInput(option);

		return input && input.checked;
	}) || options[0];
}

function getOptionLabel(option) {
	const label = option.querySelector('.m-radiobutton-advanced__label');

	return label ? label.textContent.trim() : '';
}

function setCheckedState(group) {
	const options = getOptions(group);
	let hasCheckedOption = false;

	options.forEach((option) => {
		const input = getInput(option);

		if (!input) {
			return;
		}

		option.classList.toggle('is-checked', input.checked);
		hasCheckedOption = hasCheckedOption || input.checked;
	});

	group.classList.toggle('has-selection', hasCheckedOption);
}

function setVisibleState(group) {
	const options = getOptions(group);
	const visibleOption = getVisibleOption(options);

	options.forEach((option) => {
		option.classList.toggle('is-visible', option === visibleOption);
	});
}

function setOptionAccessibility(group) {
	getOptions(group).forEach((option) => {
		option.removeAttribute('aria-hidden');
	});
}

function setAccessibilityState(group) {
	const options = group.querySelector(optionsSelector);
	const status = group.querySelector(statusSelector);
	const isExpanded = !collapsedLayout.matches || group.classList.contains('is-expanded');

	if (options) {
		options.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
	}

	if (!status) {
		return;
	}

	if (!collapsedLayout.matches) {
		status.textContent = '';

		return;
	}

	if (isExpanded) {
		status.textContent = 'Alla alternativ visas.';

		return;
	}

	const visibleOption = getVisibleOption(getOptions(group));
	const label = visibleOption ? getOptionLabel(visibleOption) : '';

	status.textContent = label ? `Valt alternativ: ${label}. Aktivera alternativet för att visa fler alternativ.` : 'Aktivera alternativet för att visa fler alternativ.';
}

function setCollapsedHeight(group) {
	const options = group.querySelector(optionsSelector);

	if (!options) {
		return;
	}

	group.style.setProperty('--radiobutton-advanced-collapsed-height', `${options.offsetHeight}px`);
}

function collapseGroup(group) {
	group.classList.add('is-collapsed');
	group.classList.remove('is-expanded');
	setVisibleState(group);
	setOptionAccessibility(group);
	setAccessibilityState(group);
	setCollapsedHeight(group);
}

function expandGroup(group) {
	group.classList.add('is-expanded');
	setOptionAccessibility(group);
	setAccessibilityState(group);
}

function syncGroup(group) {
	setCheckedState(group);
	collapseGroup(group);
}

function syncExpandedGroup(group) {
	setCheckedState(group);
	setVisibleState(group);
	setOptionAccessibility(group);
	setAccessibilityState(group);
}

radiobuttonAdvancedGroups.forEach((group) => {
	group.addEventListener('pointerdown', () => {
		keyboardInteractionGroups.delete(group);
	});

	group.addEventListener('click', (event) => {
		if (!collapsedLayout.matches) {
			return;
		}

		if (keyboardInteractionGroups.has(group)) {
			return;
		}

		const option = event.target.closest(optionSelector);

		if (!option || !group.contains(option)) {
			return;
		}

		const input = getInput(option);

		if (!input || input.disabled) {
			return;
		}

		if (group.classList.contains('is-expanded')) {
			if (option.classList.contains('is-checked')) {
				collapseGroup(group);
			}

			return;
		}

		if (option.classList.contains('is-visible')) {
			event.preventDefault();
			expandGroup(group);
		}
	});

	group.addEventListener('keydown', (event) => {
		if (!collapsedLayout.matches) {
			return;
		}

		const option = event.target.closest(optionSelector);

		if (option && group.contains(option) && keyboardSelectionKeys.includes(event.key)) {
			keyboardInteractionGroups.add(group);
		}

		if (event.key === 'Escape' && group.classList.contains('is-expanded')) {
			event.preventDefault();
			keyboardInteractionGroups.delete(group);
			collapseGroup(group);

			const visibleOption = getVisibleOption(getOptions(group));
			const input = visibleOption ? getInput(visibleOption) : null;

			if (input) {
				input.focus();
			}

			return;
		}

		if (event.key === 'Enter' && group.classList.contains('is-expanded')) {
			event.preventDefault();
			keyboardInteractionGroups.delete(group);
			collapseGroup(group);

			const visibleOption = getVisibleOption(getOptions(group));
			const input = visibleOption ? getInput(visibleOption) : null;

			if (input) {
				input.focus();
			}

			return;
		}

		if (!keyboardExpandKeys.includes(event.key) || !option || !group.contains(option) || group.classList.contains('is-expanded') || !option.classList.contains('is-visible')) {
			return;
		}

		event.preventDefault();
		keyboardInteractionGroups.add(group);
		expandGroup(group);
	});

	group.addEventListener('change', (event) => {
		if (!event.target.matches(inputSelector)) {
			return;
		}

		if (collapsedLayout.matches && group.classList.contains('is-expanded') && keyboardInteractionGroups.has(group)) {
			syncExpandedGroup(group);

			return;
		}

		keyboardInteractionGroups.delete(group);
		syncGroup(group);
	});

	syncGroup(group);
});

function syncResponsiveAccessibility() {
	radiobuttonAdvancedGroups.forEach((group) => {
		setOptionAccessibility(group);
		setAccessibilityState(group);
		setCollapsedHeight(group);
	});
}

if (collapsedLayout.addEventListener) {
	collapsedLayout.addEventListener('change', syncResponsiveAccessibility);
} else {
	collapsedLayout.addListener(syncResponsiveAccessibility);
}
