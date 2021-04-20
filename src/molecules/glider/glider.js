import Glider from 'glider-js';

const gliderElement = document.querySelector('.js-glider');

if (gliderElement) {
	const glider = new Glider(gliderElement, {
		scrollLock: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: '.glider-dots',
		arrows: {
			prev: '.js-glider-prev',
			next: '.js-glider-next',
		},
		responsive: [
			{
				breakpoint: 961,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				},
			},
			{
				breakpoint: 769,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 469,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	});

	module.exports = glider;
}
