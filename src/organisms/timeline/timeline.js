import '../../assets/js/parallax';

const progressBar = document.querySelector('.js-progress-bar');
const decadeContainer = document.querySelector('.js-decade-container');
const firstDecade = document.querySelector('h2.godzilla');
const decades = document.querySelectorAll('h2.godzilla');
let triggerPoint = 0;

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
function setTriggerPoint() {
	triggerPoint = window.innerHeight * 0.5;
}

// Get top of element relative to window
function offsetTop(el) {
	const rect = el.getBoundingClientRect();
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return rect.top + scrollTop;
}

// Get left of element relative to window
function offsetLeft(el) {
	const rect = el.getBoundingClientRect();
	const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
	return rect.left + scrollLeft;
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

	/* If on last decade, prevent progressbar from continue growing
		and always keep it 100% of window width */
	if (currentSection >= (decades.length - 1)) {
		progressBar.style.width = '100vw';
	} else {
		// Calculate speed of the progressBar width while scrolling based on section height
		const startPoint = decadeLinks[currentSection];
		const startPointX = offsetLeft(startPoint);
		const startPointWidth = startPoint.offsetWidth;
		const startSection = decades[currentSection];
		const endSection = decades[currentSection + 1];
		const startSectionY = offsetTop(startSection);
		const endSectionY = offsetTop(endSection);
		const sectionLength = endSectionY - startSectionY;
		const scrollY = currentPosition - startSectionY;
		const sectionProgress = scrollY / sectionLength;
		progressBarWidth = startPointX + (startPointWidth * sectionProgress);

		// Use result to animate progressbar
		progressBar.style.width = `${progressBarWidth}px`;
	}
}

// Run functions on page load
if (progressBar) {
	setTriggerPoint();
	animateProgressBar();

	// Re-run functions on window events
	window.addEventListener('resize', () => {
		setTriggerPoint();
		animateProgressBar();
	});
	window.addEventListener('scroll', () => {
		animateProgressBar();
	});
}
