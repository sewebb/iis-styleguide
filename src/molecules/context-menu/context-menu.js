const containerToggle = require('../../ContainerToggle');

const contextMenus = document.querySelectorAll('.js-context-menu-btn');

if (contextMenus) {
	[].forEach.call(contextMenus, (contextMenu) => {
		containerToggle(contextMenu);
	});
}
