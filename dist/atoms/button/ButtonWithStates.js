'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ButtonWithStates = function () {
	function ButtonWithStates() {
		var _this = this;

		_classCallCheck(this, ButtonWithStates);

		this.handleMouseEnter = function () {
			switch (_this.states.current) {
				case 'default':
					_this.switchToState('defaultHover');
					break;
				case 'activated':
					_this.switchToState('deactivate');
					break;
				default:
				// Do nothing.
			}
		};

		this.handleMouseLeave = function () {
			switch (_this.states.current) {
				case 'defaultHover':
					_this.switchToState('default');
					break;
				case 'deactivate':
					_this.switchToState('activated');
					break;
				default:
				// Do nothing.
			}
		};

		this.handleClick = function () {
			switch (_this.states.current) {
				case 'default':
				case 'defaultHover':
					_this.switchToState('activated');
					break;
				case 'deactivate':
					_this.switchToState('default');
					break;
				default:
				// Do nothing.
			}
		};
	}

	_createClass(ButtonWithStates, [{
		key: 'init',
		value: function init(button) {
			this.button = button;
			this.dataset = button.dataset;
			this.buttonTexElm = this.button.querySelector('.a-button__text');

			// "iis-a-button" or "goto10-a-button" or similar.
			this.cssNamespace = this.button.classList.item(0);

			// Keep a reference to the original className so we can use
			// it as a base when adding classes for each state.
			// Will be something like "a-button a-button--large has-states"
			this.originalClassName = this.button.className;

			// Get state info from button data attributes.
			this.states = {
				default: {
					name: 'default',
					text: this.dataset.statebuttonDefaultText,
					icon: this.dataset.statebuttonDefaultIcon,
					backgroundColor: 'lemon'
				},
				defaultHover: {
					name: 'defaultHover',
					text: this.dataset.statebuttonDefaultText,
					icon: this.dataset.statebuttonDefaultIcon,
					backgroundColor: 'lemon-light'
				},
				activated: {
					name: 'activated',
					text: this.dataset.statebuttonActivatedText,
					icon: this.dataset.statebuttonActivatedIcon,
					backgroundColor: 'jade'
				},
				deactivate: {
					name: 'deactivate',
					text: this.dataset.statebuttonDeactivateText,
					icon: this.dataset.statebuttonDeactivateIcon,
					backgroundColor: 'ruby'
				},
				current: this.dataset.statebuttonStateCurrent
			};

			// Switch to default state.
			this.switchToState(this.states.current);

			this.addListeners();
		}

		/**
   * Add listeners.
   */

	}, {
		key: 'addListeners',
		value: function addListeners() {
			this.button.addEventListener('mouseenter', this.handleMouseEnter);
			this.button.addEventListener('mouseleave', this.handleMouseLeave);
			this.button.addEventListener('click', this.handleClick);
		}

		/**
   * Handle mouse enter.
   */


		/**
   * Handle mouse leave.
   */


		/**
   * Handle clicks on button.
   */

	}, {
		key: 'switchToState',


		/**
   * Switch to a state.
   */
		value: function switchToState(newStateName) {
			var newStateObj = this.states[newStateName];

			// Update text.
			this.buttonTexElm.innerText = newStateObj.text;

			// Update className.
			this.button.className = this.originalClassName;
			this.button.classList.add('background-' + newStateObj.backgroundColor);

			// Remove any previous icon.
			var prevIcon = this.button.querySelector('.icon');
			if (prevIcon) {
				this.button.querySelector('.icon').remove();
				this.button.classList.remove(this.cssNamespace + '--icon');
			}

			// And new icon.
			var iconName = newStateObj.icon;
			if (iconName) {
				this.button.classList.add(this.cssNamespace + '--icon');
				var iconClass = 'icon ' + this.cssNamespace + '__icon';
				var html = '\n\t\t\t\t<svg class="' + iconClass + '">\n\t\t\t\t\t<use xlink:href="#icon-' + iconName + '"></use>\n\t\t\t\t</svg>\n\t\t\t';

				this.button.appendChild(document.createRange().createContextualFragment(html));
			}

			// State updated, set new state as current state.
			var prevStateName = this.states.current;
			this.states.current = newStateName;

			// Trigger events for activating and deactivating.
			var eventName = void 0;
			if (prevStateName === 'defaultHover' && this.states.current === 'activated') {
				eventName = 'activated';
			} else if (prevStateName === 'deactivate' && this.states.current === 'default') {
				eventName = 'deactivated';
			}
			if (eventName) {
				var event = new Event(eventName);
				this.button.dispatchEvent(event);
			}
		}
	}]);

	return ButtonWithStates;
}();

module.exports = ButtonWithStates;