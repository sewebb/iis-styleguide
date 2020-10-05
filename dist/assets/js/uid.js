'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = uid;
function uid() {
	return (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, '');
}