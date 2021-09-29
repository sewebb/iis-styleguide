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
	let slideIndex = GliderSingle.getCurrentSlide();

	const scrollTop = () => {
		gliderElementSingle.scrollIntoView();
	};

	if (nextBtns) {
		[].forEach.call(nextBtns, (nextBtn) => {
			nextBtn.addEventListener('click', () => {
				GliderSingle.scrollItem(slideIndex += 1, true);
				scrollTop();
			});
		});
	}

	if (prevBtns) {
		[].forEach.call(prevBtns, (prevBtn) => {
			prevBtn.addEventListener('click', () => {
				GliderSingle.scrollItem(slideIndex -= 1, true);
				scrollTop();
			});
		});
	}

	module.exports = GliderSingle;
}
