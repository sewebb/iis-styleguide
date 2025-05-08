import debounce from '../../assets/js/debounce';
import 'van11y-accessible-accordion-aria';

const className = 'o-accordion';
const accordionElement = document.querySelector(`.js-${className}`);
let oAccordion = null;

function attachAccordion() {
	if (!oAccordion) {
		const namespace = getComputedStyle(accordionElement, ':before').content.replace(/["']/g, '');

		oAccordion = window.van11yAccessibleAccordionAria({
			ACCORDION_PREFIX_IDS: className,
			ACCORDION_JS: `js-${className}`,
			ACCORDION_STYLE: `${namespace}${className}`,
			ACCORDION_TITLE_STYLE: `${namespace}${className}__title`,
			ACCORDION_HEADER_STYLE: `${namespace}${className}__header`,
			ACCORDION_PANEL_STYLE: `${namespace}${className}__panel`,
		});
	}

	oAccordion.attach();
}

if (accordionElement) {
	attachAccordion();
}

const checkElements = debounce(() => {
	const accordionElementFresh = document.querySelector(`.js-${className}`);

	if (accordionElementFresh) {
		attachAccordion();
	}
}, 50);

const observeHandler = (mutationsList) => {
	mutationsList.forEach((mutation) => {
		if (mutation.type !== 'childList') {
			return;
		}

		checkElements();
	});
};

const observer = new MutationObserver(observeHandler);

observer.observe(document.body, { childList: true, subtree: true });
