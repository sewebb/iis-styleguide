const animateFooter = {
	// Animate footer
	animate() {
		const main = document.querySelector('.iis-site__main');
		const body = document.querySelector('body');
		const html = document.documentElement;
		const megaMenu = document.querySelector('.o-mega-menu');
		const header = document.querySelector('.o-header');
		const footer = document.querySelector('.o-footer');
		const footerHeight = footer.offsetHeight;
		const totalNavHeight = megaMenu.offsetHeight + header.offsetHeight;
		let bodyHeight = 0;
		bodyHeight = Math.max(body.scrollHeight, body.offsetHeight,
			html.clientHeight, html.scrollHeight, html.offsetHeight);
		const setBodyHeight = footerHeight + totalNavHeight;
		const animateTo = bodyHeight - totalNavHeight - footer.offsetHeight;
		const animateToMinusValue = `${-Math.abs(animateTo)}px`;

		main.classList.toggle('fade-out');
		footer.classList.toggle('is-animated');
		body.classList.toggle('has-fixed-height');
		animateFooter.toggleStyle(footer, 'transform', `translateY(${animateToMinusValue})`, 'translateY(0)');

		console.log(bodyHeight, totalNavHeight, animateTo, animateToMinusValue, setBodyHeight);
		console.log(footerHeight, totalNavHeight);
	},
	// Temporary allow
	/* eslint-disable no-param-reassign */
	toggleStyle(el, prop, style1, style2) {
		console.log('toggleStyle');
		el.style[prop] = el.style[prop] === style1 ? style2 : style1;
	},
	/* eslint-enable no-param-reassign */
};

module.exports = animateFooter;
