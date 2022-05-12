const video = document.querySelector('.js-video-guide');
const playBtn = document.querySelector('.js-play-btn');
const playIcon = document.querySelector('.js-play-icon');
const pauseIcon = document.querySelector('.js-pause-icon');
const subtitlesBtn = document.querySelector('.js-subtitles-btn');
const abortButton = document.querySelector('.js-abort-guide');
const subtitlesElement = document.getElementById('video-subtitles');
const subtitlesContainer = document.querySelector('.js-subtitles-container');
const locationList = document.querySelector('.js-chapters');
const chapterTrackElement = document.getElementById('video-chapters');
const trackMetadataElement = document.getElementById('video-metadata');
const subtitlesTrack = (subtitlesElement === null) ? '' : subtitlesElement.track;
const chapterTrack = (chapterTrackElement === null) ? '' : chapterTrackElement.track;
const metadataTrack = (trackMetadataElement === null) ? '' : trackMetadataElement.track;
const forwardsButton = document.querySelector('.js-next-chapter');
const backwardsButton = document.querySelector('.js-previous-chapter');
const timelinePosts = document.querySelectorAll('.js-timeline-post');
let currentChapter = 1;
let manualStep = false;
let sourceElement = null;

// Has src attributes been set already?
if (sourceElement) {
	document.location.reload();
} else if (video) {
	const dataSrc = video.dataset.src;

	sourceElement = document.createElement('source');
	sourceElement.setAttribute('src', dataSrc);
	sourceElement.setAttribute('type', 'video/mp4');

	video.appendChild(sourceElement);

	// Store current time in on page reload
	window.addEventListener('unload', () => {
		// Set localStorage if video has started playing
		if (video.currentTime > 0) {
			const currentGuideURL = window.location.href;
			const currentGuideImage = document.querySelector('.js-guide-continue-image').src;
			localStorage.setItem('InmsCurrentTime', video.currentTime);
			localStorage.setItem('InmsDuration', video.duration); // Get totalt duration of video
			localStorage.setItem('InmsCurrentGuideURL', currentGuideURL);
			localStorage.setItem('InmsCurrentGuideImage', currentGuideImage);
		}
	});

	// Get value from localStorage in present
	if (localStorage.getItem('InmsCurrentTime')) {
		const videoCurrentTime = localStorage.getItem('InmsCurrentTime');

		if (videoCurrentTime > 0) {
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
			manualStep = false;
		});

		video.addEventListener('ended', () => {
			pauseIcon.classList.add('is-hidden');
			playIcon.classList.remove('is-hidden');
			video.currentTime = 0;
			currentChapter = 1;
			manualStep = false;
			forwardsButton.removeAttribute('disabled');
			subtitlesContainer.innerHTML = '';
			localStorage.removeItem('InmsCurrentTime');
			localStorage.removeItem('InmsDuration');
			localStorage.removeItem('InmsCurrentGuideURL');
			localStorage.removeItem('InmsCurrentGuideImage');
		});
	}

	if (abortButton) {
		abortButton.addEventListener('click', (e) => {
			e.preventDefault();
			const urlTarget = abortButton.getAttribute('href');
			video.pause();
			video.currentTime = 0;
			forwardsButton.removeAttribute('disabled');
			currentChapter = 1;
			manualStep = false;
			localStorage.removeItem('InmsCurrentTime');
			localStorage.removeItem('InmsDuration');
			localStorage.removeItem('InmsCurrentGuideURL');
			localStorage.removeItem('InmsCurrentGuideImage');
			window.location.href = urlTarget;
		});
	}
}

function displayChapters() {
	if (chapterTrackElement && trackMetadataElement) {
		// Set all track elements to hidden mode to allow scripting
		[].forEach.call(video.textTracks, (txtTrack) => {
			txtTrack.mode = 'hidden';
		});

		if (chapterTrack.kind === 'chapters') {
			video.addEventListener('loadedmetadata', () => {
				// Loop through chapters and create chapter list
				// Let data load
				setTimeout(() => {
					video.classList.remove('is-loading');
					[].forEach.call(chapterTrack.cues, (cues) => {
						const chapterName = cues.text;
						const start = cues.startTime;
						const newLocale = document.createElement('li');
						const location = document.createElement('a');

						location.setAttribute('rel', start);
						newLocale.setAttribute('id', start);
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

					// If not set in sessionStorgare, set first cue on forward button on page load
					if (!localStorage.getItem('InmsCurrentTime')) {
						forwardsButton.setAttribute('data-id', chapterTrack.cues[0].endTime);
					}
				}, 100);
			});

			forwardsButton.addEventListener('click', () => {
				const dataId = forwardsButton.dataset.id;
				let currentTime = parseInt(dataId, 10);
				manualStep = true;
				currentTime += 1;
				video.currentTime = currentTime;
				currentChapter += 1;
			});

			backwardsButton.addEventListener('click', () => {
				const dataId = backwardsButton.dataset.id;
				let lastTime = parseInt(dataId, 10);
				lastTime -= 1;
				video.currentTime = lastTime;
				forwardsButton.removeAttribute('disabled');
				manualStep = true;
				currentChapter -= 1;

				if (video.currentTime <= 0) {
					backwardsButton.removeAttribute('data-id');
				}
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
					if (currentChapter >= chapterTrack.cues.length) {
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
				const chapterCues = chapterTrack.activeCues[0];

				if (metadataCues.length > 0) {
					const metadataCueMatch = metadataTrack.activeCues[0].text;

					[].forEach.call(timelinePosts, (timelinePost) => {
						timelinePost.classList.remove('is-current');
					});

					const idSelectors = document.querySelectorAll(`[data-id="${metadataCueMatch}"]`);

					[].forEach.call(idSelectors, (idSelector) => {
						idSelector.classList.add('is-current');
						idSelector.focus();
					});

					if (chapterCues) {
						const chapterStartTime = chapterCues.startTime;

						// Let stuff load
						let listElement;
						let timeOut = null;

						setTimeout(() => { listElement = document.getElementById(chapterStartTime); }, 100);

						timeOut = function wait(condition, callback) {
							if (typeof condition() !== 'undefined' && listElement) {
								listElement.classList.add('is-current-item');
							} else {
								setTimeout(() => {
									wait(condition, callback);
								}, 0);
							}
						};
						timeOut(() => listElement, () => { });
					}
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
