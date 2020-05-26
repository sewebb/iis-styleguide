'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = className;
var namespace = null;

function className(classes) {
	if (!namespace) {
		var site = document.getElementById('site');

		if (site && site.hasAttribute('data-namespace')) {
			namespace = site.getAttribute('data-namespace');
		} else {
			namespace = '';
		}
	}

	return classes.split(' ').map(function (cls) {
		return '' + namespace + cls;
	}).join(' ');
}