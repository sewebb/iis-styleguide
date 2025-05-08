import Glider from 'glider-js';

const gliderElementCourse = document.querySelector('.js-glider-course');

if (gliderElementCourse) {
	const GliderCourse = new Glider(gliderElementCourse, {
		scrollLock: true,
		slidesToShow: 1,
		slidesToScroll: 1,
	});

	const nextBtns = document.querySelectorAll('.js-glider-next');
	const prevBtns = document.querySelectorAll('.js-glider-prev');
	const siteMain = document.querySelector('#siteMain');
	const zoomImages = document.querySelectorAll('.js-zoom.zoom');
	const youtubeVideos = document.querySelectorAll('[data-youtube]');
	let slideIndex = GliderCourse.getCurrentSlide();
	let bounding = 0;

	const scrollTop = () => {
		siteMain.scrollIntoView();
	};

	if (nextBtns) {
		[].forEach.call(nextBtns, (nextBtn) => {
			nextBtn.addEventListener('click', () => {
				GliderCourse.scrollItem(slideIndex += 1, true);

				[].forEach.call(youtubeVideos, (el) => el.youtube && el.youtube.pauseVideo());

				if (siteMain) {
					bounding = siteMain.getBoundingClientRect();
					if (bounding.top < 0) {
						scrollTop();
					}
				}
			});
		});
	}

	if (prevBtns) {
		[].forEach.call(prevBtns, (prevBtn) => {
			prevBtn.addEventListener('click', () => {
				GliderCourse.scrollItem(slideIndex -= 1, true);
				[].forEach.call(youtubeVideos, (el) => el.youtube && el.youtube.pauseVideo());

				if (siteMain) {
					bounding = siteMain.getBoundingClientRect();
					if (bounding.top < 0) {
						scrollTop();
					}
				}
			});
		});
	}

	if (zoomImages) {
		[].forEach.call(zoomImages, (zoomImage) => {
			zoomImage.addEventListener('click', () => {
				zoomImage.classList.toggle('is-zoomed');
			});
		});
	}
}
