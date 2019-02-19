'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var createFocusTrap = require('focus-trap');
var megaMenu = require('./organisms/mega-menu/mega-menu');

var ContainerToggle = function () {
	function ContainerToggle(element) {
		_classCallCheck(this, ContainerToggle);

		this.element = element;
		this.targetContainer = this.element.getAttribute('data-a11y-toggle');
		this.containerElement = document.getElementById(this.targetContainer);
		this.focusTrap = createFocusTrap('#' + this.targetContainer, { clickOutsideDeactivates: true });

		this.attach();
	}

	_createClass(ContainerToggle, [{
		key: 'attach',
		value: function attach() {
			var _this = this;

			this.element.addEventListener('click', this.handleFocusTrap.bind(this));
			window.addEventListener('mouseup', this.closeSearch.bind(this));

			document.addEventListener('keydown', function (e) {
				if (_this.element.getAttribute('aria-expanded') === 'true') {
					return;
				}

				if (e.keyCode === 9) {
					_this.containerElement.tabIndex = -1;
				}
			}, { once: true });
		}
	}, {
		key: 'handleFocusTrap',
		value: function handleFocusTrap() {
			var _this2 = this;

			setTimeout(function () {
				if (_this2.element.getAttribute('aria-expanded') === 'true') {
					_this2.containerElement.tabIndex = 0;
					_this2.focusTrap.activate();

					megaMenu.hide();
				} else {
					_this2.focusTrap.deactivate();
					_this2.containerElement.addEventListener('transitionend', function () {
						_this2.containerElement.tabIndex = -1;
					}, { once: true });
				}
			}, 10);
		}
	}, {
		key: 'closeSearch',
		value: function closeSearch(e) {
			if (e.target !== this.containerElement && e.target.parentNode !== this.containerElement && !this.containerElement.contains(e.target) && e.target !== this.element && this.element.getAttribute('aria-expanded') === 'true') {
				window.a11yToggle(this.containerElement);
			}
		}
	}]);

	return ContainerToggle;
}();

module.exports = function (element) {
	return new ContainerToggle(element);
};