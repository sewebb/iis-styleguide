'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideoGuideTimeline = function () {
	function VideoGuideTimeline(element, video) {
		var _this = this;

		_classCallCheck(this, VideoGuideTimeline);

		this.togglePosts = function () {
			_this.toggleBtn.classList.toggle('is-toggeled');
			_this.container.classList.toggle('is-visible');
		};

		this.onCueChange = function () {
			var activeCues = _this.meta.activeCues;


			if (activeCues.length > 0) {
				var activeCue = activeCues[0];
				var activePost = _this.posts.find(function (post) {
					return post.dataset.id === activeCue.text;
				});

				if (activePost) {
					_this.posts.forEach(function (post) {
						post.classList.remove('is-current');
					});

					activePost.classList.add('is-current');
				}

				_this.images.forEach(function (post) {
					if (post.dataset.id === activeCue.text) {
						post.classList.add('is-current');

						_this.createImageHeadline(activeCue, post);
					} else {
						post.classList.remove('is-current');
					}
				});
			}
		};

		this.element = element;
		this.video = video;
		this.container = element.querySelector('.js-timeline-posts');
		this.posts = Array.from(element.querySelectorAll('.js-timeline-post:not(.js-timeline-image)'));
		this.images = Array.from(element.querySelectorAll('.js-timeline-image'));
		this.toggleBtn = element.querySelector('.js-show-timelineposts');
		this.headlineTpl = element.querySelector('[data-video-headline-tpl]');
		this.headlineCache = {};

		this.init();
		this.attach();
	}

	_createClass(VideoGuideTimeline, [{
		key: 'init',
		value: function init() {
			this.meta = this.video.textTracks.getTrackById('video-metadata');
		}
	}, {
		key: 'attach',
		value: function attach() {
			this.meta.addEventListener('cuechange', this.onCueChange);

			if (this.toggleBtn) {
				this.toggleBtn.addEventListener('click', this.togglePosts);
			}
		}
	}, {
		key: 'createImageHeadline',
		value: function createImageHeadline(activeCue, post) {
			if (activeCue.text in this.headlineCache) {
				return;
			}

			var element = post.querySelector('[data-video-headline-tpl]');

			if (post.querySelector('[data-video-headline-tpl]')) {
				this.headlineCache[activeCue.text] = element;
				return;
			}

			element = this.headlineTpl.cloneNode(true);
			var prevHeadline = element.querySelector('h1');
			var headline = document.createElement('h2');

			headline.className = prevHeadline.className;
			headline.innerHTML = activeCue.id;

			prevHeadline.parentNode.replaceChild(headline, prevHeadline);
			post.appendChild(element);

			this.headlineCache[activeCue.text] = element;
		}
	}]);

	return VideoGuideTimeline;
}();

exports.default = VideoGuideTimeline;