'use strict';

var _debounce = require('../../assets/js/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('van11y-accessible-accordion-aria');

var className = 'o-accordion';
var accordionElement = document.querySelector('.js-' + className);
var oAccordion = null;

function attachAccordion() {
	if (!oAccordion) {
		var namespace = getComputedStyle(accordionElement, ':before').content.replace(/["']/g, '');

		oAccordion = window.van11yAccessibleAccordionAria({
			ACCORDION_PREFIX_IDS: className,
			ACCORDION_JS: 'js-' + className,
			ACCORDION_STYLE: '' + namespace + className,
			ACCORDION_TITLE_STYLE: '' + namespace + className + '__title',
			ACCORDION_HEADER_STYLE: '' + namespace + className + '__header',
			ACCORDION_PANEL_STYLE: '' + namespace + className + '__panel'
		});
	}

	oAccordion.attach();
}

if (accordionElement) {
	attachAccordion();
}

var checkElements = (0, _debounce2.default)(function () {
	var accordionElementFresh = document.querySelector('.js-' + className);

	if (accordionElementFresh) {
		attachAccordion();
	}
}, 50);

var observeHandler = function observeHandler(mutationsList) {
	mutationsList.forEach(function (mutation) {
		if (mutation.type !== 'childList') {
			return;
		}

		checkElements();
	});
};

var observer = new MutationObserver(observeHandler);

observer.observe(document.body, { childList: true, subtree: true });