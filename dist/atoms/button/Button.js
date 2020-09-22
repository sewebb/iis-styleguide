'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Button = function () {
	function Button(button) {
		var disabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

		_classCallCheck(this, Button);

		this.button = button;
		this.disabled = disabled;

		this.build();
	}

	_createClass(Button, [{
		key: 'build',
		value: function build() {
			var className = this.button.classList.item(0);
			var html = '\n\t\t\t<svg class="icon ' + className + '__spinner">\n\t\t\t\t<use xlink:href="#icon-spinner-white"></use>\n\t\t\t</svg>\n\t\t';

			this.button.appendChild(document.createRange().createContextualFragment(html));
		}
	}, {
		key: 'isLoading',
		value: function isLoading() {
			return this.button.classList.contains('is-loading');
		}
	}, {
		key: 'start',
		value: function start() {
			if (this.disabled) {
				this.button.setAttribute('disabled', 'disabled');
			}

			this.button.classList.add('is-loading');
		}
	}, {
		key: 'stop',
		value: function stop() {
			if (this.disabled) {
				this.button.removeAttribute('disabled');
			}

			this.button.classList.remove('is-loading');
		}
	}]);

	return Button;
}();

module.exports = Button;