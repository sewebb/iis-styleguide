'use strict';

var _focusTrap = require('focus-trap');

var _focusTrap2 = _interopRequireDefault(_focusTrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Collect the needed elements.
 */
var html = document.querySelector('html');
var megaMenuButton = document.querySelector('.js-toggle-mega-menu');
var megaMenu = document.getElementById('megaMenu');
var content = document.getElementById('siteMain');
var header = document.getElementById('siteHeader');
var footer = document.getElementById('siteFooter');
var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
var focusTrap = null;

if (megaMenu) {
	focusTrap = (0, _focusTrap2.default)(megaMenu);
}

/**
 * Check if the element is in the viewport
 *
 * @param {Element} element
 * @returns {boolean}
 */
function isInViewport(element) {
	var rect = element.getBoundingClientRect();

	// Very simple since we only use it for the footer atm
	return rect.top <= window.innerHeight;
}

/**
 * Before the animations start we need to change how certain elements
 * are placed. The visual result should be exactly the same as before these changes.
 */
function prepareAnimation() {
	var scrollTop = window.scrollY || document.body.scrollTop;
	var contentRect = content.getBoundingClientRect();
	var inViewport = isInViewport(footer);

	header.style.flex = '1 0 auto';

	if (!isIE11) {
		var initialFooterTop = footer.getBoundingClientRect().top;
		megaMenu.style.cssText = 'display: block; flex: 1';

		content.style.cssText = '\n\t        position: absolute;\n\t        top: ' + (scrollTop + contentRect.top) + 'px;\n\t        left: 0;\n\t        right: 0;\n\t        bottom: 0;\n\t        overflow: hidden;\n\t    ';

		if (!inViewport) {
			footer.style.transform = 'translateY(100%)';
		} else {
			requestAnimationFrame(function () {
				var newFooterTop = footer.getBoundingClientRect().top;

				if (newFooterTop > initialFooterTop) {
					footer.style.transform = 'translateY(-' + (newFooterTop - initialFooterTop) + 'px)';
				}
			});
		}
	}
}

/**
 * Removes all changes to all elements that took part in the animations.
 */
function removeAnimationPreparations() {
	content.removeAttribute('style');
	footer.removeAttribute('style');
	header.removeAttribute('style');
	megaMenu.removeAttribute('style');
}

/**
 * Animate the mega menu and footer into the view
 */
function animateIn() {
	megaMenuButton.setAttribute('aria-expanded', 'true');
	megaMenu.setAttribute('aria-hidden', 'false');
	if (!isIE11) {
		footer.style.cssText = 'transform: translateY(0); transition: transform 0.25s ease-in-out;';
		footer.classList.add('is-animated');
	}
}

/**
 * Preparations before the hide animation starts.
 * The visual result should be exactly the same as before these changes.
 */
function prepareOutAnimation() {
	var headerRect = megaMenu.getBoundingClientRect();
	var initialFooterTop = footer.getBoundingClientRect().top;

	megaMenu.style.cssText = '\n        position: absolute;\n        top: ' + headerRect.top + 'px;\n        left: 0;\n        right: 0;\n        display: block;\n\t';

	content.removeAttribute('style');
	header.removeAttribute('style');

	if (!isIE11) {
		requestAnimationFrame(function () {
			var newFooterTop = footer.getBoundingClientRect().top;

			footer.style.transition = 'none';

			if (initialFooterTop > newFooterTop) {
				footer.style.transform = 'translateY(' + (initialFooterTop - newFooterTop) + 'px)';
			} else if (newFooterTop > initialFooterTop) {
				footer.style.transform = 'translateY(-' + (newFooterTop - initialFooterTop) + 'px)';
			}
		});
	}
}

/**
 * Start the animation that hides the mega menu and footer.
 */
function animateOut() {
	megaMenuButton.setAttribute('aria-expanded', 'false');
	megaMenu.setAttribute('aria-hidden', 'true');

	if (!isIE11) {
		footer.addEventListener('transitionend', removeAnimationPreparations, { once: true });
		footer.style.transition = '0.25s ease-in-out';
		footer.classList.remove('is-animated');

		setTimeout(function () {
			if (!isInViewport(footer)) {
				footer.style.transform = 'translateY(100%)';
			} else {
				footer.style.transform = 'translateY(0)';
			}
		}, 4);
	}
}

/**
 * Hide the mega menu (and footer)
 */
function hideMegaMenu() {
	if (megaMenu) {
		if (megaMenu.getAttribute('aria-hidden') === 'true') {
			return;
		}

		prepareOutAnimation();

		setTimeout(function () {
			requestAnimationFrame(animateOut);
			if (html.classList.contains('tab-highlight')) {
				focusTrap.deactivate();
			}
		}, 50);
	}
}

/**
 * Show the mega menu (and footer)
 */
function showMegaMenu() {
	if (megaMenu.getAttribute('aria-hidden') === 'false') {
		return;
	}

	prepareAnimation();

	setTimeout(function () {
		requestAnimationFrame(animateIn);
		if (html.classList.contains('tab-highlight')) {
			focusTrap.activate();
		}
	}, 50);
}

/**
 * Toggle the mega menu
 * @param {MouseEvent} e
 */
function toggleMegaMenu(e) {
	e.preventDefault();

	if (megaMenu.getAttribute('aria-hidden') === 'false') {
		hideMegaMenu();
	} else {
		showMegaMenu();
	}
}

function handleMouseUp(e) {
	var button = e.target.closest('.js-toggle-domain-search');

	if (button && megaMenu.getAttribute('aria-hidden') === 'false') {
		hideMegaMenu();
	}
}

if (megaMenuButton && megaMenu) {
	megaMenuButton.addEventListener('click', toggleMegaMenu);
	document.addEventListener('mouseup', handleMouseUp);
}