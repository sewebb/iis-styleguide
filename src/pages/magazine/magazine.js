import SimpleParallax from 'simple-parallax-js';

// const card = document.querySelectorAll('.m-card img');
const image = document.querySelectorAll('.wp-block-image img');
const asymCard1 = document.querySelectorAll('.asymmetric-md .grid-18:first-child .m-card');
const asymCard2 = document.querySelectorAll('.asymmetric-md .grid-18:nth-child(2) .m-card');
const asymCard3 = document.querySelectorAll('.asymmetric-md .grid-18:nth-child(3) .m-card');

// function cards() {
// 	const parallax = new SimpleParallax(card, {
// 		delay: 0,
// 		orientation: 'up',
// 		scale: 2,
// 		overflow: false,
// 	});
//
// 	return parallax;
// }

function images() {
	const parallax = new SimpleParallax(image, {
		orientation: 'up',
		scale: 1.5,
		overflow: false,
		delay: 0.75,
		transition: 'cubic-bezier(0,0,0,1)',
	});

	return parallax;
}

function asymCards1() {
	const parallax = new SimpleParallax(asymCard1, {
		orientation: 'up',
		scale: 1.5,
		overflow: true,
		delay: 0.5,
		transition: 'cubic-bezier(0,0,0,1)',
	});

	return parallax;
}

function asymCards2() {
	const parallax = new SimpleParallax(asymCard2, {
		orientation: 'up',
		scale: 2,
		overflow: true,
		delay: 0.75,
		transition: 'cubic-bezier(0,0,0,1)',
	});

	return parallax;
}

function asymCards3() {
	const parallax = new SimpleParallax(asymCard3, {
		orientation: 'up',
		scale: 2.5,
		overflow: true,
		delay: 1,
		transition: 'cubic-bezier(0,0,0,1)',
	});

	return parallax;
}

// if (card) {
// 	cards();
// }

if (image) {
	images();
}

asymCards1();
asymCards2();
asymCards3();
