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
	let slideIndex = 0;
	const scrollTop = () => {
		window.scrollTo(0, 0);
	};

	if (nextBtns) {
		[].forEach.call(nextBtns, (nextBtn) => {
			nextBtn.addEventListener('click', () => {
				slideIndex += 1;
				GliderSingle.scrollItem(slideIndex, true);
				scrollTop();
			});
		});
	}

	if (prevBtns) {
		[].forEach.call(prevBtns, (prevBtn) => {
			prevBtn.addEventListener('click', () => {
				slideIndex -= 1;
				GliderSingle.scrollItem(slideIndex, true);
				scrollTop();
			});
		});
	}

	module.exports = GliderSingle;
}
