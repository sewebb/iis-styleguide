'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setupPlayers = setupPlayers;
function loadYoutubeAPI() {
	var tag = document.createElement('script');
	var firstScript = document.getElementsByTagName('script')[0];

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
	var url = 'https://i3.ytimg.com/vi/' + id + '/maxresdefault.jpg';
	var img = document.createElement('img');

	el.appendChild(img);

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
<<<<<<< HEAD
=======
		el.getElementsByTagName('img')[0].style.zIndex = null;
		el.getElementsByTagName('button')[0].style.display = null;
>>>>>>> feature/open-timelineitem
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
}

function delegateClick(e) {
	var el = e.target.closest('[data-youtube]');

	if (!el || !el.youtube) {
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

	[].forEach.call(players, setupYoutubePlayer);
}

window.onYouTubeIframeAPIReady = function () {
	setupPlayers(document);

	document.body.addEventListener('click', delegateClick);
};

loadYoutubeAPI();