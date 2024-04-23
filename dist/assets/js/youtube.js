'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.destroyPlayer = destroyPlayer;
exports.setupPlayers = setupPlayers;

var _className = require('./className');

var _className2 = _interopRequireDefault(_className);

var _hasCookieConsent = require('./hasCookieConsent');

var _hasCookieConsent2 = _interopRequireDefault(_hasCookieConsent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: Should probably implement a way to localize texts in the styleguide
var consent = (0, _hasCookieConsent2.default)('C0004');
var missingConsentMessage = 'För att spela Youtubefilmer krävs att "Riktade kakor" tillåts. Tryck för att "Anpassa kakor"';

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

	var div = document.createElement('div');
	var button = document.createElement('button');
	var message = document.createElement('p');
	message.classList.add('color-cyberspace');

	div.setAttribute('data-youtube-consent-warning', true);
	div.className = (0, _className2.default)('m-icon-overlay__message');
	button.className = (0, _className2.default)('a-button');
	button.setAttribute('data-ot-dynamic-show-settings', 'true');
	button.innerHTML = '<span class="' + (0, _className2.default)('a-button__text') + '">Anpassa kakor</span>';
	message.innerHTML = missingConsentMessage;

	div.appendChild(message);
	div.appendChild(button);

	el.appendChild(div);
}

function destroyConsentWarning(el) {
	var div = el.querySelector('[data-youtube-consent-warning]');

	if (div) {
		div.parentNode.removeChild(div);
	}
}

function createCover(el) {
	if (!consent) {
		createConsentWarning(el);
	} else {
		destroyConsentWarning(el);
	}

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
	if (el.youtube) {
		return;
	}

	var id = el.getAttribute('data-youtube');
	var playerEl = document.createElement('div');

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
			onStateChange: function onStateChange(e) {
				return onPlayerStateChange(el, e);
			}
		}
	});

	el.getElementsByTagName('img')[0].style.zIndex = '-1';
	el.getElementsByTagName('button')[0].style.display = 'none';
}

function delegateClick(e) {
	if (e.target.closest('[data-youtube-consent-warning]')) {
		return;
	}

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

function destroyPlayer(el) {
	if (el.youtube) {
		var playerEl = el.querySelector('[data-youtube-container]');

		playerEl.parentNode.removeChild(playerEl);
		el.youtube.destroy();
		el.youtube = null;
	}

	el.getElementsByTagName('img')[0].style.zIndex = null;
	el.getElementsByTagName('button')[0].style.display = null;
}

function setupPlayers(container) {
	var players = container.querySelectorAll('[data-youtube]');

	if (!players.length) {
		return;
	}

	[].forEach.call(players, createCover);
}

window.onYouTubeIframeAPIReady = function () {
	document.body.addEventListener('click', delegateClick);
};

setupPlayers(document);
loadYoutubeAPI();

window.addEventListener('consent.onetrust', function (e) {
	consent = e.detail.includes('C0004');

	setupPlayers(document);
	loadYoutubeAPI();
});