'use strict';

window.a11yTabs = function tabsComponentIIFE(global, document) {
	var tabInstances = new WeakMap();

	/**
 * Instantiates the component
 * @constructor
 * @param {DOM Node} element
 */
	var TabComponent = function TabComponent(element, options) {
		if (!element || !element.nodeType) {
			return;
		}

		var className = 'o-tab-list';
		var tablistElement = document.querySelector('.js-' + className);
		var namespace = getComputedStyle(tablistElement, ':before').content.replace(/["']/g, '');

		var defaults = {
			tabList: '.' + namespace + className,
			tabItem: '.' + namespace + className + '__item',
			tabLink: '.' + namespace + className + '__link',
			tabPanel: '.' + namespace + 'o-tab-panel'
		};

		this.options = Object.assign(defaults, options);

		this.element = element;
		this.tabList = element.querySelector(this.options.tabList);
		this.tabItems = [].slice.call(this.tabList.querySelectorAll(this.options.tabItem));
		this.tabLinks = [].slice.call(this.tabList.querySelectorAll(this.options.tabLink));
		this.tabPanels = [].slice.call(element.querySelectorAll(this.options.tabPanel));

		this.currentIndex = 0;

		this.tabList.setAttribute('role', 'tablist');

		this.tabItems.forEach(function (item, index) {
			item.setAttribute('role', 'presentation');

			if (index === 0) {
				item.setAttribute('data-tab-active', '');
			}
		});

		this.tabLinks.forEach(function (item, index) {
			item.setAttribute('role', 'tab');
			// item.setAttribute('id', `tab${index}`);

			if (index > 0) {
				item.setAttribute('tabindex', '-1');
			} else {
				item.setAttribute('aria-selected', 'true');
			}
		});

		this.tabPanels.forEach(function (item, index) {
			item.setAttribute('role', 'tabpanel');
			item.setAttribute('aria-labelledby', 'tab' + index);
			item.setAttribute('tabindex', '-1');

			if (index > 0) {
				item.setAttribute('hidden', '');
			}
		});

		this.eventCallback = handleEvents.bind(this); // eslint-disable-line
		this.tabList.addEventListener('click', this.eventCallback, false);
		this.tabList.addEventListener('keydown', this.eventCallback, false);

		tabInstances.set(this.element, this);

		this.eventCallback = handleEvents.bind(this); // eslint-disable-line
		this.tabList.addEventListener('click', this.eventCallback, false);
		this.tabList.addEventListener('keydown', this.eventCallback, false);

		tabInstances.set(this.element, this);

		// New line to select the correct tab based on URL hash
		this.selectTabFromHash(); // Call the new method after setup
	};

	TabComponent.prototype = {
		/**
  * Event handler for all tab interactions
  * @param {number} index - Index of the tab being activiated
  * @param {string} direction -
  */
		handleTabInteraction: function handleTabInteraction(index, direction) {
			var currentIndex = this.currentIndex;

			var newIndex = index;

			// The click event does not pass in a direction. This is for keyboard support
			if (direction) {
				if (direction === 37) {
					newIndex = index - 1;
				} else {
					newIndex = index + 1;
				}
			}

			// Supports continuous tabbing when reaching beginning or end of tab list
			if (newIndex < 0) {
				newIndex = this.tabLinks.length - 1;
			} else if (newIndex === this.tabLinks.length) {
				newIndex = 0;
			}

			// update tabs
			this.tabLinks[currentIndex].setAttribute('tabindex', '-1');
			this.tabLinks[currentIndex].removeAttribute('aria-selected');
			this.tabItems[currentIndex].removeAttribute('data-tab-active');

			this.tabLinks[newIndex].setAttribute('aria-selected', 'true');
			this.tabItems[newIndex].setAttribute('data-tab-active', '');
			this.tabLinks[newIndex].removeAttribute('tabindex');
			this.tabLinks[newIndex].focus();

			// update tab panels
			this.tabPanels[currentIndex].setAttribute('hidden', '');
			this.tabPanels[newIndex].removeAttribute('hidden');

			// After updating tabs and tab panels, add the URL update feature
			// Update the browser's URL hash to reflect the current tab's ID
			var selectedTabId = this.tabLinks[newIndex].id;
			global.history.pushState(null, '', '#' + selectedTabId);

			this.currentIndex = newIndex;

			return this;
		},

		/**
  * Set tab panel focus
  * @param {number} index - Tab panel index to receive focus
  */
		handleTabpanelFocus: function handleTabPanelFocus(index) {
			this.tabPanels[index].focus();

			return this;
		},
		/**
   * Selects a tab based on the URL hash
   */
		selectTabFromHash: function selectTabFromHash() {
			var hash = global.location.hash;

			if (hash) {
				var targetId = hash.substring(1); // Remove the '#' character
				var targetIndex = this.tabLinks.findIndex(function (link) {
					return link.id === targetId;
				});
				if (targetIndex !== -1) {
					this.handleTabInteraction(targetIndex);
				}
			}
		}
	};

	/**
 * Creates or returns existing component
 * @param {string} selector
 */
	function createTabComponent(selector, options) {
		var elements = document.querySelectorAll(selector);
		[].forEach.call(elements, function (element) {
			return tabInstances.get(element) || new TabComponent(element, options);
		});
	}

	/**
 * Destroys an existing component
 * @param {DOM Node} element
 */
	function destroyTabComponent(element) {
		if (!element || !element.nodeType) {
			return;
		}

		var component = tabInstances.get(element);
		component.tabList.removeAttribute('role', 'tablist');

		component.tabItems.forEach(function (item, index) {
			item.removeAttribute('role', 'presentation');

			if (index === 0) {
				item.removeAttribute('data-tab-active');
			}
		});

		component.tabLinks.forEach(function (item, index) {
			item.removeAttribute('role', 'tab');
			item.removeAttribute('id', 'tab' + index);

			if (index > 0) {
				item.removeAttribute('tabindex', '-1');
			} else {
				item.removeAttribute('aria-selected', 'true');
			}
		});

		component.tabPanels.forEach(function (item, index) {
			item.removeAttribute('role', 'tabpanel');
			item.removeAttribute('aria-labelledby', 'tab' + index);
			item.removeAttribute('tabindex', '-1');

			if (index > 0) {
				item.removeAttribute('hidden');
			}
		});

		component.tabList.removeEventListener('click', component.eventCallback);
		component.tabList.removeEventListener('keydown', component.eventCallback);
		tabInstances.delete(component.element);
	}

	/**
 * Handles all event listener callbacks
 * @param {event} event
 */
	function handleEvents(event) {
		if (event.type === 'click') {
			event.preventDefault();
			TabComponent.prototype.handleTabInteraction.call(this, this.tabLinks.indexOf(event.target));
		}

		if (event.type === 'keydown') {
			var index = this.tabLinks.indexOf(event.target);

			// Left and right arrows
			if (event.which === 37 || event.which === 39) {
				event.preventDefault();
				TabComponent.prototype.handleTabInteraction.call(this, index, event.which);
			}

			// Down arrow
			if (event.which === 40) {
				event.preventDefault();
				TabComponent.prototype.handleTabpanelFocus.call(this, index);
			}
		}
	}

	return {
		create: createTabComponent,
		destroy: destroyTabComponent
	};
}(window, document);

var tabComponent = a11yTabs.create('[data-tab-component]'); // eslint-disable-line