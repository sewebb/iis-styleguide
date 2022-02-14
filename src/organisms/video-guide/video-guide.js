const video = document.querySelector('video');
const playBtn = document.querySelector('.js-play-btn');
const playIcon = document.querySelector('.js-play-icon');
const pauseIcon = document.querySelector('.js-pause-icon');
const subtitlesBtn = document.querySelector('.js-subtitles-btn');
const subtitlesElement = document.getElementById('video-subtitles');
const subtitlesTrack = subtitlesElement.track;
const subtitlesContainer = document.querySelector('.js-subtitles-container');
const trackElement = document.getElementById('video-chapters');
const trackMetadataElement = document.getElementById('video-metadata');
const textTrack = trackElement.track;
const metadataTrack = trackMetadataElement.track;
const forwardsButton = document.querySelector('.js-next-chapter');
const backwardsButton = document.querySelector('.js-previous-chapter');
const timelinePosts = document.querySelectorAll('.js-timeline-post');
let currentChapter = 1;
let manualStep = false;

const eventLog = document.querySelector('.event-log-contents');
const clearButton = document.querySelector('.clear');
let sourceElement = null;

function handleEvent(event) {
	eventLog.textContent = `${eventLog.textContent}${event.type}\n`;
}

video.addEventListener('loadstart', handleEvent);
video.addEventListener('canplay', handleEvent);
video.addEventListener('canplaythrough', handleEvent);
video.addEventListener('play', handleEvent);
video.addEventListener('pause', handleEvent);
video.addEventListener('progress', handleEvent);

if (sourceElement) {
	document.location.reload();
} else {
	const dataSrc = video.dataset.src;

	sourceElement = document.createElement('source');
	sourceElement.setAttribute('src', dataSrc);
	sourceElement.setAttribute('type', 'video/mp4');

	video.appendChild(sourceElement);

	// Hide all track elements
	for (let i = 0; i < video.textTracks.length; i += 1) {
		video.textTracks[i].mode = 'hidden';
	}

	window.addEventListener('unload', () => {
		sessionStorage.setItem('InmsCurrentTime', video.currentTime);
	});

	if (sessionStorage.getItem('InmsCurrentTime')) {
		const videoCurrentTime = sessionStorage.getItem('InmsCurrentTime');

		if (videoCurrentTime) {
			// console.log('videoCurrentTime', videoCurrentTime);
			video.currentTime = videoCurrentTime;
		}
	}

	if (subtitlesBtn) {
		subtitlesBtn.addEventListener('click', () => {
			// subtitlesTrack.textTrack = (subtitlesTrack.textTrack === 'hidden') ? 'showing' : 'hidden';
			subtitlesBtn.classList.toggle('is-active');
			subtitlesContainer.classList.toggle('is-visible');
		});
	}

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

	clearButton.addEventListener('click', () => {
		sessionStorage.removeItem('InmsCurrentTime');
		video.currentTime = 0;
		// forwardsButton.dataset.id = 0;
		forwardsButton.removeAttribute('disabled');
		currentChapter = 1;
		manualStep = false;
	});
}

