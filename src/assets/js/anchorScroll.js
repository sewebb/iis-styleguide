import SmoothScroll from 'smooth-scroll';

const anchorScroll = new SmoothScroll('a[href*="#"]', {
	speed: 1500,
	speedAsDuration: true,
	easing: 'easeOutCubic',
	ignore: '[data-scroll-ignore]',
});

export default anchorScroll;
