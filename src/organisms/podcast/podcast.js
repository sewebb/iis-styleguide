const namespace = document.querySelector('#site');
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

const rssURL = 'https://internetpodden.libsyn.com/rss';

function timeupdate() {
	audio.addEventListener('timeupdate', () => {
		const timeleft = timeleftElement;
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
			timeleft.innerHTML = `${m}:${s}`;
		}
	}, false);
}

fetch(rssURL)
	.then((response) => response.text())
	.then((str) => new window.DOMParser().parseFromString(str, 'text/xml'))
	.then((data) => {
		const items = data.querySelectorAll('item');
		let html = '';

		function getItems(el) {
			html += `
			<li>
				<button
					data-src="${el.querySelector('enclosure').getAttribute('url')}"
					data-title="${el.querySelector('title').innerHTML}"
					data-description="${el.querySelector('description').innerHTML.replace(/(<([^>]+)>)/gi, '').replace('<![CDATA[', '').replace(']]>', '')}"
					data-image="${el.querySelector('image').getAttribute('href')}"
					data-duration="${el.querySelector('duration').innerHTML}"
					class="o-podcast__button display-flex js-play-episode" type="button"><svg class="icon ${namespace.dataset.namespace}o-podcast__play-icon u-m-r-2"><use xlink:href="#icon-play"></use></svg></div><div class="u-align-left spp-play-title"></button>
				<div class="o-podcast__show-info">
					<div class="o-podcast__title">${el.querySelector('title').innerHTML}</div>
					<div class="o-podcast__description">${el.querySelector('description').innerHTML}</div>
				</div>
			</li>
		`;

			jsTrackList.innerHTML = html;

			const playEpisodes = document.querySelectorAll('.js-play-episode');

			[].forEach.call(playEpisodes, (playEpisode) => {
				playEpisode.addEventListener('click', () => {
					audio.src = playEpisode.dataset.src;
					durationElement.innerHTML = playEpisode.dataset.duration;
					title.innerHTML = playEpisode.dataset.title;
					description.innerHTML = playEpisode.dataset.description;
					image.src = playEpisode.dataset.image;
					podCast.classList.remove(`${namespace.dataset.namespace}o-podcast--hidden`);

					if (audio.play) {
						audio.pause();
						pauseIcon.classList.remove('is-hidden');
						playIcon.classList.add('is-hidden');

						audio.currentTime = 0;
					}

					setTimeout(() => {
						audio.play();
						timeupdate();
					}, 1000);
				});
			});
		}

		items.forEach(getItems);
	});

playButton.addEventListener('click', () => {
	if (audio.paused) {
		audio.play();
		pauseIcon.classList.remove('is-hidden');
		playIcon.classList.add('is-hidden');
	} else {
		audio.pause();
		pauseIcon.classList.add('is-hidden');
		playIcon.classList.remove('is-hidden');
	}
});

audio.onended = () => {
	pauseIcon.classList.add('is-hidden');
	playIcon.classList.remove('is-hidden');
	timeleftElement.classList.add('u-visibility-hidden');
};

stepForward.addEventListener('click', () => {
	audio.currentTime += 60;
	timeupdate();
});

stepBackward.addEventListener('click', () => {
	audio.currentTime -= 15;
	timeupdate();
});

audio.ontimeupdate = () => {
	const timer = `${(audio.currentTime / audio.duration) * 100}%`;
	progress.style.width = timer;
};
