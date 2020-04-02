'use strict';

var containerToggle = require('../../ContainerToggle');

var contextMenus = document.querySelectorAll('.js-context-menu-btn');

if (contextMenus) {
	[].forEach.call(contextMenus, function (contextMenu) {
		containerToggle(contextMenu);
	});
}