export default class VideoGuideSubtitles {
	constructor(element, video) {
		this.dataLayer = window.dataLayer || [];
		this.element = element;
		this.video = video;
		this.subtitlesBtn = element.querySelector('.js-subtitles-btn');
		this.subtitlesContainer = element.querySelector('.js-subtitles-container');

		this.init();
		this.attach();
	}

	init() {
		this.subtitles = this.video.textTracks.getTrackById('video-subtitles');
	}

	attach() {
		this.subtitlesBtn.addEventListener('click', this.toggleSubtitles);
		this.subtitles.addEventListener('cuechange', this.onCueChange);
	}

	clearSubtitles() {
		this.subtitlesContainer.innerHTML = '';
	}

	onEnded = () => {
		this.clearSubtitles();
	};

	onCueChange = () => {
		const { activeCues } = this.subtitles;

		if (activeCues.length > 0) {
			this.subtitlesContainer.innerHTML = `<span>${activeCues[0].text}</span>`;
		} else {
			this.clearSubtitles();
		}
	};

	toggleSubtitles = () => {
		this.subtitlesBtn.classList.toggle('is-active');
		this.subtitlesContainer.classList.toggle('is-visible');

		this.dataLayer.push({
			event: 'guided_tour',
			eventInfo: {
				category: 'guided_tour',
				action: 'player_click',
				label: 'Subtitles',
			},
		});

		console.log(this.dataLayer);
	};
}
