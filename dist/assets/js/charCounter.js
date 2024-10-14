'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _className = require('./className');

var _className2 = _interopRequireDefault(_className);

var _htmlTextLength = require('./htmlTextLength');

var _htmlTextLength2 = _interopRequireDefault(_htmlTextLength);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CharCounter = function () {
	function CharCounter(el) {
		_classCallCheck(this, CharCounter);

		this.el = el;
		this.counterEl = null;
		this.isRichText = this.el.dataset.richText !== undefined;
		this.min = parseInt(this.el.getAttribute('data-min') || 0, 10);
		this.max = parseInt(this.el.getAttribute('data-max') || 0, 10);

		if (!this.min && !this.max) {
			console.warn('Either min or max must be set and greater than 0.');
			return;
		}

		if (this.isRichText) {
			this.waitForEditor();

			return;
		}

		this.build();
		this.attach();
	}

	_createClass(CharCounter, [{
		key: 'waitForEditor',
		value: function waitForEditor() {
			var _this = this;

			if (this.el.editor) {
				this.build();
				this.attach();
			} else {
				this.el.addEventListener('editor-ready', function () {
					_this.build();
					_this.attach();
				});
			}
		}
	}, {
		key: 'count',
		value: function count() {
			if (this.isRichText) {
				return (0, _htmlTextLength2.default)(this.el.editor.getHTML());
			}

			return this.el.value.length;
		}
	}, {
		key: 'setCountText',
		value: function setCountText() {
			var count = this.count();

			if (this.min && count < this.min) {
				this.counterEl.textContent = count + '/' + this.min;
				this.counterEl.className = 'backgrond-ruby-light ' + (0, _className2.default)('a-meta');
				this.el.setAttribute('aria-invalid', 'true');

				return;
			}

			if (this.max && count > this.max) {
				this.counterEl.textContent = count + '/' + this.max;
				this.counterEl.className = 'background-ruby-light ' + (0, _className2.default)('a-meta');
				this.el.setAttribute('aria-invalid', 'true');

				return;
			}

			this.counterEl.textContent = count + '/' + (this.max || this.min);
			this.counterEl.className = 'background-jade-light ' + (0, _className2.default)('a-meta');
			this.el.removeAttribute('aria-invalid');
			this.counterEl.closest('.field-group').classList.remove('is-invalid');
		}
	}, {
		key: 'build',
		value: function build() {
			var counter = document.createElement('small');
			var wrapper = void 0;

			if (this.isRichText) {
				wrapper = this.el.editor.options.element;
				wrapper.style.paddingRight = '3.8333333333rem';
			} else {
				wrapper = document.createElement('div');

				wrapper.className = 'u-position-relative';
				this.el.parentNode.insertBefore(wrapper, this.el);
				wrapper.appendChild(this.el);

				this.el.style.paddingRight = '3.8333333333rem';
			}

			counter.className = 'color-cyberspace ' + (0, _className2.default)('a-meta');
			counter.style.cssText = 'position: absolute; top: .5rem; right: .5rem; z-index: 501;background-color: #ff9fb4; border-radius: 0.25rem; padding: .25rem; line-height: 1;margin: 0';

			wrapper.appendChild(counter);

			this.counterEl = counter;
			this.setCountText();
		}
	}, {
		key: 'attach',
		value: function attach() {
			var _this2 = this;

			if (this.isRichText) {
				this.el.editor.on('update', function () {
					_this2.setCountText();
				});
			} else {
				this.el.addEventListener('input', function () {
					_this2.setCountText();
				});
			}
		}
	}]);

	return CharCounter;
}();

var elements = document.querySelectorAll('[data-min], [data-max]');
elements.forEach(function (el) {
	el.charCounter = new CharCounter(el);
});