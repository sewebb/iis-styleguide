export default class RequestError extends Error {
	constructor(message, response = {}, status = 500) {
		super(message);

		this.name = 'RequestError';
		this.status = status;
		this.response = response;
	}
}
