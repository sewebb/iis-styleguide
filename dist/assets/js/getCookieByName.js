"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = getCookieByName;
function getCookieByName(name) {
	var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));

	if (match) {
		return match[2];
	}

	return null;
}