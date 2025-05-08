"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return request;
    }
});
const _objToQuery = /*#__PURE__*/ _interop_require_default(require("./objToQuery"));
const _RequestError = /*#__PURE__*/ _interop_require_default(require("./RequestError"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function request(endpoint, data = null, method = 'POST') {
    let url = endpoint;
    const query = data ? (0, _objToQuery.default)(data) : null;
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    if ('wpApiSettings' in window) {
        headers['X-WP-Nonce'] = window.wpApiSettings.nonce;
    }
    if (method === 'GET' && query) {
        if (url.indexOf('?') > -1) {
            url += query;
        } else {
            url += `?${query}`;
        }
    }
    return fetch(url, {
        method,
        credentials: 'same-origin',
        body: method !== 'GET' ? query : null,
        headers
    }).then((r)=>r.json().then((json)=>{
            if (r.status > 299) {
                throw new _RequestError.default(r.statusText, json, r.status);
            }
            return json;
        }));
}
