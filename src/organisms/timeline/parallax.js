// import Rellax from 'rellax';
//
// const rellax = new Rellax('.js-rellax', {
// 	wrapper: '.asymmetric-reversed',
// 	relativeToWrapper: true,
// });
//
// console.log(rellax);

function isInView(el) {
	const box = el.getBoundingClientRect();
	return box.top < window.innerHeight && box.bottom >= 0;
}

const parallaxes = document.querySelectorAll('.js-parallax');

window.addEventListener('scroll', () => {
	[].forEach.call(parallaxes, (parallax) => {
		const visible = isInView(parallax);
		if (visible) {
			parallax.classList.add('animate');
		}
	});
});

// import SimpleParallax from 'simple-parallax-js';
//
// // const card = document.querySelectorAll('.m-card img');
// const item1 = document.querySelectorAll('.js-parallax-object-1');
// const item2 = document.querySelectorAll('.js-parallax-object-2');
// const item3 = document.querySelectorAll('.js-parallax-object-3');
// const item4 = document.querySelectorAll('.js-parallax-object-4');
//
// function parallax1() {
// 	const parallax = new SimpleParallax(item1, {
// 		orientation: 'up',
// 		scale: 1.5,
// 		overflow: true,
// 		delay: 0.5,
// 		transition: 'cubic-bezier(0,0,0,1)',
// 	});
//
// 	return parallax;
// }
//
// function parallax2() {
// 	const parallax = new SimpleParallax(item2, {
// 		orientation: 'up',
// 		scale: 2,
// 		overflow: true,
// 		delay: 1,
// 		transition: 'cubic-bezier(0,0,0,1)',
// 	});
//
// 	return parallax;
// }
//
// function parallax3() {
// 	const parallax = new SimpleParallax(item3, {
// 		orientation: 'up',
// 		scale: 2.5,
// 		overflow: true,
// 		delay: 1.5,
// 		transition: 'cubic-bezier(0,0,0,1)',
// 	});
//
// 	return parallax;
// }
//
// function parallax4() {
// 	const parallax = new SimpleParallax(item4, {
// 		orientation: 'up',
// 		scale: 3,
// 		overflow: true,
// 		delay: 2,
// 		transition: 'cubic-bezier(0,0,0,1)',
// 	});
//
// 	return parallax;
// }
//
// if (item1 && item2 && item3 && item4) {
// 	parallax1();
// 	parallax2();
// 	parallax3();
// 	parallax4();
// }
