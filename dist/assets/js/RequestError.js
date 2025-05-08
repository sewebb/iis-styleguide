"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return RequestError;
    }
});
class RequestError extends Error {
    constructor(message, response = {}, status = 500){
        super(message);
        this.name = 'RequestError';
        this.status = status;
        this.response = response;
    }
}
