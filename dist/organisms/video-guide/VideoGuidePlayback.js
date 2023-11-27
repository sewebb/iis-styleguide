'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _getCurrentCueIndex = require('./getCurrentCueIndex');

var _getCurrentCueIndex2 = _interopRequireDefault(_getCurrentCueIndex);

var _track = require('../../assets/js/track');

var _track2 = _interopRequireDefault(_track);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideoGuidePlayback = function () {
	function VideoGuidePlayback(element, video) {
		var _this = this;

		_classCallCheck(this, VideoGuidePlayback);

		this.saveState = function () {
			if (_this.video.currentTime > 0) {
				var _sessionKeys = _this.sessionKeys,
				    currentTime = _sessionKeys.currentTime,
				    duration = _sessionKeys.duration,
				    currentGuideURL = _sessionKeys.currentGuideURL,
				    currentGuideImage = _sessionKeys.currentGuideImage;

				var guideURL = window.location.href;
				var guideImage = _this.video.dataset.featuredImage;

				sessionStorage.setItem(currentTime, _this.video.currentTime);
				sessionStorage.setItem(duration, _this.video.duration);
				sessionStorage.setItem(currentGuideURL, guideURL);
				sessionStorage.setItem(currentGuideImage, guideImage);
			}
		};

		this.clearState = function () {
			Object.values(_this.sessionKeys).forEach(function (key) {
				sessionStorage.removeItem(key);
			});
		};

		this.onPlay = function () {
			_this.setPlayActive();
		};

		this.onPause = function () {
			_this.setPauseActive();
		};

		this.resetState = function () {
			_this.setPauseActive();
			_this.clearState();
			_this.setBackwardState(false);
			_this.setForwardState(false);

			_this.video.currentTime = 0;
		};

		this.onEnded = function () {
			_this.resetState();

			(0, _track2.default)({
				event: 'guided_tour',
				eventInfo: {
					category: 'guided_tour',
					action: 'guide_completed',
					label: window.location.href
				}
			});
		};

		this.onAbort = function () {
			_this.video.pause();
			_this.resetState();
		};

		this.onTimeUpdate = function () {
			var timeLeft = Math.floor(_this.duration - _this.video.currentTime);

			// Time update fires every 250ms, so we only want to update the DOM when the time left changes
			if (timeLeft === _this.timeLeft) {
				return;
			}

			_this.timeLeft = timeLeft;

			var minutes = Math.floor(timeLeft / 60);
			var seconds = Math.floor(timeLeft % 60);

			_this.countDownElement.innerText = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
		};

		this.onCueChange = function () {
			_this.updateChapterState();
		};

		this.togglePlay = function () {
			var label = void 0;

			if (_this.video.paused) {
				label = 'Play';
				_this.video.play();
			} else {
				label = 'Pause';
				_this.video.pause();
			}

			(0, _track2.default)({
				event: 'guided_tour',
				eventInfo: {
					category: 'guided_tour',
					action: 'player_click',
					label: label
				}
			});
		};

		this.nextChapter = function () {
			var cues = _this.chapters.cues;

			var activeCueIndex = (0, _getCurrentCueIndex2.default)(_this.chapters);

			if (activeCueIndex < cues.length - 1) {
				_this.video.currentTime = cues[activeCueIndex + 1].startTime + 0.01;
				_this.updateChapterState();

				(0, _track2.default)({
					event: 'guided_tour',
					eventInfo: {
						category: 'guided_tour',
						action: 'player_click',
						label: 'Forward'
					}
				});
			}
		};

		this.previousChapter = function () {
			var cues = _this.chapters.cues;

			var activeCueIndex = (0, _getCurrentCueIndex2.default)(_this.chapters);

			if (activeCueIndex > 0) {
				_this.video.currentTime = Math.max(0, cues[activeCueIndex - 1].startTime + 0.01);
				_this.updateChapterState();

				(0, _track2.default)({
					event: 'guided_tour',
					eventInfo: {
						category: 'guided_tour',
						action: 'player_click',
						label: 'Backward'
					}
				});
			}
		};

		this.video = video;
		this.playBtn = element.querySelector('.js-play-btn');
		this.playIcon = element.querySelector('.js-play-icon');
		this.pauseIcon = element.querySelector('.js-pause-icon');
		this.forwardsButton = element.querySelector('.js-next-chapter');
		this.backwardsButton = element.querySelector('.js-previous-chapter');
		this.totaltimeElement = element.querySelector('.js-totaltime');
		this.countDownElement = element.querySelector('.js-countdown');
		this.chapterElements = Array.from(element.querySelectorAll('.js-chapters li'));
		this.sessionKeys = {
			currentTime: 'InmsCurrentTime',
			duration: 'InmsDuration',
			currentGuideURL: 'InmsCurrentGuideURL',
			currentGuideImage: 'InmsCurrentGuideImage'
		};

		this.duration = null;
		this.timeLeft = null;

		this.init();
		this.attach();
	}

	_createClass(VideoGuidePlayback, [{
		key: 'init',
		value: function init() {
			var _this2 = this;

			this.duration = this.video.duration;
			this.chapters = this.video.textTracks.getTrackById('video-chapters');

			if (this.chapters) {
				this.chapters.addEventListener('cuechange', this.onCueChange);
				this.setForwardState(true);
			}

			// Run on next tick to ensure that the video has loaded and event listeners are attached
			setTimeout(function () {
				_this2.sync();
			}, 0);

			// Format duration to minutes and seconds
			var minutes = Math.floor(this.duration / 60);
			var seconds = Math.floor(this.duration % 60);

			this.totaltimeElement.innerText = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
		}
	}, {
		key: 'sync',
		value: function sync() {
			var key = this.sessionKeys.currentTime;
			var guideURL = window.location.href;

			// If the current guide URL is not the same as the one in session storage, do not sync
			if (sessionStorage.getItem(this.sessionKeys.currentGuideURL) !== guideURL) {
				return;
			}

			if (sessionStorage.getItem(key)) {
				var videoCurrentTime = sessionStorage.getItem(key);

				if (videoCurrentTime > 0) {
					this.video.currentTime = videoCurrentTime;
				}
			}
		}
	}, {
		key: 'attach',
		value: function attach() {
			this.playBtn.addEventListener('click', this.togglePlay);
			this.forwardsButton.addEventListener('click', this.nextChapter);
			this.backwardsButton.addEventListener('click', this.previousChapter);

			window.addEventListener('visibilitychange', this.saveState);
			window.addEventListener('beforeunload', this.saveState);
		}
	}, {
		key: 'setPlayActive',
		value: function setPlayActive() {
			this.pauseIcon.classList.remove('is-hidden');
			this.playIcon.classList.add('is-hidden');
		}
	}, {
		key: 'setPauseActive',
		value: function setPauseActive() {
			this.pauseIcon.classList.add('is-hidden');
			this.playIcon.classList.remove('is-hidden');
		}
	}, {
		key: 'setForwardState',
		value: function setForwardState(active) {
			this.forwardsButton.disabled = !active;
		}
	}, {
		key: 'setBackwardState',
		value: function setBackwardState(active) {
			this.backwardsButton.disabled = !active;
		}
	}, {
		key: 'updateChapterState',
		value: function updateChapterState() {
			var cues = this.chapters.cues;

			var activeCueIndex = (0, _getCurrentCueIndex2.default)(this.chapters);

			this.setBackwardState(activeCueIndex > 0);
			this.setForwardState(activeCueIndex < cues.length - 1);

			this.chapterElements.forEach(function (chapter, i) {
				if (i === activeCueIndex) {
					chapter.classList.add('is-current-item');
				} else {
					chapter.classList.remove('is-current-item');
				}
			});
		}
	}]);

	return VideoGuidePlayback;
}();

exports.default = VideoGuidePlayback;