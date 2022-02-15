const video = document.querySelector('video');
const playBtn = document.querySelector('.js-play-btn');
const playIcon = document.querySelector('.js-play-icon');
const pauseIcon = document.querySelector('.js-pause-icon');
const subtitlesBtn = document.querySelector('.js-subtitles-btn');
const abortButton = document.querySelector('.js-abort-guide');
const subtitlesElement = document.getElementById('video-subtitles');
const subtitlesTrack = subtitlesElement.track;
const subtitlesContainer = document.querySelector('.js-subtitles-container');
const locationList = document.querySelector('.js-chapters');
const chapterTrackElement = document.getElementById('video-chapters');
const trackMetadataElement = document.getElementById('video-metadata');
const chapterTrack = chapterTrackElement.track;
const metadataTrack = trackMetadataElement.track;
const forwardsButton = document.querySelector('.js-next-chapter');
const backwardsButton = document.querySelector('.js-previous-chapter');
const timelinePosts = document.querySelectorAll('.js-timeline-post');
let currentChapter = 1;
let manualStep = false;
let sourceElement = null;

// Has src attributes been set already?
if (sourceElement) {
	document.location.reload();
} else {
	const dataSrc = video.dataset.src;

	sourceElement = document.createElement('source');
	sourceElement.setAttribute('src', dataSrc);
	sourceElement.setAttribute('type', 'video/mp4');

	video.appendChild(sourceElement);

	// Set all track elements to hidden mode to allow scripting
	[].forEach.call(video.textTracks, (txtTrack) => {
		txtTrack.mode = 'hidden';
	});

	// Store current time in on page reload
	window.addEventListener('unload', () => {
		sessionStorage.setItem('InmsCurrentTime', video.currentTime -= 1); // Minus 1 to make sure cuechange doesn't end up in next chapter
	});

	// Get value from sessionStorage in present
	if (sessionStorage.getItem('InmsCurrentTime')) {
		const videoCurrentTime = sessionStorage.getItem('InmsCurrentTime');

		if (videoCurrentTime) {
			video.currentTime = videoCurrentTime;
		}
	}

	// Toggle subtitles
	if (subtitlesBtn) {
		subtitlesBtn.addEventListener('click', () => {
			subtitlesBtn.classList.toggle('is-active');
			subtitlesContainer.classList.toggle('is-visible');
		});
	}

	// Play / pause
	if (playBtn) {
		playBtn.addEventListener('click', () => {
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

		video.addEventListener('playing', () => {
			pauseIcon.classList.remove('is-hidden');
			playIcon.classList.add('is-hidden');
		});

		video.addEventListener('ended', () => {
			pauseIcon.classList.add('is-hidden');
			playIcon.classList.remove('is-hidden');
			video.currentTime = 0;
			currentChapter = 1;
			manualStep = false;
			forwardsButton.removeAttribute('disabled');
			subtitlesContainer.innerHTML = '';
		});
	}

	if (abortButton) {
		abortButton.addEventListener('click', () => {
			sessionStorage.removeItem('InmsCurrentTime');
			video.currentTime = 0;
			forwardsButton.removeAttribute('disabled');
			currentChapter = 1;
			manualStep = false;
		});
	}
}

function displayChapters() {
	if (chapterTrackElement && trackMetadataElement) {
		if (chapterTrack.kind === 'chapters') {
			video.addEventListener('loadedmetadata', () => {
				// Start by triggering a cue change
				video.currentTime += 1;

				// Loop through chapters and create chapter list
				[].forEach.call(chapterTrack.cues, (cues) => {
					const chapterName = cues.text;
					const start = cues.startTime;
					const newLocale = document.createElement('li');
					const location = document.createElement('a');

					location.setAttribute('rel', start);
					location.setAttribute('id', start);
					location.setAttribute('tabindex', '0');

					// Plain text from the chapter file into HTML text
					const localeDescription = chapterName;
					location.innerHTML = localeDescription;
					newLocale.appendChild(location);
					locationList.appendChild(newLocale);

					location.addEventListener('click', () => {
						video.currentTime = location.id;
					}, false);
				});

				forwardsButton.setAttribute('data-id', chapterTrack.cues[0].endTime);

				forwardsButton.addEventListener('click', () => {
					const dataId = forwardsButton.dataset.id;
					document.getElementById(dataId).click();
					manualStep = true;
					currentChapter += 1;
					video.currentTime += 1;
				});

				backwardsButton.addEventListener('click', () => {
					const dataId = backwardsButton.dataset.id;
					video.currentTime = dataId;
					forwardsButton.removeAttribute('disabled');
					manualStep = true;
					currentChapter -= 1;
					video.pause();
				});
			});

			chapterTrack.addEventListener('cuechange', () => {
				// Fire this whenever the chapters changes
				const myCues = chapterTrack.activeCues;
				if (myCues.length > 0) {
					const currentLocation = chapterTrack.activeCues[0].startTime;
					const nextLocation = chapterTrack.activeCues[0].endTime;
					const cueMatch = chapterTrack.activeCues[0].text;
					const matchingCueArray = document.querySelectorAll(`[rel="${currentLocation}"]`);

					// Set Forward and backwards buttons timestamps
					forwardsButton.setAttribute('data-id', nextLocation);
					backwardsButton.setAttribute('data-id', currentLocation);

					// Add chapter stepping even when video is played
					if (manualStep === false) {
						currentChapter += 1;
					}

					// Disable forwardsbutton when on last chapter
					if (currentChapter > chapterTrack.cues.length) {
						forwardsButton.setAttribute('disabled', 'disabled');
					}

					// Handle current and watched items
					[].forEach.call(matchingCueArray, (matchingCue) => {
						const thisChapter = matchingCue;
						if (thisChapter.innerHTML === cueMatch) {
							const chapter = thisChapter;

							if (chapter === thisChapter) {
								// get the chapter <li> elements based on the currentLocation
								const locations = [].slice.call(chapter.closest('figure')
									.querySelectorAll('.js-chapters li'));

								let counter = 0;

								[].forEach.call(locations, (location) => {
									// remove current classes from all items on page refresh
									location.classList.remove('is-current-item');
									location.querySelector('a').classList.remove('is-current');

									if (location.classList.contains('is-current-item')) {
										counter += 1; // iterate counter when active chapter is reached
									}
									if (counter < 1) {
										// add watched class to everything before the current chapter to show progress
										location.classList.add('is-watched');
									} else {
										// remove watched on all other items
										location.classList.remove('is-watched');
									}
								});

								chapter.parentNode.classList.add('is-current-item');
								chapter.classList.add('is-current');
							}
						}
					});
				}
			}, false);

			// Get timeline post IDs from metadata.vtt
			metadataTrack.addEventListener('cuechange', () => {
				const metadataCues = metadataTrack.activeCues;

				if (metadataCues.length > 0) {
					const metadataCueMatch = metadataTrack.activeCues[0].text;

					[].forEach.call(timelinePosts, (timelinePost) => {
						timelinePost.classList.remove('is-current');
					});

					document.querySelector(`[data-id="${metadataCueMatch}"]`).classList.add('is-current');
				}
			}, false);

			// Get subtitles cues from subtitles.vtt
			subtitlesTrack.addEventListener('cuechange', () => {
				const subtitlesCues = subtitlesTrack.activeCues;

				if (subtitlesCues.length > 0) {
					const subtitlesCuesMatch = subtitlesTrack.activeCues[0].text;
					subtitlesContainer.innerHTML = `<span>${subtitlesCuesMatch}</span>`;
				}
			}, false);
		}
	}
}

displayChapters(chapterTrackElement);
