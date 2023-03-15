"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Events = function () {
	function Events() {
		var listeners = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, Events);

		this.listeners = listeners;
	}

	_createClass(Events, [{
		key: "hasListeners",
		value: function hasListeners(event) {
			return event in this.listeners;
		}
	}, {
		key: "on",
		value: function on(event, cb) {
			var _this = this;

			if (!(event in this.listeners)) {
				this.listeners[event] = [];
			}

			if (!this.listeners[event].includes(cb)) {
				this.listeners[event].push(cb);
			}

			return {
				unsubscribe: function unsubscribe() {
					return _this.off(event, cb);
				}
			};
		}
	}, {
		key: "off",
		value: function off(event, cb) {
			if (!this.hasListeners(event)) {
				return;
			}

			this.listeners[event] = this.listeners[event].filter(function (subCb) {
				return subCb !== cb;
			});
		}
	}, {
		key: "removeAll",
		value: function removeAll(event) {
			this.listeners[event] = [];
		}
	}, {
		key: "emit",
		value: function emit(event) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			if (!this.hasListeners(event)) {
				return;
			}

			this.listeners[event].forEach(function (cb) {
				cb.call.apply(cb, [null].concat(args));
			});
		}
	}]);

	return Events;
}();

exports.default = Events;