"use strict";
window.a11yTabs = function tabsComponentIIFE(global, document1) {
    const tabInstances = new WeakMap();
    const className = 'o-tab-list';
    const tablistElement = document1.querySelector(`.js-${className}`);
    let updateURLFromHash;
    if (tablistElement) {
        updateURLFromHash = tablistElement.getAttribute('data-update-url');
    }
    /**
	* Instantiates the component
	* @constructor
	* @param {DOM Node} element
	*/ const TabComponent = function TabComponent(element, options) {
        if (!element || !element.nodeType) {
            return;
        }
        const namespace = getComputedStyle(tablistElement, ':before').content.replace(/["']/g, '');
        const defaults = {
            tabList: `.${namespace}${className}`,
            tabItem: `.${namespace}${className}__item`,
            tabLink: `.${namespace}${className}__link`,
            tabPanel: `.${namespace}o-tab-panel`
        };
        this.options = Object.assign(defaults, options);
        this.element = element;
        this.tabList = element.querySelector(this.options.tabList);
        this.tabItems = [].slice.call(this.tabList.querySelectorAll(this.options.tabItem));
        this.tabLinks = [].slice.call(this.tabList.querySelectorAll(this.options.tabLink));
        this.tabPanels = [].slice.call(element.querySelectorAll(this.options.tabPanel));
        this.currentIndex = 0;
        this.tabList.setAttribute('role', 'tablist');
        this.tabItems.forEach((item, index)=>{
            item.setAttribute('role', 'presentation');
            if (index === 0) {
                item.setAttribute('data-tab-active', '');
            }
        });
        this.tabLinks.forEach((item, index)=>{
            item.setAttribute('role', 'tab');
            if (index > 0) {
                item.setAttribute('tabindex', '-1');
            } else {
                item.setAttribute('aria-selected', 'true');
            }
        });
        this.tabPanels.forEach((item, index)=>{
            item.setAttribute('role', 'tabpanel');
            item.setAttribute('aria-labelledby', `tab${index}`);
            item.setAttribute('tabindex', '-1');
            if (index > 0) {
                item.setAttribute('hidden', '');
            }
        });
        this.eventCallback = handleEvents.bind(this);
        this.tabList.addEventListener('click', this.eventCallback, false);
        this.tabList.addEventListener('keydown', this.eventCallback, false);
        tabInstances.set(this.element, this);
        // Select the correct tab based on URL hash
        if (updateURLFromHash) {
            this.selectTabFromHash();
        }
    };
    TabComponent.prototype = {
        /**
		* Event handler for all tab interactions
		* @param {number} index - Index of the tab being activiated
		* @param {string} direction -
		*/ handleTabInteraction: function handleTabInteraction(index, direction) {
            const { currentIndex } = this;
            let newIndex = index;
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
            this.tabLinks[newIndex].focus(); // Focus the newly selected tab
            // update tab panels
            this.tabPanels[currentIndex].setAttribute('hidden', '');
            this.tabPanels[newIndex].removeAttribute('hidden');
            // Update the browser's URL hash to reflect the current tab's ID
            const selectedTabId = this.tabLinks[newIndex].id;
            if (updateURLFromHash) {
                window.history.pushState(null, '', `#${selectedTabId}`);
            }
            this.currentIndex = newIndex;
            return this;
        },
        /**
		* Set tab panel focus
		* @param {number} index - Tab panel index to receive focus
		*/ handleTabpanelFocus: function handleTabPanelFocus(index) {
            this.tabPanels[index].focus();
            return this;
        },
        /**
		 * Selects a tab based on the URL hash
		 */ selectTabFromHash () {
            const { hash } = global.location;
            if (hash) {
                const targetId = hash.substring(1); // Remove the '#' character
                const targetIndex = this.tabLinks.findIndex((link)=>link.id === targetId);
                if (targetIndex !== -1) {
                    this.handleTabInteraction(targetIndex);
                }
            }
        }
    };
    /**
	* Creates or returns existing component
	* @param {string} selector
	*/ function createTabComponent(selector, options) {
        const elements = document1.querySelectorAll(selector);
        [].forEach.call(elements, (element)=>tabInstances.get(element) || new TabComponent(element, options));
    }
    /**
	* Destroys an existing component
	* @param {DOM Node} element
	*/ function destroyTabComponent(element) {
        if (!element || !element.nodeType) {
            return;
        }
        const component = tabInstances.get(element);
        component.tabList.removeAttribute('role', 'tablist');
        component.tabItems.forEach((item, index)=>{
            item.removeAttribute('role', 'presentation');
            if (index === 0) {
                item.removeAttribute('data-tab-active');
            }
        });
        component.tabLinks.forEach((item, index)=>{
            item.removeAttribute('role', 'tab');
            item.removeAttribute('id', `tab${index}`);
            if (index > 0) {
                item.removeAttribute('tabindex', '-1');
            } else {
                item.removeAttribute('aria-selected', 'true');
            }
        });
        component.tabPanels.forEach((item, index)=>{
            item.removeAttribute('role', 'tabpanel');
            item.removeAttribute('aria-labelledby', `tab${index}`);
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
	*/ function handleEvents(event) {
        if (event.type === 'click') {
            event.preventDefault();
            TabComponent.prototype.handleTabInteraction.call(this, this.tabLinks.indexOf(event.target));
        }
        if (event.type === 'keydown') {
            const index = this.tabLinks.indexOf(event.target);
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
// eslint-disable-next-line no-unused-vars,no-undef
const tabComponent = a11yTabs.create('[data-tab-component]');
