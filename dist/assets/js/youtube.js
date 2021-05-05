'use strict';

function loadYoutubeAPI() {
	var tag = document.createElement('script');
	var firstScript = document.getElementsByTagName('script')[0];

	tag.src = 'https://www.youtube.com/iframe_api';

	firstScript.parentNode.insertBefore(tag, firstScript);
}

function onPlayerReady(el, e) {
	el.addEventListener('click', function () {
		e.target.playVideo();
	});
}

function onPlayerStateChange(el, e) {
	if (e.data === YT.PlayerState.PLAYING) {
		el.getElementsByTagName('img')[0].style.zIndex = '-1';
		el.getElementsByTagName('svg')[0].style.display = 'none';
	}
}

function createCover(el, id) {
	var url = 'https://i3.ytimg.com/vi/' + id + '/maxresdefault.jpg';
	var img = document.createElement('img');

	el.appendChild(img);

	img.src = url;
}

function setupYoutubePlayer(el) {
	var playerEl = document.createElement('div');
	var id = el.getAttribute('data-youtube');

	if (!el.getElementsByTagName('img').length) {
		createCover(el, id);
	}

	el.appendChild(playerEl);

	var player = new YT.Player(playerEl, {
		height: '100%',
		width: '100%',
		videoId: id,
		playerVars: {
			playsinline: 1
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

	el.youtube = player;
}

window.onYouTubeIframeAPIReady = function () {
	var players = document.querySelectorAll('[data-youtube]');

	if (!players.length) {
		return;
	}

	[].forEach.call(players, setupYoutubePlayer);
};

loadYoutubeAPI();