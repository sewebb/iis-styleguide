import './parallax';

const progressBar = document.querySelector('.js-progress-bar');
const decadeContainer = document.querySelector('.js-decade-container');
const firstDecade = document.querySelector('h2.godzilla');
console.log(firstDecade);
const decades = document.querySelectorAll('h2.godzilla');

// Create decade links in timeline
[].forEach.call(decades, (decade) => {
	const decadeLink = document.createElement('a');
	const { textContent } = decade;
	decadeLink.setAttribute('href', `#${textContent}`);
	decadeLink.innerText = textContent;
	decadeContainer.appendChild(decadeLink);
});

/* Set trigger point (vertical position in viewport)
for when a new decade should start being "active" */
let triggerPoint = 0;
function setTriggerPoint() {
	triggerPoint = window.innerHeight * 0.3;
}
setTriggerPoint();
window.addEventListener('resize', () => {
	setTriggerPoint();
});

function offsetTop(el) {
	const rect = el.getBoundingClientRect();
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return rect.top + scrollTop;
}

function offsetLeft(el) {
	const rect = el.getBoundingClientRect();
	const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
	return rect.left + scrollLeft;
}

function animateProgressBar() {
	if (progressBar) {
		let section = false;
		let sectionIndex = 0;
		const currentPosition = document.documentElement.scrollTop + triggerPoint;

		const decadeLinks = document.querySelectorAll('.js-decade-container a');
		console.log('decadeLinks', decadeLinks);
		console.log('currentPosition', currentPosition);
		let progressBarWidth = 0;
		console.log('progressBarWidth', progressBarWidth);

		console.log('firstDecade.offsetTop', offsetTop(firstDecade));

		if (currentPosition < offsetTop(firstDecade)) {
			section = 0;
		} else {
			[].forEach.call(decades, (decade) => {
				console.log('decade', decade);
				const sectionTop = offsetTop(decade);
				console.log('sectionTop', sectionTop);
				if (currentPosition >= sectionTop) {
					section = sectionIndex;
					console.log('section', section);
				}
				sectionIndex += 1;
			});
		}

		// Convert Element objects to Arrays
		const sectionsArray = Array.from(decades);
		const decadeLinksArray = Array.from(decadeLinks);
		console.log('decadeLinksArray', decadeLinksArray, sectionsArray);

		// If on last decade
		if (section >= (decades.length - 1)) {
			progressBar.style.width = '100vw';
			console.log('LAST DECADE!', progressBarWidth);
		} else {
			// Calculate speed of progressBar width while scrolling based on section height
			console.log('section', section);
			const startPoint = decadeLinks[section];
			console.log('startPoint', startPoint);
			const startPointX = offsetLeft(startPoint);
			console.log('startPointX', startPointX);
			const startPointWidth = startPoint.offsetWidth;
			console.log('startPointWidth', startPointWidth);
			const startSection = decades[section];
			console.log('startSection', startSection);
			const endSection = decades[section + 1];
			console.log('endSection', endSection);
			const startSectionY = offsetTop(startSection);
			console.log('startSectionY', startSectionY);
			const endSectionY = offsetTop(endSection);
			console.log('endSectionY', endSectionY);
			const sectionLength = endSectionY - startSectionY;
			console.log('sectionLength', sectionLength);
			const scrollY = currentPosition - startSectionY;
			console.log('scrollY', scrollY);
			const sectionProgress = scrollY / sectionLength;
			console.log('sectionProgress', sectionProgress);
			progressBarWidth = startPointX + (startPointWidth * sectionProgress);

			console.log('progressBarWidth', progressBarWidth);
			progressBar.style.width = `${progressBarWidth}px`;
		}
	}
}

animateProgressBar();
window.addEventListener('resize', () => {
	animateProgressBar();
});
window.addEventListener('scroll', () => {
	animateProgressBar();
});

//
// // Check if bottom of element is visisble
// function bottomScrolledIntoView(el) {
// 	const rect = el.getBoundingClientRect();
// 	// const elemTop = rect.top;
// 	const elemBottom = rect.bottom;
//
// 	console.log('elemBottom', elemBottom);
//
// 	// Bottom of element visible return true:
// 	const isVisible = elemBottom < window.innerHeight;
// 	console.log('isVisible', isVisible);
// 	return isVisible;
// }
//
// const contentElements = document.querySelectorAll('.js-timeline-decade');
// const progressBars = document.querySelector('.js-progress-bars');
//
// function scrollSpy(element) {
// 	const progressContainer = document.createElement('div');
// 	progressContainer.classList.add('o-timeline__progress-container');
//
// 	const progressBar = document.createElement('div');
// 	const decadeContainer = document.createElement('a');
//
// 	progressBar.classList.add('o-timeline__progress-bar');
// 	decadeContainer.classList.add('o-timeline__decade-container');
//
// 	progressBars.appendChild(progressContainer);
// 	progressContainer.appendChild(progressBar);
// 	progressContainer.appendChild(decadeContainer);
//
// 	const decade = element.querySelector('h2.godzilla').textContent;
// 	console.log(decade);
// 	console.log(element);
// 	decadeContainer.innerText = decade;
// 	decadeContainer.setAttribute('href', `#${decade}`);
// 	console.log('progressContainer', progressContainer);
//
// 	const contentHeight = element.offsetHeight;
// 	// const height = document.documentElement
// 	// .scrollHeight - document.documentElement.clientHeight;
//
// 	window.addEventListener('scroll', () => {
// 		const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
// 		const scrolled = (winScroll / contentHeight) * 100;
// 		console.log('scrolled', scrolled);
//
// 		const observer = new IntersectionObserver(function obs(entries) {
// 			console.log('entries', entries);
//
// 			if (bottomScrolledIntoView(element)) {
// 				console.log('Bottom of element is visible');
// 			}
//
// 			console.log('progressBar', progressBar);
//
// 			[].forEach.call(entries, () => {
// 				if (entries[0].intersectionRatio > 0) {
// 					if (progressBar.style.width !== '100%') {
// 						progressBar.style.width = `${scrolled}%`;
// 					} else {
// 						progressBar.style.width = '100%';
// 					}
// 				}
// 			});
//
// 			if (entries[0].isIntersecting === true) {
// 				if (entries[0].intersectionRatio === 1) {
// 					console.log(element, 'Target is fully visible in screen');
// 					// progressBar.style.width = `${scrolled}%`;
// 				} else if (entries[0].intersectionRatio > 0.5) {
// 					console.log(element, 'More than 50% of target is visible in screen');
// 					// progressBar.style.width = `${scrolled}%`;
// 				} else if (entries[0].intersectionRatio > 0) {
// 					console.log(element, 'Top of element is visible on screen');
// 					// progressBar.style.width = `${scrolled}%`;
// 				} else {
// 					console.log(element, 'Less than 50% of target is visible in screen');
// 					// progressBar.style.width = `${scrolled}%`;
// 				}
// 			} else {
// 				console.log(this, 'Target is not visible in screen');
// 			}
// 		}, { threshold: [0, 0.5, 1] });
//
// 		observer.observe(document.querySelector('.js-timeline'));
// 	});
// }
//
// if (contentElements) {
// 	[].forEach.call(contentElements, scrollSpy);
// }
