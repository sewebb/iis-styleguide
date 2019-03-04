'use strict';

var toolTip = document.querySelector('[role="tooltip"]');
var toolTipText = document.querySelector('[data-tooltip]');

function isInViewport(elem) {
	var distance = elem.getBoundingClientRect();
	return distance.top >= 30 && distance.left >= 30 && distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) && distance.right <= (window.innerWidth || document.documentElement.clientWidth);
}

function positionToolTip() {
	if (isInViewport(toolTip)) {
		toolTipText.classList.remove('down');
	} else {
		toolTipText.classList.add('down');
	}
}

if (toolTip) {
	positionToolTip();
	window.addEventListener('scroll', positionToolTip);
}