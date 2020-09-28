'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = request;

var _objToQuery = require('./objToQuery');

var _objToQuery2 = _interopRequireDefault(_objToQuery);

var _RequestError = require('./RequestError');

var _RequestError2 = _interopRequireDefault(_RequestError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function request(endpoint) {
	var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'POST';

	var url = endpoint;
	var query = data ? (0, _objToQuery2.default)(data) : null;
	var headers = {
		'Content-Type': 'application/x-www-form-urlencoded'
	};

	if ('wpApiSettings' in window) {
		headers['X-WP-Nonce'] = window.wpApiSettings.nonce;
	}

	if (method === 'GET' && query) {
		if (url.indexOf('?') > -1) {
			url += query;
		} else {
			url += '?' + query;
		}
	}

	return fetch(url, {
		method: method,
		credentials: 'same-origin',
		body: method !== 'GET' ? query : null,
		headers: headers
	}).then(function (r) {
		return r.json().then(function (json) {
			if (r.status > 299) {
				throw new _RequestError2.default(r.statusText, json, r.status);
			}

			return json;
		});
	});
}