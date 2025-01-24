import { createFocusTrap } from 'focus-trap';
/**
 * Collect the needed elements.
 */
const html = document.querySelector('html');
const megaMenuButton = document.querySelector('.js-toggle-mega-menu');
const megaMenu = document.getElementById('megaMenu');
const content = document.getElementById('siteMain');
const header = document.getElementById('siteHeader');
const footer = document.getElementById('siteFooter');
const alert = document.querySelector('.js-dismiss-alert');
const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
let focusTrap = null;

if (megaMenu) {
	focusTrap = createFocusTrap(megaMenu);
}

/**
 * Check if the element is in the viewport
 *
 * @param {Element} element
 * @returns {boolean}
 */
function isInViewport(element) {
	const rect = element.getBoundingClientRect();

	// Very simple since we only use it for the footer atm
	return (
		rect.top <= window.innerHeight
	);
}

/**
 * Before the animations start we need to change how certain elements
 * are placed. The visual result should be exactly the same as before these changes.
 */
function prepareAnimation() {
	const scrollTop = window.scrollY || document.body.scrollTop;
	const contentRect = content.getBoundingClientRect();
	const inViewport = isInViewport(footer);

	header.style.flex = '1 0 auto';

	if (!isIE11) {
		const initialFooterTop = footer.getBoundingClientRect().top;
		megaMenu.style.cssText = 'display: block; flex: 1';

		content.style.cssText = `
	        position: absolute;
	        top: ${scrollTop + contentRect.top}px;
	        left: 0;
	        right: 0;
	        bottom: 0;
	        overflow: hidden;
	    `;

		if (!inViewport) {
			footer.style.transform = 'translateY(100%)';
		} else {
			requestAnimationFrame(() => {
				const newFooterTop = footer.getBoundingClientRect().top;

				if (newFooterTop > initialFooterTop) {
					footer.style.transform = `translateY(-${newFooterTop - initialFooterTop}px)`;
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
	const headerRect = megaMenu.getBoundingClientRect();
	const initialFooterTop = footer.getBoundingClientRect().top;

	/* Take into account it the site has an alert message at the top */
	let alertHeight;

	if (alert) {
		alertHeight = alert.offsetHeight;
	} else {
		alertHeight = 0;
	}

	megaMenu.style.cssText = `
        position: absolute;
        top: ${headerRect.top - alertHeight}px;
        left: 0;
        right: 0;
        display: block;
	`;

	content.removeAttribute('style');
	header.removeAttribute('style');

	if (!isIE11) {
		requestAnimationFrame(() => {
			const newFooterTop = footer.getBoundingClientRect().top;

			footer.style.transition = 'none';

			if (initialFooterTop > newFooterTop) {
				footer.style.transform = `translateY(${initialFooterTop - newFooterTop}px)`;
			} else if (newFooterTop > initialFooterTop) {
				footer.style.transform = `translateY(-${newFooterTop - initialFooterTop}px)`;
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

		setTimeout(() => {
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

		setTimeout(() => {
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

	setTimeout(() => {
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
	const button = e.target.closest('.js-toggle-domain-search-page');

	if (button && megaMenu.getAttribute('aria-hidden') === 'false') {
		hideMegaMenu();
	}
}

if (megaMenuButton && megaMenu) {
	megaMenuButton.addEventListener('click', toggleMegaMenu);
	document.addEventListener('mouseup', handleMouseUp);
}

/**
 * Toggle the mega menu submenus
 */
function collapse(toggle) {
	var id = toggle.getAttribute('data-a11y-toggle');
	var collapsibleBox = document.getElementById(id);
	collapsibleBox.setAttribute('aria-hidden', true);
	toggle.setAttribute('aria-expanded', false);
}

function collapseAll(event) {
	if(toggles) {
		toggles
			.filter(function (toggle) {
				return toggle !== event.target;
			})
			.forEach(collapse);
	}
}
const toggles = Array.prototype.slice.call(
	document.querySelectorAll('.js-menu-toggles [data-a11y-toggle]')
);

if(toggles) {
	toggles.forEach(function(toggle) {
		toggle.addEventListener('click', collapseAll);
	});
}

/**
 * Handle mega menu and ReadSpeaker when clicking ReadSpeaker button in mega menu
 */
const closeMegaMenuBtn = document.querySelector('.js-close-mega-menu');

if(closeMegaMenuBtn) {
	document.addEventListener('DOMContentLoaded', () => {
		closeMegaMenuBtn.addEventListener('click', function() {
			document.querySelector('.js-toggle-mega-menu').click();
			document.getElementById('readspeakerMenuItem').classList.remove('u-hide-md');
			document.getElementById('readspeakerBtn').click();
			document.querySelector('#readspeakerBtn [class*=a-main-menu__list__text]').classList.add('u-hide-md');
			document.querySelector('#readspeakerBtn [class*=a-button--icon]').classList.add('u-hide-md');
		});
	});
}
