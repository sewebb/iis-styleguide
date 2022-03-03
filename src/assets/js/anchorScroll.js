import SmoothScroll from 'smooth-scroll';

const anchorScroll = new SmoothScroll('a[href*="#"]', {
	speed: 600,
	easing: 'easeOutCubic',
});

module.exports = anchorScroll;
