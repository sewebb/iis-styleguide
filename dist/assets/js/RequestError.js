'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RequestError = function (_Error) {
	_inherits(RequestError, _Error);

	function RequestError(message) {
		var response = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;

		_classCallCheck(this, RequestError);

		var _this = _possibleConstructorReturn(this, (RequestError.__proto__ || Object.getPrototypeOf(RequestError)).call(this, message));

		_this.name = 'RequestError';
		_this.status = status;
		_this.response = response;
		return _this;
	}

	return RequestError;
}(Error);

exports.default = RequestError;