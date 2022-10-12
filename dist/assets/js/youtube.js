'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setupPlayers = setupPlayers;
function loadYoutubeAPI() {
	var id = 'iisYoutubeAPI';

	if (document.getElementById(id)) {
		return;
	}

	var tag = document.createElement('script');
	var firstScript = document.getElementsByTagName('script')[0];

	tag.id = id;
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

function createCover(el) {
	if (el.getElementsByTagName('img').length) {
		return;
	}

	var id = el.getAttribute('data-youtube');
	var url = 'https://i3.ytimg.com/vi/' + id + '/maxresdefault.jpg';
	var img = document.createElement('img');

	el.appendChild(img);

	img.loading = 'lazy';
	img.src = url;
}

function setupYoutubePlayer(el) {
	var playerEl = void 0;
	var id = el.getAttribute('data-youtube');

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
			rel: 0
		},
		events: {
			onReady: function onReady(e) {
				return onPlayerReady(el, e);
			},
			onStateChange: function onStateChange(e) {
				return onPlayerStateChange(el, e);
			}
		}
	});

	el.getElementsByTagName('img')[0].style.zIndex = '-1';
	el.getElementsByTagName('button')[0].style.display = 'none';
}

function delegateClick(e) {
	var el = e.target.closest('[data-youtube]');

	if (!el) {
		return;
	}

	if (!el.youtube) {
		setupYoutubePlayer(el);

		return;
	}

	el.youtube.playVideo();
}

// eslint-disable-next-line import/prefer-default-export
function setupPlayers(container) {
	var players = container.querySelectorAll('[data-youtube]');

	if (!players.length) {
		return;
	}

	[].forEach.call(players, createCover);
}

window.onYouTubeIframeAPIReady = function () {
	setupPlayers(document);
	document.body.addEventListener('click', delegateClick);
};

loadYoutubeAPI();