function displayChapters() {
	// console.log('trackElement', trackElement);
	// console.log(trackElement.videoTracks);
	// console.log('trackElement.track', trackElement.track);

	if (trackElement && trackMetadataElement) {
		if (textTrack.kind === 'chapters') {
			video.addEventListener('loadedmetadata', () => {
				// console.log('textTrack.cues.length', textTrack.cues.length);

				// Start by triggering a cue change
				video.currentTime += 1;

				// Loop through chapters
				for (let i = 0; i < textTrack.cues.length; i += 1) {
					// we've made sure we have a good loaded chapters file,
					// now we build out the chapters into HTML
					const locationList = document.querySelector('.js-chapters');
					// console.log('locationList', locationList);
					const cue = textTrack.cues[i];
					const chapterName = cue.text;
					const start = cue.startTime;
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

					// console.log('location', location);
					location.addEventListener('click', () => {
						// console.log('location.id', location.id);
						video.currentTime = location.id;
					}, false);
				}

				// Set default values on forwards and backwards buttons
				// console.log('textTrack.cues[0].endTime', textTrack.cues[0].endTime);
				forwardsButton.setAttribute('data-id', textTrack.cues[0].endTime);
				// console.log('nextDataId', nextDataId);
				// console.log('previousDataId', previousDataId);
				// console.log('currentChapter', currentChapter);

				forwardsButton.addEventListener('click', () => {
					const dataId = forwardsButton.dataset.id;
					document.getElementById(dataId).click();
					// console.log(forwardsButton.dataset.id);
					// currentChapter += 1;
					// if (currentChapter >= textTrack.cues.length) {
					// 	forwardsButton.setAttribute('disabled', 'disabled');
					// }
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

				// backwardsButton.addEventListener('click', () => {
				// 	const dataId = backwardsButton.dataset.id;
				// 	console.log(document.getElementById(dataId)
				// .closest('li').previousSibling.querySelector('a'));
				// 	const previousChapter = document.getElementById(dataId)
				// .closest('li').previousSibling.querySelector('a');
				// 	console.log('previousChapter', previousChapter);
				// 	previousChapter.click();
				// 	forwardsButton.removeAttribute('disabled');
				// 	// console.log(forwardsButton.dataset.id);
				// 	// currentChapter -= 1;
				// 	video.pause();
				// });
			});

			textTrack.addEventListener('cuechange', () => {
				// fire this whenever the user changes chapters
				const myCues = textTrack.activeCues;
				if (myCues.length > 0) {
					const currentLocation = textTrack.activeCues[0].startTime;
					const nextLocation = textTrack.activeCues[0].endTime;

					console.log(currentLocation);

					// console.log('currentLocation', currentLocation);
					const cueMatch = textTrack.activeCues[0].text;
					console.log('Chapter', cueMatch);

					const matchingCueArray = document.querySelectorAll(`[rel="${currentLocation}"]`);

					// Set Forward and backwards buttons timestamps
					forwardsButton.setAttribute('data-id', nextLocation);
					backwardsButton.setAttribute('data-id', currentLocation);

					// const lastChapter = document.querySelector('li.is-current-item:last-child');
					// console.log('lastChapter', lastChapter);
					console.log('manualStep', manualStep);
					console.log(currentChapter, textTrack.cues.length);

					if (manualStep === false) {
						currentChapter += 1;
					}

					// Disable forwardsbutton when on last chapter
					if (currentChapter > textTrack.cues.length) {
						forwardsButton.setAttribute('disabled', 'disabled');
					}

					// console.log('cueMatch', cueMatch);
					// console.dir('matchingCueArray.length', matchingCueArray.length);
					for (let i = 0; i < matchingCueArray.length; i += 1) {
						const thisChapter = matchingCueArray[i];
						if (thisChapter.innerHTML === cueMatch) {
							// console.log('thisChapter', thisChapter);
							const chapter = thisChapter;
							// console.log('chapter', chapter);

							if (chapter === thisChapter) {
								// get the chapter LI elements based on the currentLocation
								const locations = [].slice.call(chapter.closest('figure')
									.querySelectorAll('.js-chapters li'));
								// console.log('locations', locations);

								let counter = 0; // counter is for detecting the current item.
								for (let z = 0; z < locations.length; z += 1) {
									// remove current classes from all items to refresh the display.
									locations[z].classList.remove('is-current-item');
									locations[z].querySelector('a').classList.remove('is-current');
								}
								// add current classes to active item
								chapter.parentNode.classList.add('is-current-item');
								chapter.classList.add('is-current');

								for (let x = 0; x < locations.length; x += 1) {
									if (locations[x].classList.contains('is-current-item')) {
										counter += 1; // iterate counter when active chapter is reached
									}
									if (counter < 1) {
										// add watched class to everything before the current chapter to show progress
										locations[x].classList.add('is-watched');
									} else {
										// remove watched on all other items
										locations[x].classList.remove('is-watched');
									}
								}
							}
						}
					}
				}
			}, false);

			// Get timeline post IDs from metadata.vtt
			metadataTrack.addEventListener('cuechange', () => {
				// console.log('META CUE CHANGE');

				const metadataCues = metadataTrack.activeCues;

				if (metadataCues.length > 0) {
					const metadataCueMatch = metadataTrack.activeCues[0].text;

					[].forEach.call(timelinePosts, (timelinePost) => {
						timelinePost.classList.remove('is-current');
					});

					console.log('TIMELINE POST ID', metadataCueMatch);
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

displayChapters(trackElement);
