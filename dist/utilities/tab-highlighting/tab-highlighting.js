'use strict';

// Add class to html-element on tab click

var element = document.getElementsByTagName('html')[0];
var highLightClass = 'tab-highlight';

function onKeyDown(e) {
	var event = e;
	if (!event) {
		window.event = event;
	}

	var keyCode = event.keyCode || event.which;
	var tabKey = 9;

	if (keyCode === tabKey) {
		this.classList.add(highLightClass);
	}
}

// Remove class on mouse click
function onMouseDown() {
	this.classList.remove(highLightClass);
}

// Run on events

element.addEventListener('keydown', onKeyDown);
element.addEventListener('mousedown', onMouseDown);