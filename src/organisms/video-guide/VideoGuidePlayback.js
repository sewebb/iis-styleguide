import getCurrentCueIndex from './getCurrentCueIndex';

export default class VideoGuidePlayback {
	constructor(element, video) {
		this.video = video;
		this.playBtn = element.querySelector('.js-play-btn');
		this.playIcon = element.querySelector('.js-play-icon');
		this.pauseIcon = element.querySelector('.js-pause-icon');
		this.forwardsButton = element.querySelector('.js-next-chapter');
		this.backwardsButton = element.querySelector('.js-previous-chapter');
		this.chapterElements = Array.from(element.querySelectorAll('.js-chapters li'));
		this.sessionKeys = {
			currentTime: 'InmsCurrentTime',
			duration: 'InmsDuration',
			currentGuideURL: 'InmsCurrentGuideURL',
			currentGuideImage: 'InmsCurrentGuideImage',
		};

		this.duration = null;
		this.timeLeft = null;

		this.init();
		this.attach();
	}

	init() {
		this.duration = this.video.duration;
		this.chapters = this.video.textTracks.getTrackById('video-chapters');

		if (this.chapters) {
			this.chapters.addEventListener('cuechange', this.onCueChange);
			this.setForwardState(true);
		}

		// Run on next tick to ensure that the video has loaded and event listeners are attached
		setTimeout(() => {
			this.sync();
		}, 0);

		// Format duration to minutes and seconds
		const minutes = Math.floor(this.duration / 60);
		const seconds = Math.floor(this.duration % 60);
		const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

		// TODO: Add duration to the DOM
		console.log(formattedDuration);
	}

	sync() {
		const key = this.sessionKeys.currentTime;
		const guideURL = window.location.href;

		// If the current guide URL is not the same as the one in session storage, do not sync
		if (sessionStorage.getItem(this.sessionKeys.currentGuideURL) !== guideURL) {
			return;
		}

		if (sessionStorage.getItem(key)) {
			const videoCurrentTime = sessionStorage.getItem(key);

			if (videoCurrentTime > 0) {
				this.video.currentTime = videoCurrentTime;
			}
		}
	}

	attach() {
		this.playBtn.addEventListener('click', this.togglePlay);
		this.forwardsButton.addEventListener('click', this.nextChapter);
		this.backwardsButton.addEventListener('click', this.previousChapter);

		window.addEventListener('visibilitychange', this.saveState);
		window.addEventListener('beforeunload', this.saveState);
	}

	setPlayActive() {
		this.pauseIcon.classList.remove('is-hidden');
		this.playIcon.classList.add('is-hidden');
	}

	setPauseActive() {
		this.pauseIcon.classList.add('is-hidden');
		this.playIcon.classList.remove('is-hidden');
	}

	setForwardState(active) {
		if (active) {
			// TODO: data-id not needed anymore but controls css
			this.forwardsButton.setAttribute('data-id', 'foo');
			this.forwardsButton.disabled = false;
		} else {
			this.forwardsButton.removeAttribute('data-id');
			this.forwardsButton.disabled = true;
		}
	}

	setBackwardState(active) {
		if (active) {
			// TODO: data-id not needed anymore but controls css
			this.backwardsButton.setAttribute('data-id', 'foo');
			this.backwardsButton.disabled = false;
		} else {
			this.backwardsButton.removeAttribute('data-id');
			this.backwardsButton.disabled = true;
		}
	}

	updateChapterState() {
		const { cues } = this.chapters;
		const activeCueIndex = getCurrentCueIndex(this.chapters);

		this.setBackwardState(activeCueIndex > 0);
		this.setForwardState(activeCueIndex < cues.length - 1);

		this.chapterElements.forEach((chapter, i) => {
			if (i === activeCueIndex) {
				chapter.classList.add('is-current-item');
			} else {
				chapter.classList.remove('is-current-item');
			}
		});
	}

	saveState = () => {
		if (this.video.currentTime > 0) {
			const {
				currentTime,
				duration,
				currentGuideURL,
				currentGuideImage,
			} = this.sessionKeys;
			const guideURL = window.location.href;
			const guideImage = this.video.dataset.featuredImage;

			sessionStorage.setItem(currentTime, this.video.currentTime);
			sessionStorage.setItem(duration, this.video.duration);
			sessionStorage.setItem(currentGuideURL, guideURL);
			sessionStorage.setItem(currentGuideImage, guideImage);
		}
	};

	clearState = () => {
		Object.values(this.sessionKeys).forEach((key) => {
			sessionStorage.removeItem(key);
		});
	};

	onPlay = () => {
		this.setPlayActive();
	};

	onPause = () => {
		this.setPauseActive();
	};

	onEnded = () => {
		this.setPlayActive();
		this.clearState();
		this.setBackwardState(false);
		this.setForwardState(false);

		this.video.currentTime = 0;
	};

	onAbort = () => {
		this.video.pause();
		this.onEnded();
	};

	onTimeUpdate = () => {
		const timeLeft = Math.floor(this.duration - this.video.currentTime);

		// Time update fires every 250ms, so we only want to update the DOM when the time left changes
		if (timeLeft === this.timeLeft) {
			return;
		}

		this.timeLeft = timeLeft;

		const minutes = Math.floor(timeLeft / 60);
		const seconds = Math.floor(timeLeft % 60);
		const formattedTimeLeft = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

		// TODO: Add time left to the DOM
		console.log(formattedTimeLeft);
	};

	onCueChange = () => {
		this.updateChapterState();
	};

	togglePlay = () => {
		if (this.video.paused) {
			this.video.play();
		} else {
			this.video.pause();
		}
	};

	nextChapter = () => {
		const { cues } = this.chapters;
		const activeCueIndex = getCurrentCueIndex(this.chapters);

		if (activeCueIndex < cues.length - 1) {
			this.video.currentTime = cues[activeCueIndex + 1].startTime + 0.01;
			this.updateChapterState();
		}
	};

	previousChapter = () => {
		const { cues } = this.chapters;
		const activeCueIndex = getCurrentCueIndex(this.chapters);

		if (activeCueIndex > 0) {
			this.video.currentTime = Math.max(0, cues[activeCueIndex - 1].startTime + 0.01);
			this.updateChapterState();
		}
	}
}
