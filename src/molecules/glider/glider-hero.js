import Glider from 'glider-js';

const gliderElementHero = document.querySelector('.js-glider-hero');

if (gliderElementHero) {
	const GliderHero = new Glider(gliderElementHero, {
		scrollLock: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		rewind: true,
		arrows: {
			prev: '.js-glider-prev',
			next: '.js-glider-next',
		},
	});

	const autoplayDelay = gliderElementHero.dataset.timeout;

	if (autoplayDelay) {
		let autoplay = setInterval(() => {
			GliderHero.scrollItem('next');
		}, autoplayDelay);

		gliderElementHero.addEventListener('mouseover', () => {
			if (autoplay !== null) {
				clearInterval(autoplay);
				autoplay = null;
			}
		}, 0);

		gliderElementHero.addEventListener('mouseout', () => {
			if (autoplay === null) {
				autoplay = setInterval(() => {
					GliderHero.scrollItem('next');
				}, autoplayDelay);
			}
		}, 0);
	}

	module.exports = GliderHero;
}
