import Glider from 'glider-js';

const gliderElementSingle = document.querySelector('.js-glider-single');
const siteMain = document.querySelector('#siteMain');
let bounding = 0;

if (gliderElementSingle) {
	const GliderSingle = new Glider(gliderElementSingle, {
		scrollLock: true,
		slidesToShow: 1,
		slidesToScroll: 1,
	});

	const nextBtns = document.querySelectorAll('.js-glider-next');
	const prevBtns = document.querySelectorAll('.js-glider-prev');
	let slideIndex = GliderSingle.getCurrentSlide();

	const scrollTop = () => {
		siteMain.scrollIntoView();
	};

	if (nextBtns) {
		[].forEach.call(nextBtns, (nextBtn) => {
			nextBtn.addEventListener('click', () => {
				GliderSingle.scrollItem(slideIndex += 1, true);
				bounding = siteMain.getBoundingClientRect();
				if (bounding.top < 0) {
					scrollTop();
				}
			});
		});
	}

	if (prevBtns) {
		[].forEach.call(prevBtns, (prevBtn) => {
			prevBtn.addEventListener('click', () => {
				GliderSingle.scrollItem(slideIndex -= 1, true);
				bounding = siteMain.getBoundingClientRect();
				if (bounding.top < 0) {
					scrollTop();
				}
			});
		});
	}

	module.exports = GliderSingle;
}
