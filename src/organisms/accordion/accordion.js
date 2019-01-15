require('van11y-accessible-accordion-aria');

const className = 'o-accordion';
const accordionElement = document.querySelector(`.js-${className}`);

if (accordionElement) {
	const namespace = getComputedStyle(accordionElement, ':before').content.replace(/["']/g, '');

	const oAccordion = window.van11yAccessibleAccordionAria({
		ACCORDION_PREFIX_IDS: className,
		ACCORDION_JS: `js-${className}`,
		ACCORDION_STYLE: `${namespace}${className}`,
		ACCORDION_TITLE_STYLE: `${namespace}${className}__title`,
		ACCORDION_HEADER_STYLE: `${namespace}${className}__header`,
		ACCORDION_PANEL_STYLE: `${namespace}${className}__panel`,
	});

	oAccordion.attach();
}
