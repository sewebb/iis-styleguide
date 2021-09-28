import Glider from 'glider-js';

const gliderWrappers = document.querySelectorAll('.glider-contain');

if (gliderWrappers) {
	[].forEach.call(gliderWrappers, (gliderWrapper) => {
		const gliderElement = gliderWrapper.querySelector('.js-glider');

		const glider = new Glider(gliderElement, {
			scrollLock: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: gliderElement.querySelector('.glider-dots'),
			arrows: {
				prev: gliderWrapper.querySelector('.js-glider-prev'),
				next: gliderWrapper.querySelector('.js-glider-next'),
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
	});
}
