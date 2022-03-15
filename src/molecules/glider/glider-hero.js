import Glider from 'glider-js';

const gliderElementHero = document.querySelector('.js-glider-hero');

if (gliderElementHero) {
	const GliderHero = new Glider(gliderElementHero, {
		scrollLock: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: {
			prev: '.js-glider-prev',
			next: '.js-glider-next',
		},
	});

	module.exports = GliderHero;
}
