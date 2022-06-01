function loadYoutubeAPI() {
	const tag = document.createElement('script');
	const firstScript = document.getElementsByTagName('script')[0];

	tag.src = 'https://www.youtube.com/iframe_api';

	firstScript.parentNode.insertBefore(tag, firstScript);
}

function onPlayerReady(el) {
	el.setAttribute('data-youtube-ready', 'true');
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

function createCover(el, id) {
	const url = `https://i3.ytimg.com/vi/${id}/maxresdefault.jpg`;
	const img = document.createElement('img');

	el.appendChild(img);

	img.src = url;
}

function setupYoutubePlayer(el) {
	let playerEl;
	const id = el.getAttribute('data-youtube');

	if (el.youtube) {
		playerEl = el.querySelector('[data-youtube-container]');

		playerEl.parentNode.removeChild(playerEl);
		el.youtube.destroy();
		el.youtube = null;
		el.removeAttribute('data-youtube-ready');
		el.getElementsByTagName('img')[0].style.zIndex = null;
		el.getElementsByTagName('button')[0].style.display = null;
	}

	playerEl = document.createElement('div');

	if (!el.getElementsByTagName('img').length) {
		createCover(el, id);
	}

	playerEl.setAttribute('data-youtube-container', true);
	el.appendChild(playerEl);

	el.youtube = new YT.Player(playerEl, {
		height: '100%',
		width: '100%',
		videoId: id,
		playerVars: {
			// https://developers.google.com/youtube/player_parameters#Parameters
			playsinline: 1,
			rel: 0,
		},
		events: {
			onReady: (e) => onPlayerReady(el, e),
			onStateChange: (e) => onPlayerStateChange(el, e),
		},
	});
}

function delegateClick(e) {
	const el = e.target.closest('[data-youtube]');

	if (!el || !el.youtube) {
		return;
	}

	el.youtube.playVideo();
}

// eslint-disable-next-line import/prefer-default-export
export function setupPlayers(container) {
	const players = container.querySelectorAll('[data-youtube]');

	if (!players.length) {
		return;
	}

	[].forEach.call(players, setupYoutubePlayer);
}

window.onYouTubeIframeAPIReady = () => {
	setupPlayers(document);

	document.body.addEventListener('click', delegateClick);
};

loadYoutubeAPI();
