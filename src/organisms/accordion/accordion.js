// const oAccordion = window.van11yAccessibleAccordionAria({
// 	ACCORDION_PREFIX_IDS: 'o-accordion',
// 	ACCORDION_JS: 'js-o-accordion',
// 	ACCORDION_STYLE: 'o-accordion',
// 	ACCORDION_TITLE_STYLE: 'o-accordion__title',
// 	ACCORDION_HEADER_STYLE: 'o-accordion__header',
// 	ACCORDION_PANEL_STYLE: 'o-accordion__panel',
// });
// oAccordion.attach();


const accordionElement = document.querySelector('.js-o-accordion');
let namespace = getComputedStyle(accordionElement, ':before').content;
console.log(namespace);
namespace = namespace.replace(/["']/g, '');
const oAccordion = window.van11yAccessibleAccordionAria({
	ACCORDION_PREFIX_IDS: 'o-accordion',
	ACCORDION_JS: 'js-o-accordion',
	ACCORDION_STYLE: `${namespace}o-accordion`,
	ACCORDION_TITLE_STYLE: `${namespace}o-accordion__title`,
	ACCORDION_HEADER_STYLE: `${namespace}o-accordion__header`,
	ACCORDION_PANEL_STYLE: `${namespace}o-accordion__panel`,
});
oAccordion.attach();
