const slidingForm = document.querySelector('[class*="--sliding"]');
const staticForm = document.querySelector('[class*="--static"]');
const timeout = slidingForm.getAttribute('data-timeout');
let countDown;
const throttle = 66; // Trigger event every 66ms

function isInViewport(element) {
	let top = element.offsetTop;
	const height = element.offsetHeight;

	while (element.offsetParent) {
		element = element.offsetParent; // eslint-disable-line
		top += element.offsetTop;
	}

	return (
		top < (window.pageYOffset + window.innerHeight)
		&& (top + height) > window.pageYOffset
	);
}

console.log('timeout', timeout);

function slideForm() {
	const inViewport = isInViewport(staticForm);

	if (!inViewport) {
		console.log('inViewport', inViewport);
		console.log(timeout);

		// The static form is not in the viewport, start timeout to show the sliding form
		countDown = setTimeout(() => {
			slidingForm.classList.add('is-visible');
			slidingForm.tabIndex = 1;
		}, timeout);
		console.log('countDown', countDown);
	} else {
		console.log('inViewport', inViewport);
		// Any part the static form in the viewport, clear timeout
		clearTimeout(countDown);
		console.log('countDown', countDown);
	}
}

const debounce = (func, delay) => {
	let inDebounce;

	return (...args) => {
		const context = this;
		clearTimeout(inDebounce);
		inDebounce = setTimeout(() => func.apply(context, args), delay);
	};
};

const elementIsInViewport = debounce(() => {
	if (slidingForm) {
		slideForm();
	}
}, throttle);

window.addEventListener('scroll', () => {
	console.log('scroll');
	elementIsInViewport();
});
