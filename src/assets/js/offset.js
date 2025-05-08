export default {
	// Get top of element relative to window
	offsetTop(el) {
		const rect = el.getBoundingClientRect();
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return rect.top + scrollTop;
	},

	// Get bottom of element relative to window
	offsetBottom(el) {
		const rect = el.getBoundingClientRect();
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return rect.bottom + scrollTop;
	},

	// Get left of element relative to window
	offsetLeft(el) {
		const rect = el.getBoundingClientRect();
		const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
		return rect.left + scrollLeft;
	},
};
