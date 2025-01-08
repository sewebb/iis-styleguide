'use strict';

var _track = require('../../assets/js/track');

var _track2 = _interopRequireDefault(_track);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var haveIBeenPwnedSubmit = document.querySelector('#o-search-result-submit');

if (haveIBeenPwnedSubmit) {
	haveIBeenPwnedSubmit.addEventListener('submit', function () {
		(0, _track2.default)({
			event: 'guided_tour'
		});
	});
}