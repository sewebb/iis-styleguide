'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = htmlTextLength;
function htmlTextLength(html) {
	var div = document.createElement('div');

	div.innerHTML = html;

	return div.textContent.length;
}