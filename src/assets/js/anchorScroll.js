import SmoothScroll from 'smooth-scroll';

const DEFAULT_OPTIONS = {
	speed: 1500,
	speedAsDuration: true,
	easing: 'easeOutCubic',
	ignore: '[data-scroll-ignore]',
};

const EASING_ALIASES = {
	easeout: 'easeOutQuad',
};

const anchorScroll = new SmoothScroll('a[href*="#"]', DEFAULT_OPTIONS);

const normalizeOptions = (options = {}) => {
	if (!options || typeof options !== 'object') return {};

	const normalized = { ...options };
	const easing = normalized.easing;

	if (typeof easing === 'string') {
		const alias = EASING_ALIASES[easing.toLowerCase()];
		if (alias) normalized.easing = alias;
	}

	return normalized;
};

const animateAnchorScroll = (target, toggle = null, options = {}) =>
	anchorScroll.animateScroll(target, toggle, {
		...DEFAULT_OPTIONS,
		...normalizeOptions(options),
	});

export { animateAnchorScroll };
export default anchorScroll;
