const TABLIST_SELECTOR = '.js-pill-tabs[role="tablist"]';
const TAB_SELECTOR = '.js-pill-tabs__tab[role="tab"]';
const PANEL_SELECTOR = '.js-pill-tabs__panel[role="tabpanel"]';

let tablistCounter = 0;

function ensureUniqueId(element, fallbackId) {
	const preferredId = element.id || fallbackId;
	let nextId = preferredId;
	let duplicate = document.getElementById(nextId);
	let suffix = 0;

	while (duplicate && duplicate !== element) {
		suffix += 1;
		nextId = `${preferredId}-${suffix}`;
		duplicate = document.getElementById(nextId);
	}

	element.id = nextId;

	return nextId;
}

function getInitialActiveIndex(tabs) {
	let classIndex = -1;

	for (let index = 0; index < tabs.length; index += 1) {
		const tab = tabs[index];

		if (tab.getAttribute('aria-selected') === 'true') {
			return index;
		}

		if (classIndex === -1 && tab.classList.contains('is-active')) {
			classIndex = index;
		}
	}

	return classIndex !== -1 ? classIndex : 0;
}

function getPanelsForTablist(tablist, maxPanels) {
	const panels = [];
	let nextSibling = tablist.nextElementSibling;

	while (nextSibling && panels.length < maxPanels) {
		if (nextSibling.matches(TABLIST_SELECTOR)) {
			break;
		}

		if (nextSibling.matches(PANEL_SELECTOR)) {
			panels.push(nextSibling);
		}

		nextSibling = nextSibling.nextElementSibling;
	}

	return panels;
}

function getTabFromEventTarget(target, tablist) {
	const tab = target.closest(TAB_SELECTOR);

	return tab && tab.parentElement === tablist ? tab : null;
}

function getWrappedIndex(index, length) {
	if (index < 0) {
		return length - 1;
	}

	if (index >= length) {
		return 0;
	}

	return index;
}

function setupTablist(tablist) {
	const tabs = Array.from(tablist.children)
		.filter((element) => element.matches(TAB_SELECTOR));

	if (!tabs.length) {
		return;
	}

	tablistCounter += 1;
	const tablistId = ensureUniqueId(tablist, `pill-tabs-${tablistCounter}`);
	const panels = getPanelsForTablist(tablist, tabs.length);
	const panelSet = new Set(panels);

	const panelByIndex = [];
	let activeIndex = getInitialActiveIndex(tabs);

	tablist.removeAttribute('tabindex');

	tabs.forEach((tab, index) => {
		const tabId = ensureUniqueId(tab, `${tablistId}-tab-${index + 1}`);
		let panel = null;
		const existingControl = tab.getAttribute('aria-controls');

		tab.dataset.pillTabIndex = `${index}`;

		if (existingControl) {
			const existingPanel = document.getElementById(existingControl);

			if (existingPanel && panelSet.has(existingPanel)) {
				panel = existingPanel;
			}
		}

		if (!panel) {
			panel = panels[index];
		}

		if (panel) {
			const panelId = ensureUniqueId(panel, `${tablistId}-panel-${index + 1}`);

			tab.setAttribute('aria-controls', panelId);
			panel.setAttribute('aria-labelledby', tabId);
			panel.setAttribute('tabindex', '-1');
			panelByIndex[index] = panel;
		} else {
			tab.removeAttribute('aria-controls');
			panelByIndex[index] = null;
		}
	});

	function setActiveTab(nextIndex, focusTab = false) {
		activeIndex = nextIndex;

		tabs.forEach((tab, index) => {
			const isActive = index === activeIndex;
			const panel = panelByIndex[index];

			tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
			tab.setAttribute('tabindex', isActive ? '0' : '-1');
			tab.classList.toggle('is-active', isActive);
			tab.setAttribute('data-state', isActive ? 'active' : 'inactive');

			if (panel) {
				panel.hidden = !isActive;
			}
		});

		if (focusTab) {
			tabs[activeIndex].focus();
		}
	}

	tablist.addEventListener('click', (event) => {
		const tab = getTabFromEventTarget(event.target, tablist);

		if (!tab) {
			return;
		}

		const nextIndex = Number(tab.dataset.pillTabIndex);

		if (Number.isNaN(nextIndex)) {
			return;
		}

		setActiveTab(nextIndex, true);
	});

	tablist.addEventListener('keydown', (event) => {
		const tab = getTabFromEventTarget(event.target, tablist);

		if (!tab) {
			return;
		}

		const currentIndex = Number(tab.dataset.pillTabIndex);
		const orientation = tablist.getAttribute('aria-orientation') === 'vertical' ? 'vertical' : 'horizontal';
		let nextIndex = null;

		if (Number.isNaN(currentIndex)) {
			return;
		}

		if ((event.key === 'ArrowRight' && orientation === 'horizontal')
			|| (event.key === 'ArrowDown' && orientation === 'vertical')) {
			nextIndex = currentIndex + 1;
		}

		if (event.key === 'Home') {
			nextIndex = 0;
		}

		if (event.key === 'End') {
			nextIndex = tabs.length - 1;
		}

		if ((event.key === 'ArrowLeft' && orientation === 'horizontal')
			|| (event.key === 'ArrowUp' && orientation === 'vertical')) {
			nextIndex = currentIndex - 1;
		}

		if (nextIndex !== null) {
			event.preventDefault();
			setActiveTab(getWrappedIndex(nextIndex, tabs.length), true);
		}
	});

	setActiveTab(activeIndex);
}

document.querySelectorAll(TABLIST_SELECTOR).forEach(setupTablist);
