const TABLE_SELECTOR = '.js-table';
const TABLE_SCROLL_WRAPPER_SELECTOR = '.js-table-scroll-wrapper';
const TABLE_CONTAINER_SELECTOR = '.js-table-container';

function getHeaderLabels(table) {
	return Array.from(table.querySelectorAll('thead th'))
		.map((cell) => cell.textContent.replace(/\s+/g, ' ').trim())
		.filter(Boolean);
}

function syncLabels(table) {
	const labels = getHeaderLabels(table);

	if (!labels.length) {
		return;
	}

	table.querySelectorAll('tbody tr').forEach((row) => {
		Array.from(row.children).forEach((cell, index) => {
			if (!cell.dataset.label && labels[index]) {
				cell.dataset.label = labels[index];
			}
		});
	});
}

function updateScrollState(wrapper) {
	const container = wrapper.querySelector(TABLE_CONTAINER_SELECTOR);

	if (!container) {
		return;
	}

	const maxScrollLeft = Math.max(container.scrollWidth - container.clientWidth, 0);
	const hasOverflow = maxScrollLeft > 8;
	const scrollLeft = container.scrollLeft;

	wrapper.dataset.overflowing = hasOverflow ? 'true' : 'false';
	wrapper.dataset.scrollStart = !hasOverflow || scrollLeft <= 4 ? 'true' : 'false';
	wrapper.dataset.scrollEnd = !hasOverflow || scrollLeft >= maxScrollLeft - 4 ? 'true' : 'false';
}

function enhanceScrollableTable(wrapper) {
	if (wrapper.dataset.tableReady === 'true') {
		updateScrollState(wrapper);
		return;
	}

	const container = wrapper.querySelector(TABLE_CONTAINER_SELECTOR);
	const table = container?.querySelector(TABLE_SELECTOR);

	if (!container) {
		return;
	}

	wrapper.dataset.tableReady = 'true';

	const update = () => updateScrollState(wrapper);

	container.addEventListener('scroll', update, { passive: true });

	if ('ResizeObserver' in window) {
		const observer = new ResizeObserver(update);

		observer.observe(container);

		if (table) {
			observer.observe(table);
		}
	}

	update();
}

document.querySelectorAll(TABLE_SELECTOR).forEach(syncLabels);
document.querySelectorAll(TABLE_SCROLL_WRAPPER_SELECTOR).forEach(enhanceScrollableTable);

window.addEventListener('load', () => {
	document.querySelectorAll(TABLE_SCROLL_WRAPPER_SELECTOR).forEach(updateScrollState);
});
