import throttle from 'lodash.throttle';

const breakpoints = {
	xs: 0,
	sm: 576,
	md: 769,
	lg: 961,
	xl: 1200,
	xxl: 1400,
};

let matchedBreakpoints = [];

function repositionElement(element) {
	const positions = element.getAttribute('data-responsive').split(',');
	let position = null;

	positions.forEach((item) => {
		const [bp, id] = item.split(':');

		if (matchedBreakpoints.includes(bp)) {
			position = id;
		}
	});

	if (position === null) {
		return;
	}

	const newParent = document.getElementById(position);

	if (!newParent) {
		return;
	}

	newParent.appendChild(element);
}

function dispatch() {
	const elements = document.querySelectorAll('[data-responsive]');

	if (!elements.length) {
		return;
	}

	const width = window.innerWidth;

	matchedBreakpoints = Object.entries(breakpoints)
		.filter(([, min]) => width >= min)
		.map(([bp]) => bp);

	if (matchedBreakpoints.length) {
		[].forEach.call(elements, repositionElement);
	}
}

const onResize = throttle(dispatch, 100);

window.addEventListener('resize', onResize);
dispatch();
