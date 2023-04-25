'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OverviewNavigation = function () {
	function OverviewNavigation(element) {
		var _this = this;

		_classCallCheck(this, OverviewNavigation);

		this.element = element;
		this.button = this.element.querySelector('.js-overview-navigation-button');
		this.isSmallScreen = false;
		this.isOutOfView = false;
		this.minimized = null;

		// a11y-toggle doesn't have a callback for when it's done initializing
		// so we have to wait for the next tick
		document.addEventListener('DOMContentLoaded', function () {
			setTimeout(function () {
				_this.attach();
				_this.onResize();
			}, 0);
		});
	}

	_createClass(OverviewNavigation, [{
		key: 'attach',
		value: function attach() {
			window.addEventListener('resize', this.onResize.bind(this));
			window.addEventListener('scroll', this.onScroll.bind(this));
		}
	}, {
		key: 'update',
		value: function update() {
			if (this.isSmallScreen || this.isOutOfView) {
				this.minimize();
			} else {
				this.maximize();
			}
		}
	}, {
		key: 'onResize',
		value: function onResize() {
			this.isSmallScreen = window.innerWidth <= 961;
			this.update();
		}
	}, {
		key: 'onScroll',
		value: function onScroll() {
			var viewportOffset = this.element.getBoundingClientRect();

			if (viewportOffset.top < 0) {
				this.isOutOfView = true;
			} else if (window.scrollY === 0) {
				this.isOutOfView = false;
			}

			this.update();
		}
	}, {
		key: 'updateButtonPosition',
		value: function updateButtonPosition() {
			var elementOffset = this.element.getBoundingClientRect();
			var buttonRect = this.button.getBoundingClientRect();

			// Use right and bottom to place this.button at the top left corner of the element
			this.button.style.right = window.innerWidth - elementOffset.right + elementOffset.width - buttonRect.width + 'px';
			this.button.style.bottom = window.innerHeight - elementOffset.top - buttonRect.height + 'px';
		}
	}, {
		key: 'minimize',
		value: function minimize() {
			if (this.minimized === true) {
				return;
			}

			this.button.style.transition = 'none';
			this.updateButtonPosition();
			// eslint-disable-next-line no-unused-expressions
			this.element.offsetHeight; // force reflow
			this.button.style.transition = 'right 0.25s ease-out, bottom 0.25s ease-out, opacity 0.25s ease-out';

			this.element.setAttribute('aria-hidden', 'true');
			this.element.classList.add('is-minimized');

			this.button.setAttribute('aria-expanded', 'false');
			this.button.classList.add('is-fixed');
			this.button.style.opacity = 1;

			this.minimized = true;
		}
	}, {
		key: 'maximize',
		value: function maximize() {
			if (this.minimized === false) {
				return;
			}

			this.element.setAttribute('aria-hidden', 'false');
			this.element.classList.remove('is-minimized');

			// eslint-disable-next-line no-unused-expressions
			this.element.offsetHeight; // force reflow

			this.updateButtonPosition();
			this.button.setAttribute('aria-expanded', 'true');
			this.button.classList.remove('is-fixed');
			this.button.style.opacity = 0;

			this.minimized = false;
		}
	}]);

	return OverviewNavigation;
}();

var overviewNavigations = document.querySelectorAll('.js-overview-navigation');

if (overviewNavigations) {
	[].forEach.call(overviewNavigations, function (overviewNavigation) {
		return new OverviewNavigation(overviewNavigation);
	});
}