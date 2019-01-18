/**
 * Collect the needed elements.
 */
const megaMenuButton = document.querySelector('.js-toggle-mega-menu');
const megaMenu = document.getElementById('megaMenu');
const content = document.getElementById('siteMain');
const header = document.getElementById('siteHeader');
const footer = document.getElementById('siteFooter');

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
	const initialFooterTop = footer.getBoundingClientRect().top;
	const inViewport = isInViewport(footer);

	header.style.flex = '1 0 auto';
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
	footer.style.cssText = 'transform: translateY(0); transition: transform 0.25s ease-in-out;';
}

/**
 * Preparations before the hide animation starts.
 * The visual result should be exactly the same as before these changes.
 */
function prepareOutAnimation() {
	const headerRect = megaMenu.getBoundingClientRect();
	const initialFooterTop = footer.getBoundingClientRect().top;

	megaMenu.style.cssText = `
        position: absolute;
        top: ${headerRect.top}px;
        left: 0;
        right: 0;
        display: block;
	`;

	content.removeAttribute('style');
	header.removeAttribute('style');

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

/**
 * Start the animation that hides the mega menu and footer.
 */
function animateOut() {
	footer.addEventListener('transitionend', removeAnimationPreparations, { once: true });

	megaMenuButton.setAttribute('aria-expanded', 'false');
	megaMenu.setAttribute('aria-hidden', 'true');

	footer.style.transition = '0.25s ease-in-out';

	setTimeout(() => {
		if (!isInViewport(footer)) {
			footer.style.transform = 'translateY(100%)';
		} else {
			footer.style.transform = 'translateY(0)';
		}
	}, 4);
}

/**
 * Hide the mega menu (and footer)
 */
function hideMegaMenu() {
	if (megaMenu.getAttribute('aria-hidden') === 'true') {
		return;
	}

	prepareOutAnimation();

	setTimeout(() => {
		requestAnimationFrame(animateOut);
	}, 50);
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

if (megaMenuButton && megaMenu) {
	megaMenuButton.addEventListener('click', toggleMegaMenu);
}

module.exports = {
	show: showMegaMenu,
	hide: hideMegaMenu,
};
