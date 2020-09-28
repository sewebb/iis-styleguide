import objToQuery from './objToQuery';
import RequestError from './RequestError';

export default function request(endpoint, data = null, method = 'POST') {
	let url = endpoint;
	const query = (data) ? objToQuery(data) : null;
	const headers = {
		'Content-Type': 'application/x-www-form-urlencoded',
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
		body: (method !== 'GET') ? query : null,
		headers,
	})
		.then((r) => r.json().then((json) => {
			if (r.status > 299) {
				throw new RequestError(r.statusText, json, r.status);
			}

			return json;
		}));
}
