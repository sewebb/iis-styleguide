const timelineNavigation = document.querySelector('#timeline-navigation');
const timelineNavigationLinks = timelineNavigation.querySelectorAll('a');
const timeLineButton = document.querySelector('.js-timeline-navigation');
const timeLineOverlay = document.querySelector('.js-timeline-overlay');
const body = document.querySelector('body');
const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
let clicked = false;

if (timeLineButton) {
	timeLineButton.addEventListener('click', () => {
		body.classList.toggle('html-no-overflow');
		if (clicked === false) {
			timeLineButton.style.transform = `translateX(-${scrollbarWidth}px)`;
			timeLineOverlay.style.transform = `translateX(-${scrollbarWidth}px)`;
			body.style.paddingRight = `${scrollbarWidth}px`;
			clicked = true;
		} else {
			timeLineButton.removeAttribute('style');
			timeLineOverlay.removeAttribute('style');
			body.removeAttribute('style');
			clicked = false;
		}
	});
}

if (timelineNavigation) {
	[].forEach.call(timelineNavigationLinks, (timelineNavigationLink) => {
		timelineNavigationLink.addEventListener('click', () => {
			timeLineButton.click();
		});
	});
}
