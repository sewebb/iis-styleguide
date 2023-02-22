'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideoGuideSubtitles = function () {
	function VideoGuideSubtitles(element, video) {
		var _this = this;

		_classCallCheck(this, VideoGuideSubtitles);

		this.onEnded = function () {
			_this.clearSubtitles();
		};

		this.onCueChange = function () {
			var activeCues = _this.subtitles.activeCues;


			if (activeCues.length > 0) {
				_this.subtitlesContainer.innerHTML = '<span>' + activeCues[0].text + '</span>';
			} else {
				_this.clearSubtitles();
			}
		};

		this.toggleSubtitles = function () {
			_this.subtitlesBtn.classList.toggle('is-active');
			_this.subtitlesContainer.classList.toggle('is-visible');

			_this.dataLayer.push({
				event: 'guided_tour',
				eventInfo: {
					category: 'guided_tour',
					action: 'player_click',
					label: 'Subtitles'
				}
			});

			console.log(_this.dataLayer);
		};

		this.dataLayer = window.dataLayer || [];
		this.element = element;
		this.video = video;
		this.subtitlesBtn = element.querySelector('.js-subtitles-btn');
		this.subtitlesContainer = element.querySelector('.js-subtitles-container');

		this.init();
		this.attach();
	}

	_createClass(VideoGuideSubtitles, [{
		key: 'init',
		value: function init() {
			this.subtitles = this.video.textTracks.getTrackById('video-subtitles');
		}
	}, {
		key: 'attach',
		value: function attach() {
			this.subtitlesBtn.addEventListener('click', this.toggleSubtitles);
			this.subtitles.addEventListener('cuechange', this.onCueChange);
		}
	}, {
		key: 'clearSubtitles',
		value: function clearSubtitles() {
			this.subtitlesContainer.innerHTML = '';
		}
	}]);

	return VideoGuideSubtitles;
}();

exports.default = VideoGuideSubtitles;