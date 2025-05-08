import '../../assets/js/parallax';
import offset from '../../assets/js/offset';

const { offsetTop, offsetBottom, offsetLeft } = offset;
const dataLayer = window._mtm || [];
const progressBar = document.querySelector('.js-progress-bar');
const decadeContainer = document.querySelector('.js-decade-container');
const decadeSections = document.querySelectorAll('.js-timeline-decade');
const firstDecade = document.querySelector('h2.godzilla');
const decades = document.querySelectorAll('h2.godzilla');
let triggerPoint = 0;

// Create decade links in timeline
function buildTimelineNavigation() {
	[].forEach.call(decades, (decade) => {
		const decadeLink = document.createElement('a');
		const { textContent } = decade;
		decadeLink.setAttribute('href', `#${textContent}`);
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
	let currentSection = 0;
	let sectionIndex = 0;
	const currentPosition = document.documentElement.scrollTop + triggerPoint;
	const decadeLinks = document.querySelectorAll('.js-decade-container a');
	let progressBarWidth = 0;

	// Check if we are above the first section
	if (currentPosition < offsetTop(firstDecade)) {
		currentSection = 0;
		progressBarWidth = 0;
		progressBar.style.width = '0';

		[].forEach.call(decadeLinks, (decadeLink) => {
			decadeLink.classList.remove('is-reading');
		});
	} else {
		// Otherwise add 1 to sectionIndex while scrolling;
		[].forEach.call(decades, (decade) => {
			const sectionTop = offsetTop(decade);

			if (currentPosition >= sectionTop) {
				currentSection = sectionIndex;

				[].forEach.call(decadeLinks, (decadeLink) => {
					decadeLink.classList.remove('is-reading');
				});

				decadeLinks[sectionIndex].classList.add('is-reading');
			}

			sectionIndex += 1;
		});
	}

	// Calculate speed of the progressBar width while scrolling based on section height
	const startPoint = decadeLinks[currentSection];
	const startPointX = offsetLeft(startPoint);
	const startPointWidth = startPoint.offsetWidth;
	const startSection = decadeSections[currentSection];
	const startSectionY = offsetTop(startSection);
	const endSectionY = offsetBottom(startSection);
	const sectionLength = endSectionY - startSectionY;
	const scrollY = currentPosition - startSectionY;
	const sectionProgress = scrollY / sectionLength;
	progressBarWidth = startPointX + (startPointWidth * sectionProgress);

	// Use result to animate progressbar
	progressBar.style.width = `${progressBarWidth}px`;
}

function isInViewport(element) {
	let top = element.offsetTop;
	const height = element.offsetHeight;

	while (element.offsetParent) {
		// eslint-disable-next-line no-param-reassign
		element = element.offsetParent;
		top += element.offsetTop;
	}

	return (
		top < (window.scrollY + window.innerHeight)
		&& (top + height / 4) > window.scrollY
	);
}

function decadeIsVisible() {
	[].forEach.call(decadeSections, (decadeSection) => {
		// Don't trigger Decade Visible too fast to prevent dataLayer.push
		// to trigger while user is scrolled past a decade.
		const timeOut = 1000;
		const viewTimeout = setTimeout(() => {
			if (isInViewport(decadeSection) && !decadeSection.classList.contains('is-in-view')) {
				decadeSection.classList.add('is-in-view');
				const decadeId = decadeSection.id;

				dataLayer.push({
					event: 'timeline',
					eventInfo: {
						category: 'timeline',
						action: 'active_year',
						label: decadeId,
					},
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
	window.addEventListener('resize', () => {
		setTriggerPoint();
		animateProgressBar();
	});
	window.addEventListener('scroll', () => {
		animateProgressBar();
		decadeIsVisible();
	});
}
