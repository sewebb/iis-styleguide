import '../../assets/js/parallax';

const { offsetTop, offsetBottom, offsetLeft } = require('../../assets/js/offset');

const dataLayer = window.dataLayer || [];
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
	// const height = element.offsetHeight;

	while (element.offsetParent) {
		element = element.offsetParent; // eslint-disable-line
		top += element.offsetTop;
	}

	return (
		top < (window.scrollY + window.innerHeight)
		&& top > window.scrollY
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

// DUMMY TIMELINE ITEM OPEN/CLOSE
// function wrap(el, wrapper) {
// 	el.parentNode.insertBefore(wrapper, el);
// 	wrapper.classList.add('wrapper');
// 	wrapper.appendChild(el);
// }
//
// const timeLineItems = document.querySelectorAll('.js-timeline-item');
// let timeLineItemScrollPosition = 0;
//
// [].forEach.call(timeLineItems, (timeLineItem) => {
// 	const timeLineItemLink = timeLineItem.querySelector('a');
// 	const timeLineItemClose = timeLineItem.querySelector('.js-timeline-item-close');
// 	const timeLineItemBottomClose = timeLineItem.querySelector('.js-timeline-item-bottom-close');
//
// 	timeLineItemLink.addEventListener('click', () => {
// 		timeLineItemScrollPosition = window.pageYOffset;
// 		sessionStorage.setItem('scroll-position', timeLineItemScrollPosition);
//
// 		if (!timeLineItem.classList.contains('is-open')) {
// 			timeLineItem.classList.add('is-open');
// 			timeLineItem.closest('.row').classList.add('row-has-open-child');
//
// 			// Wrap open timeline item
// 			wrap(timeLineItem.querySelector('.wp-block-iis-timeline-post'),
//			document.createElement('div'));
// 		}
// 	});
//
// 	timeLineItemClose.addEventListener('click', () => {
// 		timeLineItem.classList.remove('is-open');
// 		timeLineItem.closest('.row').classList.remove('row-has-open-child');
//
// 		// Destroy generated wrapper
// 		const wrapper = timeLineItemClose.nextElementSibling;
// 		wrapper.replaceWith(...wrapper.childNodes);
//
// 		const top = sessionStorage.getItem('scroll-position');
// 		if (top !== null) {
// 			window.scrollTo(0, parseInt(top, 10));
// 		}
// 		sessionStorage.removeItem('scroll-position');
//
// 		// Trigger scroll event to reveal timeline items not yet parallaxed into view
// 		window.dispatchEvent(new CustomEvent('scroll'));
// 	});
//
// 	timeLineItemBottomClose.addEventListener('click', () => {
// 		timeLineItemClose.click();
// 	});
// });
