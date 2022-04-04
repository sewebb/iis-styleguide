"use strict";

module.exports = {
	// Get top of element relative to window
	offsetTop: function offsetTop(el) {
		var rect = el.getBoundingClientRect();
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return rect.top + scrollTop;
	},


	// Get bottom of element relative to window
	offsetBottom: function offsetBottom(el) {
		var rect = el.getBoundingClientRect();
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return rect.bottom + scrollTop;
	},


	// Get left of element relative to window
	offsetLeft: function offsetLeft(el) {
		var rect = el.getBoundingClientRect();
		var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
		return rect.left + scrollLeft;
	}
};