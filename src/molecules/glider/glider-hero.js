import Glider from 'glider-js';
import nodeAdded from '../../assets/js/nodeAdded';

// eslint-disable-next-line import/prefer-default-export
export function initHeroGlider(node) {
	if (node.hasAttribute('data-glider-initialized')) {
		return;
	}
	// eslint-disable-next-line no-underscore-dangle
	const dataLayer = window._mtm || [];
	const gliderLinks = document.querySelectorAll('.glider-slide a');

	const GliderHero = new Glider(node, {
		scrollLock: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		rewind: true,
		arrows: {
			prev: '.js-glider-prev',
			next: '.js-glider-next',
		},
	});

	node.setAttribute('data-glider-initialized', 'true');

	const autoplayDelay = node.dataset.timeout;

	if (autoplayDelay) {
		let autoplay = setInterval(() => {
			GliderHero.scrollItem('next');
		}, parseInt(autoplayDelay, 10));

		node.addEventListener('mouseover', () => {
			if (autoplay !== null) {
				clearInterval(autoplay);
				autoplay = null;
			}
		}, 0);

		node.addEventListener('mouseout', () => {
			if (autoplay === null) {
				autoplay = setInterval(() => {
					GliderHero.scrollItem('next');
				}, parseInt(autoplayDelay, 10));
			}
		}, 0);
	}

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

nodeAdded('.js-glider-hero', initHeroGlider);

const gliderElementHero = document.querySelector('.js-glider-hero');

if (gliderElementHero) {
	initHeroGlider(gliderElementHero);
}
