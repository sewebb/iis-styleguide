"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _className = /*#__PURE__*/ _interop_require_default(require("../../assets/js/className"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class ProgressRing extends HTMLElement {
    setProgress(percent) {
        const offset = this.circumference - percent / 100 * this.circumference;
        const circle = this.root.querySelector('circle');
        circle.style.strokeDashoffset = offset;
    }
    static get observedAttributes() {
        return [
            'progress'
        ];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'progress') {
            this.setProgress(newValue);
        }
    }
    constructor(){
        super();
        const stroke = this.getAttribute('stroke');
        const radius = this.getAttribute('radius');
        const normalizedRadius = radius - stroke * 2;
        this.circumference = normalizedRadius * 2 * Math.PI;
        this.root = this.attachShadow({
            mode: 'open'
        });
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
}
window.customElements.define('progress-ring', ProgressRing);
const continueElement = document.querySelector('.js-guide-continue');
// Get value from sessionStorage if present
if (sessionStorage.getItem('InmsCurrentTime')) {
    const videoCurrentTime = sessionStorage.getItem('InmsCurrentTime');
    const videoDuration = sessionStorage.getItem('InmsDuration');
    const progressRing = document.querySelector('progress-ring');
    const continueLink = document.querySelector('.js-guide-continue-link');
    const guideURL = sessionStorage.getItem('InmsCurrentGuideURL');
    const guideImage = sessionStorage.getItem('InmsCurrentGuideImage');
    if (videoCurrentTime > 0 && progressRing && continueElement && guideImage && continueLink) {
        const alternativeText = continueLink.dataset.altText;
        const currentProgress = videoCurrentTime / videoDuration;
        const currentGuideImage = document.querySelector('.js-guide-continue-image');
        continueElement.classList.add((0, _className.default)('m-continue-video-guide--has-progress'));
        continueLink.setAttribute('href', guideURL);
        currentGuideImage.src = guideImage;
        continueLink.querySelector('span').innerText = alternativeText;
        // Calculate percentage played
        progressRing.setAttribute('progress', Math.floor(currentProgress * 100));
    }
}
// Close Continue Component
const closeButton = document.querySelector('.js-guide-close');
if (closeButton) {
    closeButton.addEventListener('click', ()=>{
        sessionStorage.setItem('InmsGuideClosed', true);
        continueElement.classList.remove('is-visible');
    });
    if (!sessionStorage.getItem('InmsGuideClosed')) {
        continueElement.classList.add('is-visible');
    }
    if (document.querySelector('.js-video-guide')) {
        continueElement.classList.remove('is-visible');
    }
}
