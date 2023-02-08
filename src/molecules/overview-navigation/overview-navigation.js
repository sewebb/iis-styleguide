const overviewNavigations = document.querySelectorAll('.js-overview-navigation');
const overviewNavigationButton = document.querySelector('.js-overview-navigation-button');

function overViewNav(overviewNavigation) {
	overviewNavigationButton.classList.remove('is-fixed');
	overviewNavigation.classList.remove('is-minimized');
	overviewNavigationButton.setAttribute('aria-expanded', 'true');

	// Timeout until a11y-toggle is initiated
	setTimeout(() => {
		overviewNavigation.setAttribute('aria-hidden', 'false');
	}, '50');

	const viewportOffset = overviewNavigation.getBoundingClientRect();
	const topBtnPos = overviewNavigationButton.offsetTop;
	const leftPos = viewportOffset.left;
	const topNavPos = viewportOffset.top;

	window.addEventListener('scroll', () => {
		if (window.innerWidth > 960) {
			if (overviewNavigation.getBoundingClientRect().top < 0) { // Element is at top of screen
				overviewNavigation.setAttribute('aria-hidden', 'true');
				overviewNavigation.classList.add('is-minimized');

				overviewNavigationButton.style.left = `${leftPos}px`;
				overviewNavigationButton.style.top = `${topBtnPos}px`;
				overviewNavigationButton.style.display = 'flex';
				overviewNavigationButton.style.position = 'fixed';

				// Timeout to let styles above apply first
				setTimeout(() => {
					overviewNavigationButton.classList.add('is-fixed');
				}, '10');
			} else if (window.scrollY === 0) { // User has scrolled back to top
				overviewNavigationButton.classList.remove('is-fixed');
				overviewNavigationButton.style.left = `${leftPos}px`;
				overviewNavigationButton.style.top = `${topNavPos}px`;

				// Timeout same length as CSS-transition
				setTimeout(() => {
					overviewNavigationButton.style.display = 'none';
					overviewNavigation.setAttribute('aria-hidden', 'false');
					overviewNavigation.classList.remove('is-minimized');
				}, '250');
			}
		}
	});

	window.addEventListener('resize', () => {
		if (window.innerWidth < 960) {
			overviewNavigationButton.classList.add('is-fixed');
			overviewNavigation.classList.add('is-minimized');
			overviewNavigationButton.setAttribute('aria-expanded', 'false');
			overviewNavigation.setAttribute('aria-hidden', 'true');
		} else {
			overviewNavigationButton.classList.remove('is-fixed');
			overviewNavigation.classList.remove('is-minimized');
			overviewNavigationButton.setAttribute('aria-expanded', 'true');
			overviewNavigation.setAttribute('aria-hidden', 'false');
		}
	});
}

if (overviewNavigations) {
	if (window.innerWidth > 960) {
		[].forEach.call(overviewNavigations, overViewNav);
	}
}
