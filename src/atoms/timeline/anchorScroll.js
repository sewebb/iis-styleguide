import SmoothScroll from 'smooth-scroll';

const anchorScroll = new SmoothScroll('a[href*="#"]', {
	easing: 'easeOutCubic',
});

module.exports = anchorScroll;
