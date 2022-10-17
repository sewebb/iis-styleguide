import Glider from 'glider-js';

const gliderElementHero = document.querySelector('.js-glider-hero');
const dataLayer = window.dataLayer || [];
const gliderLinks = document.querySelectorAll('.glider-slide a');

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
	} else {
		document.querySelector('.js-glider-prev').addEventListener('click', () => {
			dataLayer.push({
				event: 'carousel',
				eventInfo: {
					category: 'carousel',
					action: 'click',
					label: 'arrow_left',
				},
			});
		});

		document.querySelector('.js-glider-next').addEventListener('click', () => {
			dataLayer.push({
				event: 'carousel',
				eventInfo: {
					category: 'carousel',
					action: 'click',
					label: 'arrow_right',
				},
			});
		});

		[].forEach.call(gliderLinks, (gliderLink) => {
			gliderLink.addEventListener('click', () => {
				const linkTarget = gliderLink.href;
				console.log(linkTarget);
				dataLayer.push({
					event: 'carousel',
					eventInfo: {
						category: 'carousel',
						action: 'click',
						label: linkTarget,
					},
				});
			});
		});
	}

	module.exports = GliderHero;
}
