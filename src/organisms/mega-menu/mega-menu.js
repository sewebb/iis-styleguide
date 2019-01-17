const containerToggle = require('../../ContainerToggle');
const nav = require('../footer/footer');

const megaMenuButton = document.querySelector('.js-toggle-mega-menu');

if (megaMenuButton) {
	containerToggle(megaMenuButton);
}

megaMenuButton.addEventListener('click', nav.animate);

window.addEventListener('resize', nav.animate);
