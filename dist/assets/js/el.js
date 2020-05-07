'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Lightweight DOM sugar.
 */
var Element = function () {
	function Element(element) {
		_classCallCheck(this, Element);

		this.elements = typeof element === 'string' ? document.querySelectorAll(element) : [element];
	}

	_createClass(Element, [{
		key: 'onElement',
		value: function onElement(elements, callback) {
			var _this = this;

			if (!elements) {
				return;
			}

			[].forEach.call(elements, function (element) {
				if (Object.prototype.toString.call(element) === '[object Array]') {
					_this.onElement(element, callback);
				} else {
					callback.call(_this, element);
				}
			});
		}
	}, {
		key: 'addClass',
		value: function addClass(className) {
			this.onElement(this.elements, function (element) {
				element.classList.add(className);
			});

			return this;
		}
	}, {
		key: 'removeClass',
		value: function removeClass(className) {
			this.onElement(this.elements, function (element) {
				element.classList.remove(className);
			});

			return this;
		}
	}, {
		key: 'className',
		value: function className(_className) {
			this.onElement(this.elements, function (element) {
				if (element.className !== _className) {
					element.className = _className;
				}
			});

			return this;
		}
	}, {
		key: 'style',
		value: function style(_style, value) {
			this.onElement(this.elements, function (element) {
				if (element.style[_style] !== value) {
					element.style[_style] = value;
				}
			});

			return this;
		}
	}, {
		key: 'text',
		value: function text(_text) {
			this.onElement(this.elements, function (element) {
				if (element.textContent !== _text) {
					element.textContent = _text;
				}
			});

			return this;
		}
	}, {
		key: 'html',
		value: function html(_html) {
			this.onElement(this.elements, function (element) {
				if (element.innerHTML !== _html) {
					element.innerHTML = _html;
				}
			});

			return this;
		}
	}, {
		key: 'value',
		value: function value(_value) {
			this.onElement(this.elements, function (element) {
				element.value = _value;
			});

			return this;
		}
	}, {
		key: 'callback',
		value: function callback(_callback) {
			this.onElement(this.elements, _callback);

			return this;
		}
	}, {
		key: 'callbackRAF',
		value: function callbackRAF(callback) {
			var _this2 = this;

			window.requestAnimationFrame(function () {
				return _this2.callback(callback);
			});
		}
	}, {
		key: 'hide',
		value: function hide() {
			this.onElement(this.elements, function (element) {
				element.style.display = 'none';
			});

			return this;
		}
	}, {
		key: 'show',
		value: function show() {
			this.onElement(this.elements, function (element) {
				element.style.display = '';
			});

			return this;
		}
	}, {
		key: 'visible',
		value: function visible(_visible) {
			if (_visible) {
				this.show();
			} else {
				this.hide();
			}

			return this;
		}
	}]);

	return Element;
}();

function el(element) {
	return new Element(element);
}

exports.default = el;