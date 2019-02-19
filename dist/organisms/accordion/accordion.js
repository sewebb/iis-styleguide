'use strict';

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

var debounce = function debounce(func, delay) {
	var inDebounce = void 0;

	return function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var context = undefined;
		clearTimeout(inDebounce);
		inDebounce = setTimeout(function () {
			return func.apply(context, args);
		}, delay);
	};
};

var checkElements = debounce(function () {
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