// TODO: Should probably implement a way to localize texts in the styleguide
import className from './className';
import hasCookieConsent from './hasCookieConsent';

const missingConsentMessage = 'För att spela Youtubefilmer krävs att "Riktade kakor" tillåts. Tryck för att "Anpassa kakor"';

function loadYoutubeAPI() {
	const id = 'iisYoutubeAPI';

	if (document.getElementById(id)) {
		return;
	}

	const tag = document.createElement('script');
	const firstScript = document.getElementsByTagName('script')[0];

	tag.id = id;
	tag.src = 'https://www.youtube.com/iframe_api';

	firstScript.parentNode.insertBefore(tag, firstScript);
}

function onPlayerStateChange(el, e) {
	if (e.data === YT.PlayerState.PLAYING) {
		el.getElementsByTagName('img')[0].style.zIndex = '-1';
		el.getElementsByTagName('button')[0].style.display = 'none';
	} else if (e.data === YT.PlayerState.UNSTARTED) {
		el.getElementsByTagName('img')[0].style.zIndex = null;
		el.getElementsByTagName('button')[0].style.display = null;
	}
}

function createConsentWarning(el) {
	if (el.querySelector('[data-youtube-consent-warning]')) {
		return;
	}

	const div = document.createElement('div');
	const button = document.createElement('button');
	const message = document.createElement('p');

	div.setAttribute('data-youtube-consent-warning', true);
	div.className = className('m-icon-overlay__message');
	button.className = className('a-button');
	button.innerHTML = `<span class="${className('a-button__text')} ot-sdk-show-settings">Anpassa kakor</span>`;
	message.innerHTML = missingConsentMessage;

	div.appendChild(message);
	div.appendChild(button);

	el.appendChild(div);
}

function createCover(el) {
	if (el.getElementsByTagName('img').length) {
		return;
	}

	const id = el.getAttribute('data-youtube');
	const url = `https://i3.ytimg.com/vi/${id}/maxresdefault.jpg`;
	const img = document.createElement('img');

	el.appendChild(img);

	img.loading = 'lazy';
	img.src = url;

	if (!hasCookieConsent('C0004')) {
		createConsentWarning(el);
	}
}

function setupYoutubePlayer(el) {
	if (el.youtube) {
		return;
	}

	const id = el.getAttribute('data-youtube');
	const playerEl = document.createElement('div');

	playerEl.setAttribute('data-youtube-container', true);
	el.appendChild(playerEl);

	el.youtube = new YT.Player(playerEl, {
		height: '100%',
		width: '100%',
		videoId: id,
		playerVars: {
			// https://developers.google.com/youtube/player_parameters#Parameters
			playsinline: 1,
			autoplay: true,
			rel: 0,
		},
		events: {
			onStateChange: (e) => onPlayerStateChange(el, e),
		},
	});

	el.getElementsByTagName('img')[0].style.zIndex = '-1';
	el.getElementsByTagName('button')[0].style.display = 'none';
}

function delegateClick(e) {
	if (e.target.closest('[data-youtube-consent-warning]')) {
		return;
	}

	const el = e.target.closest('[data-youtube]');

	if (!el) {
		return;
	}

	if (!el.youtube) {
		setupYoutubePlayer(el);

		return;
	}

	el.youtube.playVideo();
}

export function destroyPlayer(el) {
	if (el.youtube) {
		const playerEl = el.querySelector('[data-youtube-container]');

		playerEl.parentNode.removeChild(playerEl);
		el.youtube.destroy();
		el.youtube = null;
	}

	el.getElementsByTagName('img')[0].style.zIndex = null;
	el.getElementsByTagName('button')[0].style.display = null;
}

export function setupPlayers(container) {
	const players = container.querySelectorAll('[data-youtube]');

	if (!players.length) {
		return;
	}

	[].forEach.call(players, createCover);
}

window.onYouTubeIframeAPIReady = () => {
	setupPlayers(document);
	document.body.addEventListener('click', delegateClick);
};

loadYoutubeAPI();
