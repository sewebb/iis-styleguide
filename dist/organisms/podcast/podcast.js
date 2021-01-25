'use strict';

var namespaceElement = document.querySelector('#site');
var namespace = void 0;
var podCast = document.querySelector('.js-podcast');
var audio = document.getElementById('podcastPlayer');
var jsTrackList = document.querySelector('.js-track-list');
var title = document.querySelector('.js-title');
var description = document.querySelector('.js-description');
var image = document.querySelector('.js-image');
var progress = document.querySelector('.js-progress');
var durationElement = document.querySelector('.js-duration');
var timeleftElement = document.querySelector('.js-timeleft');
var stepForward = document.querySelector('.js-step-forward');
var stepBackward = document.querySelector('.js-step-backward');
var playButton = document.querySelector('.js-play-button');
var playIcon = document.querySelector('.js-play-icon');
var pauseIcon = document.querySelector('.js-pause-icon');

var rssURL = 'https://internetpodden.libsyn.com/rss';

if (!namespaceElement) {
	namespace = '';
} else {
	namespace = namespaceElement.dataset.namespace;
}

function timeupdate() {
	audio.addEventListener('timeupdate', function () {
		var timeleft = timeleftElement;
		var duration = parseInt(audio.duration, 10);
		var currentTime = parseInt(audio.currentTime, 10);
		var timeLeft = duration - currentTime;
		var s = void 0;var m = void 0;

		s = timeLeft % 60;
		m = Math.floor(timeLeft / 60) % 60;

		s = s < 10 ? '0' + s : s;
		m = m < 10 ? '0' + m : m;

		if (timeLeft > 0) {
			timeleftElement.classList.remove('u-visibility-hidden');
			timeleft.innerHTML = m + ':' + s;
		}
	}, false);
}

fetch(rssURL).then(function (response) {
	return response.text();
}).then(function (str) {
	return new window.DOMParser().parseFromString(str, 'text/xml');
}).then(function (data) {
	var items = data.querySelectorAll('item');
	var html = '';

	function getItems(el) {
		html += '\n\t\t\t<li>\n\t\t\t\t<button\n\t\t\t\t\tclass="' + namespace + 'o-podcast__button display-flex js-play-episode"\n\t\t\t\t\tdata-src="' + el.querySelector('enclosure').getAttribute('url') + '"\n\t\t\t\t\tdata-title="' + el.querySelector('title').innerHTML + '"\n\t\t\t\t\tdata-description="' + el.querySelector('description').innerHTML.replace(/(<([^>]+)>)/gi, '').replace('<![CDATA[', '').replace(']]>', '') + '"\n\t\t\t\t\tdata-image="' + el.querySelector('image').getAttribute('href') + '"\n\t\t\t\t\tdata-duration="' + el.querySelector('duration').innerHTML + '"\n\t\t\t\t\ttype="button"><svg class="icon ' + namespace + 'o-podcast__play-icon u-m-r-2"><use xlink:href="#icon-play"></use></svg></div><div class="u-align-left"></button>\n\t\t\t\t<div class="' + namespace + 'o-podcast__show-info">\n\t\t\t\t\t<div class="' + namespace + 'o-podcast__title">' + el.querySelector('title').innerHTML + '</div>\n\t\t\t\t\t<div class="' + namespace + 'o-podcast__description">' + el.querySelector('description').innerHTML + '</div>\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t';

		if (jsTrackList) {
			jsTrackList.innerHTML = html;
		}

		var playEpisodes = document.querySelectorAll('.js-play-episode');

		[].forEach.call(playEpisodes, function (playEpisode) {
			playEpisode.addEventListener('click', function () {
				audio.src = playEpisode.dataset.src;
				durationElement.innerHTML = playEpisode.dataset.duration;
				title.innerHTML = playEpisode.dataset.title;
				description.innerHTML = playEpisode.dataset.description;
				image.src = playEpisode.dataset.image;
				podCast.classList.remove(namespace + 'o-podcast--hidden');
				timeleftElement.classList.add('u-visibility-hidden');

				if (audio.play) {
					audio.pause();
					pauseIcon.classList.remove('is-hidden');
					playIcon.classList.add('is-hidden');

					audio.currentTime = 0;
				}

				audio.play();
				timeupdate();

				setTimeout(function () {
					timeleftElement.classList.remove('u-visibility-hidden');
				}, 1000);
			});
		});
	}

	items.forEach(getItems);
});

if (playButton) {
	playButton.addEventListener('click', function () {
		if (audio.paused) {
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
	audio.onended = function () {
		pauseIcon.classList.add('is-hidden');
		playIcon.classList.remove('is-hidden');
		timeleftElement.classList.add('u-visibility-hidden');
	};

	audio.ontimeupdate = function () {
		var timer = audio.currentTime / audio.duration * 100 + '%';
		progress.style.width = timer;
	};
}

if (stepForward) {
	stepForward.addEventListener('click', function () {
		audio.currentTime += 60;
		timeupdate();
	});
}

if (stepBackward) {
	stepBackward.addEventListener('click', function () {
		audio.currentTime -= 15;
		timeupdate();
	});
}