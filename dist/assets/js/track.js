'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = track;
function track(data) {

	if (window._mtm) {

		window._mtm.push(data);
	} else {
		console.log('Matomo not loaded', data);
	}
}