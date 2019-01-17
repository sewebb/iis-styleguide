const megaMenuButton = document.querySelector('.js-toggle-mega-menu');
const megaMenu = document.getElementById('megaMenu');
const content = document.getElementById('siteMain');
const header = document.getElementById('siteHeader');
const footer = document.getElementById('siteFooter');

function prepareAnimation() {
	const scrollTop = window.scrollY || document.body.scrollTop;
	const contentRect = content.getBoundingClientRect();

	header.style.flex = '1 0 auto';
    megaMenu.style.display = 'block';

	content.style.cssText = `
		position: absolute;
		top: ${scrollTop + contentRect.top}px;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
	`;

	footer.style.transform = 'translateY(100%)';
}

function removeAnimationPreparations() {
	content.removeAttribute('style');
    footer.removeAttribute('style');
    header.removeAttribute('style');
    megaMenu.removeAttribute('style');
}

function animateIn() {
	megaMenuButton.setAttribute('aria-expanded', 'true');
    megaMenu.setAttribute('aria-hidden', 'false');
    footer.style.cssText = 'transform: translateY(0); transition: transform 0.25s ease-in-out;';
}

function animateOut() {
    megaMenu.addEventListener('transitionend', removeAnimationPreparations, { once: true });

    megaMenuButton.setAttribute('aria-expanded', 'false');
    megaMenu.setAttribute('aria-hidden', 'true');
    footer.style.transform = 'translateY(100%)';
}

function hideMegaMenu() {
    animateOut();
}

function showMegaMenu() {
    prepareAnimation();

    requestAnimationFrame(animateIn);
}

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
