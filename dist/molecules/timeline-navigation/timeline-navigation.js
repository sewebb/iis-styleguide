'use strict';

var timelineNavigation = document.querySelector('#timeline-navigation');
var timelineNavigationLinks = timelineNavigation.querySelectorAll('a');
var timeLineButton = document.querySelector('.js-timeline-navigation');
var timeLineOverlay = document.querySelector('.js-timeline-overlay');
var body = document.querySelector('body');
var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
var clicked = false;

if (timeLineButton) {
	timeLineButton.addEventListener('click', function () {
		body.classList.toggle('html-no-overflow');
		if (clicked === false) {
			timeLineButton.style.transform = 'translateX(-' + scrollbarWidth + 'px)';
			timeLineOverlay.style.transform = 'translateX(-' + scrollbarWidth + 'px)';
			body.style.paddingRight = scrollbarWidth + 'px';
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
	[].forEach.call(timelineNavigationLinks, function (timelineNavigationLink) {
		timelineNavigationLink.addEventListener('click', function () {
			timeLineButton.click();
		});
	});
}