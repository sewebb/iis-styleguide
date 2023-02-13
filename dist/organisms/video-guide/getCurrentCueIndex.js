"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = getCurrentCueIndex;
function getCurrentCueIndex(target) {
	var activeCue = target.activeCues[0];
	var cues = target.cues;


	return Math.max(Array.prototype.indexOf.call(cues, activeCue), 0);
}