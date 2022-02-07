const video = document.querySelector('video');
const playBtn = document.querySelector('.js-play-btn');
const playIcon = document.querySelector('.js-play-icon');
const pauseIcon = document.querySelector('.js-pause-icon');
const trackElement = document.getElementById('video-chapters');

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

	console.log('sourceElement', sourceElement);

	window.addEventListener('unload', () => {
		sessionStorage.setItem('InmsCurrentTime', video.currentTime);
	});

	if (sessionStorage.getItem('InmsCurrentTime')) {
		const videoCurrentTime = sessionStorage.getItem('InmsCurrentTime');

		if (videoCurrentTime) {
			console.log('videoCurrentTime', videoCurrentTime);
			video.currentTime = videoCurrentTime;
		}
	}

	if (playBtn) {
		playBtn.addEventListener('click', () => {
			if (video.paused) {
				video.play();
				pauseIcon.classList.remove('is-hidden');
				playIcon.classList.add('is-hidden');
			} else {
				video.pause();
				pauseIcon.classList.add('is-hidden');
				playIcon.classList.remove('is-hidden');
			}
		});
	}

	video.addEventListener('ended', () => {
		pauseIcon.classList.add('is-hidden');
		playIcon.classList.remove('is-hidden');
		video.currentTime = 0;
	});

	clearButton.addEventListener('click', () => {
		sessionStorage.removeItem('InmsCurrentTime');
		video.currentTime = 0;
		video.play();
	});
}

/*
See the top of the HTML. The JS for this needs to load before the HTML is loaded.

In your website, you'd load the JS in the head instead of at the end of the page.
*/

// const support = {
// 	sup() {
// 		if (!window.DOMParser) return false;
// 		const parser = new DOMParser();
// 		try {
// 			parser.parseFromString('x', 'text/html');
// 		} catch (err) {
// 			return false;
// 		}
// 		return true;
// 	},
// };
//
// function stringToHTML(str) {
// 	// check for DOMParser support
// 	if (support) {
// 		const parser = new DOMParser();
// 		const doc = parser.parseFromString(str, 'text/html');
// 		return doc.body.innerHTML;
// 	}
// 	// Otherwise, create div and append HTML
// 	const dom = document.createElement('div');
// 	dom.innerHTML = str;
// 	return dom;
// }

function displayChapters() {
	console.log('trackElement', trackElement);
	console.log(trackElement.videoTracks);
	console.log('trackElement.track', trackElement.track);
	const textTrack = trackElement.track;

	if (trackElement) {
		if (textTrack.kind === 'chapters') {
			textTrack.mode = 'hidden';

			video.addEventListener('loadedmetadata', () => {
				console.log('textTrack.cues.length', textTrack.cues.length);

				for (let i = 0; i < textTrack.cues.length; i += 1) {
					console.log('here?');
					// we've made sure we have a good loaded chapters file,
					// now we build out the chapters into HTML
					const locationList = document.querySelector('.js-chapters');
					console.log('locationList', locationList);
					const cue = textTrack.cues[i];
					const chapterName = cue.text;
					const start = cue.startTime;
					const newLocale = document.createElement('li');
					const location = document.createElement('a');
					location.setAttribute('rel', start);
					location.setAttribute('id', start);
					location.setAttribute('tabindex', '0');
					// the next line converts the plaintext from the chapter file into HTML
					const localeDescription = chapterName;
					location.innerHTML = localeDescription;
					newLocale.appendChild(location);
					locationList.appendChild(newLocale);

					console.log('location', location);
					location.addEventListener('click', () => {
						console.log('location.id', location.id);
						document.querySelector('video').currentTime = location.id;
					}, false);
				}
			});

			textTrack.addEventListener('cuechange', () => {
				// fire this whenever the user changes chapters
				const myCues = textTrack.activeCues;
				if (myCues.length > 0) {
					const currentLocation = textTrack.activeCues[0].startTime;
					console.log('currentLocation', currentLocation);
					const cueMatch = textTrack.activeCues[0].text;
					console.log('cueMatch', cueMatch);
					const matchingCueArray = document.querySelectorAll(`[rel="${currentLocation}"]`);

					// .dataset.uuid

					console.log('cueMatch', cueMatch);
					console.dir(matchingCueArray.length);
					for (let i = 0; i < matchingCueArray.length; i += 1) {
						console.log(`you loop me right round baby ${i}`);
						const thisChapter = matchingCueArray[i];
						if (thisChapter.innerHTML === cueMatch) {
							console.log('winner winner chicken dinner');
							console.log(thisChapter);
							const chapter = thisChapter;
							console.log('chapter', chapter);

							if (chapter === thisChapter) {
								// get the chapter LI elements based on the currentLocation, it's not perfect,
								// but I doubt a lot of chapters will have the same timecodes

								const locations = [].slice.call(chapter.closest('figure')
									.querySelectorAll('.js-chapters li'));
								console.log('locations', locations);
								// chapter = element.querySelector("figcaption")
								//	.querySelector(".chapters").querySelector("is-current-item").querySelector("a");
								let counter = 0; // counter is for detecting the current item.
								for (let z = 0; z < locations.length; z += 1) {
									// remove current classes from all items to refresh the display.
									locations[z].classList.remove('is-current-item');
									locations[z].querySelector('a').classList.remove('current');
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

								// locationList.style.top = "-"+chapter.parentNode.offsetTop+"px";
								/* this doesn't enable the scrollbar when
								it starts moving the list upward It mostly does the right thing by
								putting the current chapter at the top of
								the chapter container, but without a scroll bar to pull everything
								back down, it's useless and I didn't need it for this project. */

								// chapter.scrollIntoView();
								// This moves the whole window to the link. totally useless
							}
						}
					}
				}

				// DO A FOR LOOP TO COMPARE THE MATCHING ELEMENTS AGAINST THEIR TEXT
				// and then target the one that matches.
			}, false);
		}
	}
}

displayChapters(trackElement);

/* Bad practice, but my client wanted to include HTML in their Chapters files with <small> tags.
So we need to interpret the chapter content from plain text to HTML
the file looks like this:
WEBVTT

1
00:00:00.000 --> 00:00:39.824
Welcome

2
00:00:39.825 --> 00:03:31.441
Logging in and Account Creation <small>This also includes resetting your password</small>

*/
