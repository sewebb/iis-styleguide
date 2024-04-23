'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _VideoGuideSubtitles = require('./VideoGuideSubtitles');

var _VideoGuideSubtitles2 = _interopRequireDefault(_VideoGuideSubtitles);

var _VideoGuideTimeline = require('./VideoGuideTimeline');

var _VideoGuideTimeline2 = _interopRequireDefault(_VideoGuideTimeline);

var _VideoGuidePlayback = require('./VideoGuidePlayback');

var _VideoGuidePlayback2 = _interopRequireDefault(_VideoGuidePlayback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideoGuide = function () {
	function VideoGuide(element) {
		var _this = this;

		_classCallCheck(this, VideoGuide);

		this.onLoadedMetadata = function () {
			_this.playback = new _VideoGuidePlayback2.default(_this.element, _this.video);
			_this.subtitles = new _VideoGuideSubtitles2.default(_this.element, _this.video);
			_this.timeline = new _VideoGuideTimeline2.default(_this.element, _this.video);

			_this.video.classList.remove('is-loading');
		};

		this.dispatchEvent = function (eventName) {
			[_this.playback, _this.subtitles, _this.timeline].forEach(function (instance) {
				if (instance && eventName in instance) {
					instance[eventName]();
				}
			});
		};

		this.onPlay = function () {
			return _this.dispatchEvent('onPlay');
		};

		this.onPause = function () {
			return _this.dispatchEvent('onPause');
		};

		this.onEnded = function () {
			return _this.dispatchEvent('onEnded');
		};

		this.onTimeUpdate = function () {
			return _this.dispatchEvent('onTimeUpdate');
		};

		this.onAbort = function () {
			_this.dispatchEvent('onAbort');
			window.location.href = _this.abortBtn.href;
		};

		this.element = element;
		this.video = element.querySelector('.js-video-guide');
		this.abortBtn = element.querySelector('.js-abort-guide');
		this.playback = null;
		this.subtitles = null;
		this.timeline = null;

		// Set all track elements to hidden mode to allow scripting
		[].forEach.call(this.video.textTracks, function (txtTrack) {
			txtTrack.mode = 'hidden';
		});

		this.attach();

		// loadedmetadata might not be fired if the video is already loaded
		if (this.video.readyState >= 1) {
			this.onLoadedMetadata();
		}
	}

	_createClass(VideoGuide, [{
		key: 'attach',
		value: function attach() {
			this.video.addEventListener('loadedmetadata', this.onLoadedMetadata);
			this.video.addEventListener('play', this.onPlay);
			this.video.addEventListener('pause', this.onPause);
			this.video.addEventListener('ended', this.onEnded);
			this.video.addEventListener('timeupdate', this.onTimeUpdate);
			this.abortBtn.addEventListener('click', this.onAbort);
		}
	}]);

	return VideoGuide;
}();

var elements = document.querySelectorAll('[data-video-guide]');

elements.forEach(function (element) {
	return new VideoGuide(element);
});