/**
 * Forked from https://github.com/edenspiekermann/a11y-toggle
 * This dependency has been vendorized and modernized to replace the outdated original package.
 */
let internalId = 0;
const togglesMap = {};
const targetsMap = {};

function getElements(selector, context = document) {
	return Array.from(context.querySelectorAll(selector));
}

function getClosestToggle(element) {
	if (!element) {
		return null;
	}

	if (element.closest) {
		return element.closest('[data-a11y-toggle]');
	}

	let currentElement = element;

	while (currentElement) {
		if (
			currentElement.nodeType === 1 &&
			currentElement.hasAttribute('data-a11y-toggle')
		) {
			return currentElement;
		}

		currentElement = currentElement.parentNode;
	}

	return null;
}

function registerToggle(toggle) {
	const selector = `#${toggle.getAttribute('data-a11y-toggle')}`;

	togglesMap[selector] = togglesMap[selector] || [];

	if (!togglesMap[selector].includes(toggle)) {
		togglesMap[selector].push(toggle);
	}
}

function handleToggle(toggle) {
	const target = toggle && targetsMap[toggle.getAttribute('aria-controls')];

	if (!target) {
		return;
	}

	const toggles = togglesMap[`#${target.id}`];
	const isExpanded = target.getAttribute('aria-hidden') === 'false';

	target.setAttribute('aria-hidden', isExpanded);

	toggles.forEach((relatedToggle) => {
		relatedToggle.setAttribute('aria-expanded', !isExpanded);
	});
}

function isActivationKey(event) {
	return (
		event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar'
	);
}

export function initA11yToggle(context = document) {
	getElements('[data-a11y-toggle]', context).forEach(registerToggle);

	const targets = Object.keys(togglesMap);

	if (targets.length === 0) {
		return;
	}

	getElements(targets.join(',')).forEach((target) => {
		const toggles = togglesMap[`#${target.id}`];
		const isExpanded = target.hasAttribute('data-a11y-toggle-open');
		const labelledby = [];

		toggles.forEach((toggle) => {
			if (!toggle.id) {
				toggle.setAttribute('id', `a11y-toggle-${internalId++}`);
			}

			toggle.setAttribute('aria-controls', target.id);
			toggle.setAttribute('aria-expanded', isExpanded);
			labelledby.push(toggle.id);
		});

		target.setAttribute('aria-hidden', !isExpanded);

		if (!target.hasAttribute('aria-labelledby')) {
			target.setAttribute('aria-labelledby', labelledby.join(' '));
		}

		targetsMap[target.id] = target;
	});
}

if (typeof document !== 'undefined') {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => initA11yToggle());
	} else {
		initA11yToggle();
	}

	document.addEventListener('click', (event) => {
		handleToggle(getClosestToggle(event.target));
	});

	document.addEventListener('keyup', (event) => {
		const toggle = getClosestToggle(event.target);

		if (
			toggle &&
			toggle.getAttribute('role') === 'button' &&
			isActivationKey(event)
		) {
			handleToggle(toggle);
		}
	});
}

if (typeof window !== 'undefined') {
	window.a11yToggle = initA11yToggle;
}

export default initA11yToggle;
