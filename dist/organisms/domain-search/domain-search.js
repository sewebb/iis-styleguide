'use strict';

var containerToggle = require('../../ContainerToggle');

var domainSearchButton = document.querySelector('.js-toggle-domain-search');

if (domainSearchButton) {
	containerToggle(domainSearchButton);
}