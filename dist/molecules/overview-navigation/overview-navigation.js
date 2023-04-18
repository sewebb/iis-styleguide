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
		this.minimized = false;

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
			this.updateButtonPosition();

			this.isSmallScreen = window.innerWidth < 960;
			this.update();
		}
	}, {
		key: 'onScroll',
		value: function onScroll() {
			this.updateButtonPosition();

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
			var viewportOffset = this.element.getBoundingClientRect();

			this.button.style.left = viewportOffset.left + 'px';
			this.button.style.top = viewportOffset.top + 'px';
		}
	}, {
		key: 'minimize',
		value: function minimize() {
			if (this.minimized) {
				return;
			}

			this.element.setAttribute('aria-hidden', 'true');
			this.element.classList.add('is-minimized');
			this.button.setAttribute('aria-expanded', 'false');
			this.button.classList.add('is-fixed');

			this.minimized = true;
		}
	}, {
		key: 'maximize',
		value: function maximize() {
			this.element.setAttribute('aria-hidden', 'false');
			this.element.classList.remove('is-minimized');
			this.button.setAttribute('aria-expanded', 'true');
			this.button.classList.remove('is-fixed');

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