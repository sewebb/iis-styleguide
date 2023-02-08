export default class VideoGuideTimeline {
	constructor(element, video) {
		this.element = element;
		this.video = video;
		this.container = element.querySelector('.js-timeline-posts');
		this.posts = Array.from(element.querySelectorAll('.js-timeline-post'));
		this.toggleBtn = element.querySelector('.js-show-timelineposts');

		this.init();
		this.attach();
	}

	init() {
		this.meta = this.video.textTracks.getTrackById('video-metadata');
	}

	attach() {
		this.meta.addEventListener('cuechange', this.onCueChange);

		if (this.toggleBtn) {
			this.toggleBtn.addEventListener('click', this.togglePosts);
		}
	}

	togglePosts = () => {
		this.toggleBtn.classList.toggle('is-toggeled');
		this.container.classList.toggle('is-visible');
	};

	onCueChange = () => {
		const { activeCues } = this.meta;

		if (activeCues.length > 0) {
			const activeCue = activeCues[0];

			this.posts.forEach((post) => {
				if (post.dataset.id === activeCue.text) {
					post.classList.add('is-current');
				} else {
					post.classList.remove('is-current');
				}
			});
		}
	};
}
