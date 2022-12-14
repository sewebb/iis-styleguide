'use strict';

var video = document.querySelector('.js-video-guide');
var playBtn = document.querySelector('.js-play-btn');
var playIcon = document.querySelector('.js-play-icon');
var pauseIcon = document.querySelector('.js-pause-icon');
var subtitlesBtn = document.querySelector('.js-subtitles-btn');
var abortButton = document.querySelector('.js-abort-guide');
var subtitlesElement = document.getElementById('video-subtitles');
var subtitlesContainer = document.querySelector('.js-subtitles-container');
var chapterTrackElement = document.getElementById('video-chapters');
var trackMetadataElement = document.getElementById('video-metadata');
var subtitlesTrack = subtitlesElement === null ? '' : subtitlesElement.track;
var chapterTrack = chapterTrackElement === null ? '' : chapterTrackElement.track;
var metadataTrack = trackMetadataElement === null ? '' : trackMetadataElement.track;
var forwardsButton = document.querySelector('.js-next-chapter');
var backwardsButton = document.querySelector('.js-previous-chapter');
var timelinePosts = document.querySelectorAll('.js-timeline-post');
var navigationButton = document.querySelector('.js-show-timelineposts');
var timeLinePosts = document.querySelector('.js-timeline-posts');
var currentChapter = 0;
var manualStep = false;

// Has src attributes been set already?
if (video) {
	// Store current time in on page reload
	window.addEventListener('beforeunload', function () {
		// Set sessionStorage if video has started playing
		if (video.currentTime > 0) {
			var currentGuideURL = window.location.href;
			var currentGuideImage = video.dataset.featuredImage;
			sessionStorage.setItem('InmsCurrentTime', video.currentTime);
			sessionStorage.setItem('InmsDuration', video.duration); // Get totalt duration of video
			sessionStorage.setItem('InmsCurrentGuideURL', currentGuideURL);
			sessionStorage.setItem('InmsCurrentGuideImage', currentGuideImage);
		}
	});

	// Get value from sessionStorage in present
	if (sessionStorage.getItem('InmsCurrentTime')) {
		var videoCurrentTime = sessionStorage.getItem('InmsCurrentTime');

		if (videoCurrentTime > 0) {
			video.currentTime = videoCurrentTime;
		}
	}

	// Toggle subtitles
	if (subtitlesBtn) {
		subtitlesBtn.addEventListener('click', function () {
			subtitlesBtn.classList.toggle('is-active');
			subtitlesContainer.classList.toggle('is-visible');
		});
	}

	// Play / pause
	if (playBtn) {
		playBtn.addEventListener('click', function () {
			if (video.paused) {
				video.play();
				pauseIcon.classList.remove('is-hidden');
				playIcon.classList.add('is-hidden');
				manualStep = false;
			} else {
				video.pause();
				pauseIcon.classList.add('is-hidden');
				playIcon.classList.remove('is-hidden');
				manualStep = true;
			}
		});

		video.addEventListener('playing', function () {
			pauseIcon.classList.remove('is-hidden');
			playIcon.classList.add('is-hidden');
			manualStep = false;
		});

		video.addEventListener('ended', function () {
			pauseIcon.classList.add('is-hidden');
			playIcon.classList.remove('is-hidden');
			video.currentTime = 0;
			currentChapter = 1;
			manualStep = false;
			forwardsButton.removeAttribute('disabled');
			subtitlesContainer.innerHTML = '';
			sessionStorage.removeItem('InmsCurrentTime');
			sessionStorage.removeItem('InmsDuration');
			sessionStorage.removeItem('InmsCurrentGuideURL');
			sessionStorage.removeItem('InmsCurrentGuideImage');
		});
	}

	if (abortButton) {
		abortButton.addEventListener('click', function (e) {
			e.preventDefault();
			var urlTarget = abortButton.getAttribute('href');
			video.pause();
			video.currentTime = 0;
			forwardsButton.removeAttribute('disabled');
			currentChapter = 1;
			manualStep = false;
			sessionStorage.removeItem('InmsCurrentTime');
			sessionStorage.removeItem('InmsDuration');
			sessionStorage.removeItem('InmsCurrentGuideURL');
			sessionStorage.removeItem('InmsCurrentGuideImage');
			window.location.href = urlTarget;
		});
	}

	if (navigationButton) {
		navigationButton.addEventListener('click', function () {
			navigationButton.classList.toggle('is-toggeled');
			timeLinePosts.classList.toggle('is-visible');
		});
	}
}

