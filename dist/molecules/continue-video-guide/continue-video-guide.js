'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _className = require('../../assets/js/className');

var _className2 = _interopRequireDefault(_className);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _CustomElement() {
	return Reflect.construct(HTMLElement, [], this.__proto__.constructor);
}

;
Object.setPrototypeOf(_CustomElement.prototype, HTMLElement.prototype);
Object.setPrototypeOf(_CustomElement, HTMLElement);

var ProgressRing = function (_CustomElement2) {
	_inherits(ProgressRing, _CustomElement2);

	function ProgressRing() {
		_classCallCheck(this, ProgressRing);

		var _this = _possibleConstructorReturn(this, (ProgressRing.__proto__ || Object.getPrototypeOf(ProgressRing)).call(this));

		var stroke = _this.getAttribute('stroke');
		var radius = _this.getAttribute('radius');
		var normalizedRadius = radius - stroke * 2;
		_this.circumference = normalizedRadius * 2 * Math.PI;

		_this.root = _this.attachShadow({ mode: 'open' });
		_this.root.innerHTML = '\n\t\t<svg\n\t\theight="' + radius * 2 + '"\n\t\twidth="' + radius * 2 + '"\n\t\t>\n\t\t<circle\n\t\tstroke="white"\n\t\tstroke-dasharray="' + _this.circumference + ' ' + _this.circumference + '"\n\t\tstyle="stroke-dashoffset:' + _this.circumference + '"\n\t\tstroke-width="' + stroke + '"\n\t\tfill="transparent"\n\t\tr="' + normalizedRadius + '"\n\t\tcx="' + radius + '"\n\t\tcy="' + radius + '"\n\t\t/>\n\t\t</svg>\n\n\t\t<style>\n\t\tcircle {\n\t\t\ttransition: stroke-dashoffset 0.35s;\n\t\t\ttransform: rotate(-90deg);\n\t\t\ttransform-origin: 50% 50%;\n\t\t}\n\t\t</style>\n\t\t';
		return _this;
	}

	_createClass(ProgressRing, [{
		key: 'setProgress',
		value: function setProgress(percent) {
			var offset = this.circumference - percent / 100 * this.circumference;
			var circle = this.root.querySelector('circle');
			circle.style.strokeDashoffset = offset;
		}
	}, {
		key: 'attributeChangedCallback',
		value: function attributeChangedCallback(name, oldValue, newValue) {
			if (name === 'progress') {
				this.setProgress(newValue);
			}
		}
	}], [{
		key: 'observedAttributes',
		get: function get() {
			return ['progress'];
		}
	}]);

	return ProgressRing;
}(_CustomElement);

window.customElements.define('progress-ring', ProgressRing);

// Get value from localStorage if present
if (localStorage.getItem('InmsCurrentTime')) {
	var videoCurrentTime = localStorage.getItem('InmsCurrentTime');
	var videoDuration = localStorage.getItem('InmsDuration');
	var continueElement = document.querySelector('.js-guide-continue');
	var progressRing = document.querySelector('progress-ring');
	var continueLink = document.querySelector('.js-guide-continue-link');
	var guideURL = localStorage.getItem('InmsCurrentGuideURL');
	var guideImage = localStorage.getItem('InmsCurrentGuideImage');

	if (videoCurrentTime > 0 && progressRing && continueElement && guideImage && continueLink) {
		var alternativeText = continueLink.dataset.altText;
		var currentProgress = videoCurrentTime / videoDuration;
		var currentGuideImage = document.querySelector('.js-guide-continue-image');

		continueElement.classList.add((0, _className2.default)('m-continue-video-guide--has-progress'));
		continueLink.setAttribute('href', guideURL);
		currentGuideImage.src = guideImage;
		continueLink.querySelector('span').innerText = alternativeText;
		// Calculate percentage played
		progressRing.setAttribute('progress', Math.floor(currentProgress * 100));
	}
}