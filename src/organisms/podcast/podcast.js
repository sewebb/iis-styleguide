let namespace;
const namespaceElement = document.querySelector('#site');
const podCast = document.querySelector('.js-podcast');
const audio = document.getElementById('podcastPlayer');
const jsTrackList = document.querySelector('.js-track-list');
const title = document.querySelector('.js-title');
const description = document.querySelector('.js-description');
const image = document.querySelector('.js-image');
const progress = document.querySelector('.js-progress');
const durationElement = document.querySelector('.js-duration');
const timeleftElement = document.querySelector('.js-timeleft');
const stepForward = document.querySelector('.js-step-forward');
const stepBackward = document.querySelector('.js-step-backward');
const playButton = document.querySelector('.js-play-button');
const playIcon = document.querySelector('.js-play-icon');
const pauseIcon = document.querySelector('.js-pause-icon');
const closeButton = document.querySelector('.js-close-player');
let rssURL = '';

if (podCast) {
	rssURL = podCast.dataset.rss;
}

if (!namespaceElement) {
	namespace = '';
} else {
	namespace = namespaceElement.dataset.namespace;
}

function timeupdate() {
	audio.addEventListener('timeupdate', () => {
		const duration = parseInt(audio.duration, 10);
		const currentTime = parseInt(audio.currentTime, 10);
		const timeLeft = duration - currentTime;
		let s; let
			m;

		s = timeLeft % 60;
		m = Math.floor(timeLeft / 60) % 60;

		s = s < 10 ? `0${s}` : s;
		m = m < 10 ? `0${m}` : m;

		if (timeLeft > 0) {
			timeleftElement.classList.remove('u-visibility-hidden');
			timeleftElement.innerHTML = `${m}:${s}`;
		}
	}, false);
}

let html = '';

function getItems(el) {
	html += `
	<li>
		<button
			class="${namespace}o-podcast-player__button display-flex js-play-episode"
			data-src="${el.querySelector('enclosure').getAttribute('url')}"
			data-title="${el.querySelector('title').innerHTML}"
			data-description="${el.querySelector('description').innerHTML.replace(/(<([^>]+)>)/gi, '').replace('<![CDATA[', '').replace(']]>', '')}"
			data-image="${el.querySelector('image').getAttribute('href')}"
			data-duration="${el.querySelector('duration').innerHTML}"
			type="button"><svg class="icon ${namespace}o-podcast-player__play-icon u-m-r-2"><use xlink:href="#icon-play"></use></svg></div><div class="u-visuallyhidden">Spela avsnittet ${el.querySelector('title').innerHTML}</div></button>
		<div class="${namespace}o-podcast-player__show-info">
			<div class="${namespace}o-podcast-player__title">${el.querySelector('title').innerHTML}</div>
			<div class="${namespace}o-podcast-player__description js-description">${el.querySelector('description').innerHTML}</div>
		</div>
	</li>
`;

	if (jsTrackList) {
		jsTrackList.innerHTML = html;
	}
}

if (rssURL) {
	fetch(rssURL)
		.then((response) => response.text())
		.then((str) => new window.DOMParser().parseFromString(str, 'text/xml'))
		.then((data) => {
			const items = data.querySelectorAll('item');

			items.forEach(getItems);
		});
}

function playEpisode(playBtn) {
	audio.src = playBtn.dataset.src;
	durationElement.innerHTML = playBtn.dataset.duration;
	title.innerHTML = playBtn.dataset.title;
	description.innerHTML = playBtn.dataset.description;
	image.src = playBtn.dataset.image;
	podCast.classList.remove(`${namespace}o-podcast-player--hidden`);
	timeleftElement.classList.add('u-visibility-hidden');

	if (audio.play) {
		audio.pause();
		pauseIcon.classList.remove('is-hidden');
		playIcon.classList.add('is-hidden');

		audio.currentTime = 0;
	}

	audio.play();
	timeupdate();

	setTimeout(() => {
		timeleftElement.classList.remove('u-visibility-hidden');
	}, 1000);
}

