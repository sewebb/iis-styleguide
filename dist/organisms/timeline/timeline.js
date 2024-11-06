'use strict';

require('../../assets/js/parallax');

var _require = require('../../assets/js/offset'),
    offsetTop = _require.offsetTop,
    offsetBottom = _require.offsetBottom,
    offsetLeft = _require.offsetLeft;

var dataLayer = window._mtm || [];
var progressBar = document.querySelector('.js-progress-bar');
var decadeContainer = document.querySelector('.js-decade-container');
var decadeSections = document.querySelectorAll('.js-timeline-decade');
var firstDecade = document.querySelector('h2.godzilla');
var decades = document.querySelectorAll('h2.godzilla');
var triggerPoint = 0;

// Create decade links in timeline
function buildTimelineNavigation() {
	[].forEach.call(decades, function (decade) {
		var decadeLink = document.createElement('a');
		var textContent = decade.textContent;

		decadeLink.setAttribute('href', '#' + textContent);
		decadeLink.innerText = textContent;
		decadeContainer.appendChild(decadeLink);
	});
}

/* Set trigger point (vertical position in viewport)
for when a new decade should start being "active" */
function setTriggerPoint() {
	triggerPoint = window.innerHeight * 0.5;
}

// Animate progress bar when user is scolling within the timeline
function animateProgressBar() {
	var currentSection = 0;
	var sectionIndex = 0;
	var currentPosition = document.documentElement.scrollTop + triggerPoint;
	var decadeLinks = document.querySelectorAll('.js-decade-container a');
	var progressBarWidth = 0;

	// Check if we are above the first section
	if (currentPosition < offsetTop(firstDecade)) {
		currentSection = 0;
		progressBarWidth = 0;
		progressBar.style.width = '0';

		[].forEach.call(decadeLinks, function (decadeLink) {
			decadeLink.classList.remove('is-reading');
		});
	} else {
		// Otherwise add 1 to sectionIndex while scrolling;
		[].forEach.call(decades, function (decade) {
			var sectionTop = offsetTop(decade);

			if (currentPosition >= sectionTop) {
				currentSection = sectionIndex;

				[].forEach.call(decadeLinks, function (decadeLink) {
					decadeLink.classList.remove('is-reading');
				});

				decadeLinks[sectionIndex].classList.add('is-reading');
			}

			sectionIndex += 1;
		});
	}

	// Calculate speed of the progressBar width while scrolling based on section height
	var startPoint = decadeLinks[currentSection];
	var startPointX = offsetLeft(startPoint);
	var startPointWidth = startPoint.offsetWidth;
	var startSection = decadeSections[currentSection];
	var startSectionY = offsetTop(startSection);
	var endSectionY = offsetBottom(startSection);
	var sectionLength = endSectionY - startSectionY;
	var scrollY = currentPosition - startSectionY;
	var sectionProgress = scrollY / sectionLength;
	progressBarWidth = startPointX + startPointWidth * sectionProgress;

	// Use result to animate progressbar
	progressBar.style.width = progressBarWidth + 'px';
}

function isInViewport(element) {
	var top = element.offsetTop;
	var height = element.offsetHeight;

	while (element.offsetParent) {
		// eslint-disable-next-line no-param-reassign
		element = element.offsetParent;
		top += element.offsetTop;
	}

	return top < window.scrollY + window.innerHeight && top + height / 4 > window.scrollY;
}

function decadeIsVisible() {
	[].forEach.call(decadeSections, function (decadeSection) {
		// Don't trigger Decade Visible too fast to prevent dataLayer.push
		// to trigger while user is scrolled past a decade.
		var timeOut = 1000;
		var viewTimeout = setTimeout(function () {
			if (isInViewport(decadeSection) && !decadeSection.classList.contains('is-in-view')) {
				decadeSection.classList.add('is-in-view');
				var decadeId = decadeSection.id;

				dataLayer.push({
					event: 'timeline',
					eventInfo: {
						category: 'timeline',
						action: 'active_year',
						label: decadeId
					}
				});
			} else if (!isInViewport(decadeSection)) {
				decadeSection.classList.remove('is-in-view');
				clearTimeout(viewTimeout);
			}
		}, timeOut);
	});
}

// Run functions on page load
if (progressBar) {
	buildTimelineNavigation();
	setTriggerPoint();
	animateProgressBar();

	// Re-run functions on window events
	window.addEventListener('resize', function () {
		setTriggerPoint();
		animateProgressBar();
	});
	window.addEventListener('scroll', function () {
		animateProgressBar();
		decadeIsVisible();
	});
}