function displayChapters() {
	if (chapterTrackElement && trackMetadataElement) {
		// Set all track elements to hidden mode to allow scripting
		[].forEach.call(video.textTracks, function (txtTrack) {
			txtTrack.mode = 'hidden';
		});

		if (chapterTrack.kind === 'chapters') {
			video.addEventListener('loadedmetadata', function () {
				// Loop through chapters and create chapter list
				// Let data load
				setTimeout(function () {
					video.classList.remove('is-loading');

					// If not set in sessionStorgare, set first cue on forward button on page load
					if (!sessionStorage.getItem('InmsCurrentTime')) {
						forwardsButton.setAttribute('data-id', chapterTrack.cues[0].endTime);
					}
				}, 100);
			});

			forwardsButton.addEventListener('click', function () {
				var dataId = forwardsButton.dataset.id;
				var currentTime = parseInt(dataId, 10);
				manualStep = true;
				currentTime += 1;
				video.currentTime = currentTime;
				currentChapter += 1;
			});

			backwardsButton.addEventListener('click', function () {
				var dataId = backwardsButton.dataset.id;
				var lastTime = parseInt(dataId, 10);
				lastTime -= 1;
				video.currentTime = lastTime;
				forwardsButton.removeAttribute('disabled');
				manualStep = true;
				currentChapter -= 1;

				if (video.currentTime <= 0) {
					backwardsButton.removeAttribute('data-id');
				}
			});

			chapterTrack.addEventListener('cuechange', function () {
				// Fire this whenever the chapters changes
				var myCues = chapterTrack.activeCues;
				if (myCues.length > 0) {
					var currentLocation = chapterTrack.activeCues[0].startTime;
					var nextLocation = chapterTrack.activeCues[0].endTime;
					var cueMatch = chapterTrack.activeCues[0].text;
					var matchingCueArray = document.querySelectorAll('[rel="' + currentLocation + '"]');

					// Set Forward and backwards buttons timestamps
					forwardsButton.setAttribute('data-id', nextLocation);
					backwardsButton.setAttribute('data-id', currentLocation);

					// Add chapter stepping even when video is played
					if (manualStep === false) {
						currentChapter += 1;
					}

					// Disable forwardsbutton when on last chapter
					if (currentChapter >= chapterTrack.cues.length) {
						forwardsButton.setAttribute('disabled', 'disabled');
					}

					// Handle current and watched items
					[].forEach.call(matchingCueArray, function (matchingCue) {
						var thisChapter = matchingCue;
						if (thisChapter.innerHTML === cueMatch) {
							var chapter = thisChapter;

							if (chapter === thisChapter) {
								// get the chapter <li> elements based on the currentLocation
								var locations = [].slice.call(chapter.closest('figure').querySelectorAll('.js-chapters li'));

								[].forEach.call(locations, function (location) {
									// remove current classes from all items on page refresh
									location.classList.remove('is-current-item');
									location.querySelector('a').classList.remove('is-current');
								});
								chapter.parentNode.classList.add('is-current-item');
								chapter.classList.add('is-current');
							}
						}
					});
				}
			}, false);

			// Get timeline post IDs from metadata.vtt
			metadataTrack.addEventListener('cuechange', function () {
				var metadataCues = metadataTrack.activeCues;
				var chapterCues = chapterTrack.activeCues[0];

				if (metadataCues.length > 0) {
					var metadataCueMatch = metadataTrack.activeCues[0].text;

					[].forEach.call(timelinePosts, function (timelinePost) {
						timelinePost.classList.remove('is-current');
					});

					var idSelectors = document.querySelectorAll('[data-id="' + metadataCueMatch + '"]');

					[].forEach.call(idSelectors, function (idSelector) {
						idSelector.classList.add('is-current');
					});

					if (chapterCues) {
						var chapterStartTime = chapterCues.startTime;

						// Let stuff load
						var listElement = void 0;
						var timeOut = null;

						setTimeout(function () {
							listElement = document.getElementById(chapterStartTime);
						}, 100);

						timeOut = function wait(condition, callback) {
							if (typeof condition() !== 'undefined' && listElement) {
								listElement.classList.add('is-current-item');
							} else {
								setTimeout(function () {
									wait(condition, callback);
								}, 0);
							}
						};
						timeOut(function () {
							return listElement;
						}, function () {});
					}
				}
			}, false);

			// Get subtitles cues from subtitles.vtt
			subtitlesTrack.addEventListener('cuechange', function () {
				var subtitlesCues = subtitlesTrack.activeCues;

				if (subtitlesCues.length > 0) {
					var subtitlesCuesMatch = subtitlesTrack.activeCues[0].text;
					subtitlesContainer.innerHTML = '<span>' + subtitlesCuesMatch + '</span>';
				}
			}, false);
		}
	}
}

displayChapters(chapterTrackElement);