document.body.addEventListener('click', (e) => {
	const playBtn = e.target.closest('.js-play-episode');
	if (playBtn) {
		e.preventDefault();

		// Clear old episodedata
		audio.currentTime = 0;
		timeupdate();
		audio.pause();
		sessionStorage.removeItem('episodeData');

		// Play new episode
		playEpisode(playBtn);
	}
});

if (playButton) {
	playButton.addEventListener('click', () => {
		if (audio.paused) {
			audio.muted = false;
			audio.play();
			pauseIcon.classList.remove('is-hidden');
			playIcon.classList.add('is-hidden');
			timeleftElement.classList.add('u-visibility-hidden');
			timeupdate();
			timeleftElement.classList.remove('u-visibility-hidden');
		} else {
			audio.pause();
			pauseIcon.classList.add('is-hidden');
			playIcon.classList.remove('is-hidden');
		}
	});
}

if (audio) {
	audio.onended = () => {
		pauseIcon.classList.add('is-hidden');
		playIcon.classList.remove('is-hidden');
		timeleftElement.classList.add('u-visibility-hidden');
	};

	audio.ontimeupdate = () => {
		const timer = `${(audio.currentTime / audio.duration) * 100}%`;
		progress.style.width = timer;
	};
}

if (stepForward) {
	stepForward.addEventListener('click', () => {
		audio.currentTime += 60;
		timeupdate();
	});
}

if (stepBackward) {
	stepBackward.addEventListener('click', () => {
		audio.currentTime -= 15;
		timeupdate();
	});
}

function saveState() {
	const podcastData = {
		podCastTitle: title.innerHTML,
		episodeDescription: description.innerHTML,
		episodeSrc: audio.src,
		episodeCurrentTime: audio.currentTime,
		episodeDuration: durationElement.innerHTML,
		episodeImage: image.src,
	};

	sessionStorage.setItem('episodeData', JSON.stringify(podcastData));

	if (!audio.paused) {
		let existing = sessionStorage.getItem('episodeData');
		existing = existing ? JSON.parse(existing) : {};
		existing.podcastWasPlaying = true;
		sessionStorage.setItem('episodeData', JSON.stringify(existing));
	} else {
		let existing = sessionStorage.getItem('episodeData');
		existing = existing ? JSON.parse(existing) : {};
		existing.podcastWasPlaying = false;
		sessionStorage.setItem('episodeData', JSON.stringify(existing));
	}
}

// Handle continous play when user leaves the page
if (podCast) {
	window.addEventListener('visibilitychange', saveState);
	window.addEventListener('beforeunload', saveState);
}

if (sessionStorage.getItem('episodeData') && podCast) {
	const arr = JSON.parse(sessionStorage.getItem('episodeData'));

	if (arr.episodeCurrentTime) {
		podCast.classList.remove(`${namespace}o-podcast-player--hidden`);
		audio.src = arr.episodeSrc;
		image.src = arr.episodeImage;
		title.innerHTML = arr.podCastTitle;
		description.innerHTML = arr.episodeDescription;
		durationElement.innerHTML = arr.episodeDuration;

		if (arr.podcastWasPlaying === true) {
			const playPromise = audio.play();

			if (playPromise !== undefined) {
				playPromise.then(() => {
					// Continue playing audio on reload
					audio.currentTime = arr.episodeCurrentTime;
					timeupdate();
					audio.play();
					pauseIcon.classList.remove('is-hidden');
					playIcon.classList.add('is-hidden');
				}).catch(() => {
					// User reloaded page manually. Cannot play audio
					audio.addEventListener('loadedmetadata', () => {
						audio.currentTime = arr.episodeCurrentTime;
						timeupdate();
					});

					pauseIcon.classList.add('is-hidden');
					playIcon.classList.remove('is-hidden');
					audio.pause();
				});
			}
		} else {
			audio.addEventListener('loadedmetadata', () => {
				audio.currentTime = arr.episodeCurrentTime;
				timeupdate();
			});
			pauseIcon.classList.add('is-hidden');
			playIcon.classList.remove('is-hidden');
			audio.pause();
		}
	}
}

if (closeButton) {
	closeButton.addEventListener('click', () => {
		audio.currentTime = 0;
		timeupdate();
		audio.pause();
		sessionStorage.removeItem('episodeData');
		podCast.classList.add(`${namespace}o-podcast-player--hidden`);
	});
}
