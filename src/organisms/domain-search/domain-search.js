const containerToggle = require('../../ContainerToggle');

const domainSearchButton = document.querySelector('.js-toggle-domain-search');

if (domainSearchButton) {
	containerToggle(domainSearchButton);
}
