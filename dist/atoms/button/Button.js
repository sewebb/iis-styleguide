'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var colors = ['ruby', 'ruby-light', 'jade', 'jade-light', 'lemon', 'lemon-light'];

/**
 * A button wrapper with helpful state management
 *
 * @class
 * @constructor
 * @public
 */

var Button = function () {
	/**
  * New button instance
  *
  * @param {Node} button
  * @param {object} config
  */
	function Button(button) {
		var _this = this;

		var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		var initialState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

		_classCallCheck(this, Button);

		this.onMouseEnter = function () {
			return _this.setState({ mouseover: true });
		};

		this.onMouseLeave = function () {
			return _this.setState({ mouseover: false });
		};

		this.onFocus = function (e) {
			console.log(e);
			_this.setState({ focus: true });
		};

		this.onBlur = function () {
			if (!_this.element.disabled) {
				_this.setState({ focus: false });
			}
		};

		/**
   * The html element
   * @type {Node}
   */
		this.element = button;
		this.base = this.element.classList.item(0);
		this.config = _extends({
			hasStates: false
		}, config);

		this.state = _extends({
			loading: false,
			activated: false,
			mouseover: false,
			focus: false
		}, initialState);

		this.m = function (m) {
			return _this.base + '--' + m;
		};
		this.e = function (e) {
			return _this.base + '__' + e;
		};
		this.on = function () {
			var _element;

			return (_element = _this.element).addEventListener.apply(_element, arguments);
		};
		this.off = function () {
			var _element2;

			return (_element2 = _this.element).removeEventListener.apply(_element2, arguments);
		};

		this.build();

		if (this.config.hasStates) {
			this.attach();
		}

		this.render();
	}

	_createClass(Button, [{
		key: 'removeIcon',
		value: function removeIcon() {
			// Remove current icon
			var currentIcon = this.element.querySelector('.icon');

			if (currentIcon) {
				currentIcon.parentNode.removeChild(currentIcon);
			}
		}
	}, {
		key: 'buildIcon',
		value: function buildIcon(icon, className) {
			this.removeIcon();

			var html = '\n\t\t\t<svg class="icon ' + this.e(className) + '">\n\t\t\t\t<use xlink:href="#icon-' + icon + '"></use>\n\t\t\t</svg>\n\t\t';

			this.element.appendChild(document.createRange().createContextualFragment(html));
		}
	}, {
		key: 'build',
		value: function build() {
			this.buildIcon('spinner-white', 'spinner');
		}
	}, {
		key: 'attach',
		value: function attach() {
			this.on('mouseover', this.onMouseEnter);
			this.on('focus', this.onFocus);
			this.on('mouseleave', this.onMouseLeave);
			this.on('blur', this.onBlur);
		}
	}, {
		key: 'setState',
		value: function setState(newState) {
			this.state = _extends({}, this.state, newState);
			this.render();
		}
	}, {
		key: 'isLoading',
		value: function isLoading() {
			return this.state.loading;
		}
	}, {
		key: 'isActivated',
		value: function isActivated() {
			return this.state.activated;
		}
	}, {
		key: 'start',
		value: function start() {
			this.setState({ loading: true, mouseover: false });
		}
	}, {
		key: 'stop',
		value: function stop() {
			this.setState({ loading: false, activated: false });
		}
	}, {
		key: 'activate',
		value: function activate() {
			this.setState({ activated: true, loading: false });
		}
	}, {
		key: 'deactivate',
		value: function deactivate() {
			this.setState({ activated: false, loading: false });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			if (this.isLoading()) {
				this.buildIcon('spinner-white', 'spinner');

				this.element.setAttribute('disabled', 'disabled');
				this.element.classList.add('is-loading');

				return;
			}

			var clone = this.element.cloneNode();

			this.element.removeAttribute('disabled');
			clone.classList.remove('is-loading');

			if (!this.config.hasStates) {
				this.element.className = clone.className;
				return;
			}

			if (this.state.focus) {
				setTimeout(function () {
					_this2.element.focus();
				}, 0);
			}

			var state = void 0;
			var over = this.state.focus ? true : this.state.mouseover;

			if (this.isActivated() && !over) {
				state = 'active';
			} else if (this.isActivated() && over) {
				state = 'deactivate';
			} else {
				state = 'default';
			}

			var color = this.config[state + 'Color'];
			var icon = this.config[state + 'Icon'];
			var text = this.config[state + 'Text'];

			if (color) {
				colors.forEach(function (c) {
					return clone.classList.remove(_this2.m(c));
				});
				clone.classList.add(this.m(color));
			}

			if (icon) {
				var prevIcon = this.element.querySelector('.' + this.e('icon'));

				if (prevIcon) {
					prevIcon.parentNode.removeChild(prevIcon);
				}

				this.buildIcon(icon, 'icon');

				clone.classList.add(this.m('icon'));
			} else {
				this.removeIcon();
				clone.classList.remove(this.m('icon'));
			}

			if (text) {
				this.element.querySelector('.' + this.e('text')).innerHTML = text;
			}

			this.element.className = clone.className;
		}
	}]);

	return Button;
}();

module.exports = Button;