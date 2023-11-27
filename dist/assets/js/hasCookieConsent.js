'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = hasCookieConsent;

var _getCookieByName = require('./getCookieByName');

var _getCookieByName2 = _interopRequireDefault(_getCookieByName);

var _queryToObj = require('./queryToObj');

var _queryToObj2 = _interopRequireDefault(_queryToObj);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hasCookieConsent(category) {
	var defaultIfNoCookie = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	var cookie = (0, _getCookieByName2.default)('OptanonConsent');

	if (!cookie) {
		return defaultIfNoCookie;
	}

	var cookieObj = (0, _queryToObj2.default)(cookie);

	if (!('groups' in cookieObj)) {
		return defaultIfNoCookie;
	}

	var groups = Object.fromEntries(cookieObj.groups.split(',').map(function (group) {
		return group.trim().split(':');
	}));

	if (!(category in groups)) {
		return defaultIfNoCookie;
	}

	return groups[category] === '1';
}