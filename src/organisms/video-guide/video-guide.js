import VideoGuideSubtitles from './VideoGuideSubtitles';
import VideoGuideTimeline from './VideoGuideTimeline';
import VideoGuidePlayback from './VideoGuidePlayback';

class VideoGuide {
	constructor(element) {
		this.element = element;
		this.video = element.querySelector('.js-video-guide');
		this.abortBtn = element.querySelector('.js-abort-guide');
		this.playback = null;
		this.subtitles = null;
		this.timeline = null;

		// Set all track elements to hidden mode to allow scripting
		[].forEach.call(this.video.textTracks, (txtTrack) => {
			txtTrack.mode = 'hidden';
		});

		this.attach();

		// loadedmetadata might not be fired if the video is already loaded
		if (this.video.readyState >= 1) {
			this.onLoadedMetadata();
		}
	}

	attach() {
		this.video.addEventListener('loadedmetadata', this.onLoadedMetadata);
		this.video.addEventListener('play', this.onPlay);
		this.video.addEventListener('pause', this.onPause);
		this.video.addEventListener('ended', this.onEnded);
		this.video.addEventListener('timeupdate', this.onTimeUpdate);
		this.abortBtn.addEventListener('click', this.onAbort);
	}

	onLoadedMetadata = () => {
		this.playback = new VideoGuidePlayback(this.element, this.video);
		this.subtitles = new VideoGuideSubtitles(this.element, this.video);
		this.timeline = new VideoGuideTimeline(this.element, this.video);

		this.video.classList.remove('is-loading');
	}

	dispatchEvent = (eventName) => {
		[this.playback, this.subtitles, this.timeline].forEach((instance) => {
			if (instance && eventName in instance) {
				instance[eventName]();
			}
		});
	}

	onPlay = () => this.dispatchEvent('onPlay');

	onPause = () => this.dispatchEvent('onPause');

	onEnded = () => this.dispatchEvent('onEnded');

	onTimeUpdate = () => this.dispatchEvent('onTimeUpdate');

	onAbort = () => {
		this.dispatchEvent('onAbort');
		window.location.href = this.abortBtn.href;
	};
}

const elements = document.querySelectorAll('[data-video-guide]');

elements.forEach((element) => new VideoGuide(element));
