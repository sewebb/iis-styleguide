'use strict';

var overviewNavigations = document.querySelectorAll('.js-overview-navigation');
var overviewNavigationButton = document.querySelector('.js-overview-navigation-button');

function overViewNav(overviewNavigation) {
	overviewNavigationButton.classList.remove('is-fixed');
	overviewNavigation.classList.remove('is-minimized');
	overviewNavigationButton.setAttribute('aria-expanded', 'true');

	// Timeout until a11y-toggle is initiated
	setTimeout(function () {
		overviewNavigation.setAttribute('aria-hidden', 'false');
	}, '50');

	var viewportOffset = overviewNavigation.getBoundingClientRect();
	var topBtnPos = overviewNavigationButton.offsetTop;
	var leftPos = viewportOffset.left;
	var topNavPos = viewportOffset.top;

	window.addEventListener('scroll', function () {
		if (window.innerWidth > 960) {
			if (overviewNavigation.getBoundingClientRect().top < 0) {
				// Element is at top of screen
				overviewNavigation.setAttribute('aria-hidden', 'true');
				overviewNavigation.classList.add('is-minimized');

				overviewNavigationButton.style.left = leftPos + 'px';
				overviewNavigationButton.style.top = topBtnPos + 'px';
				overviewNavigationButton.style.display = 'flex';
				overviewNavigationButton.style.position = 'fixed';

				// Timeout to let styles above apply first
				setTimeout(function () {
					overviewNavigationButton.classList.add('is-fixed');
				}, '10');
			} else if (window.scrollY === 0) {
				// User has scrolled back to top
				overviewNavigationButton.classList.remove('is-fixed');
				overviewNavigationButton.style.left = leftPos + 'px';
				overviewNavigationButton.style.top = topNavPos + 'px';

				// Timeout same length as CSS-transition
				setTimeout(function () {
					overviewNavigationButton.style.display = 'none';
					overviewNavigation.setAttribute('aria-hidden', 'false');
					overviewNavigation.classList.remove('is-minimized');
				}, '250');
			}
		}
	});

	window.addEventListener('resize', function () {
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