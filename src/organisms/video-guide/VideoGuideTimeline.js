export default class VideoGuideTimeline {
	constructor(element, video) {
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

	createImageHeadline(activeCue, post) {
		if (activeCue.text in this.headlineCache) {
			return;
		}

		let element = post.querySelector('[data-video-headline-tpl]');

		if (post.querySelector('[data-video-headline-tpl]')) {
			this.headlineCache[activeCue.text] = element;
			return;
		}

		element = this.headlineTpl.cloneNode(true);
		const prevHeadline = element.querySelector('h1');
		const headline = document.createElement('h2');

		headline.className = prevHeadline.className;
		headline.innerHTML = activeCue.id;

		prevHeadline.parentNode.replaceChild(headline, prevHeadline);
		post.appendChild(element);

		this.headlineCache[activeCue.text] = element;
	}

	onCueChange = () => {
		const { activeCues } = this.meta;

		if (activeCues.length > 0) {
			const activeCue = activeCues[0];
			const activePost = this.posts.find((post) => post.dataset.id === activeCue.text);

			if (activePost) {
				this.posts.forEach((post) => {
					post.classList.remove('is-current');
				});

				activePost.classList.add('is-current');
			}

			this.images.forEach((post) => {
				if (post.dataset.id === activeCue.text) {
					post.classList.add('is-current');

					this.createImageHeadline(activeCue, post);
				} else {
					post.classList.remove('is-current');
				}
			});
		}
	};
}
