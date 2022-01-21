import Glider from 'glider-js';

const gliderElementSingle = document.querySelector('.js-glider-single');

if (gliderElementSingle) {
	const GliderSingle = new Glider(gliderElementSingle, {
		scrollLock: true,
		slidesToShow: 1,
		slidesToScroll: 1,
	});

	const nextBtns = document.querySelectorAll('.js-glider-next');
	const prevBtns = document.querySelectorAll('.js-glider-prev');
	const siteMain = document.querySelector('#siteMain');
	const zoomImages = document.querySelectorAll('.js-zoom.zoom');
	let slideIndex = GliderSingle.getCurrentSlide();
	let bounding = 0;

	const scrollTop = () => {
		siteMain.scrollIntoView();
	};

	if (nextBtns) {
		[].forEach.call(nextBtns, (nextBtn) => {
			nextBtn.addEventListener('click', () => {
				GliderSingle.scrollItem(slideIndex += 1, true);

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
				GliderSingle.scrollItem(slideIndex -= 1, true);

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

	module.exports = GliderSingle;
}
