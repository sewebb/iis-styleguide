class ProgressRing extends HTMLElement {
	constructor() {
		super();
		const stroke = this.getAttribute('stroke');
		const radius = this.getAttribute('radius');
		const normalizedRadius = radius - stroke * 2;
		this.circumference = normalizedRadius * 2 * Math.PI;

		this.root = this.attachShadow({ mode: 'open' });
		this.root.innerHTML = `
		<svg
		height="${radius * 2}"
		width="${radius * 2}"
		>
		<circle
		stroke="white"
		stroke-dasharray="${this.circumference} ${this.circumference}"
		style="stroke-dashoffset:${this.circumference}"
		stroke-width="${stroke}"
		fill="transparent"
		r="${normalizedRadius}"
		cx="${radius}"
		cy="${radius}"
		/>
		</svg>

		<style>
		circle {
			transition: stroke-dashoffset 0.35s;
			transform: rotate(-90deg);
			transform-origin: 50% 50%;
		}
		</style>
		`;
	}

	setProgress(percent) {
		const offset = this.circumference - ((percent / 100) * this.circumference);
		const circle = this.root.querySelector('circle');
		circle.style.strokeDashoffset = offset;
	}

	static get observedAttributes() {
		return ['progress'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'progress') {
			this.setProgress(newValue);
		}
	}
}

window.customElements.define('progress-ring', ProgressRing);

// Get value from sessionStorage if present
if (sessionStorage.getItem('InmsCurrentTime')) {
	const videoCurrentTime = sessionStorage.getItem('InmsCurrentTime');
	const videoDuration = sessionStorage.getItem('InmsDuration');
	const continueElement = document.querySelector('.js-guide-continue');
	const progressRing = document.querySelector('progress-ring');
	const continueLink = document.querySelector('.js-guide-continue-link');
	const guideURL = sessionStorage.getItem('InmsCurrentGuideURL');

	if ((videoCurrentTime > 0) && progressRing && continueElement) {
		continueElement.classList.add('is-visible');
		const currentProgress = videoCurrentTime / videoDuration;
		continueLink.setAttribute('href', guideURL);
		// Calculate percentage played
		progressRing.setAttribute('progress', Math.floor(currentProgress * 100));
	}
}
