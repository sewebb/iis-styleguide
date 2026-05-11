import { initTooltips } from '../../atoms/tooltip/tooltip';

const WHOIS_PIN_BREAKPOINT = 760;

const escapeHtml = (value) => String(value ?? '')
	.replace(/&/g, '&amp;')
	.replace(/</g, '&lt;')
	.replace(/>/g, '&gt;')
	.replace(/"/g, '&quot;')
	.replace(/'/g, '&#039;');

const renderTooltip = (tooltip) => {
	if (!tooltip) return '';

	const label = tooltip.label || 'Visa mer information';
	const placement = tooltip.placement || 'top';

	return `<button type="button" class="a-tooltip a-tooltip--small a-button a-button--standalone-icon a-button--icon" aria-label="${escapeHtml(label)}" data-tooltip-placement="${escapeHtml(placement)}">
		<span class="a-tooltip__text" hidden>${escapeHtml(tooltip.text)}</span>
		<svg class="icon a-button__icon" aria-hidden="true">
			<use xlink:href="#icon-info"></use>
		</svg>
	</button>`;
};

const renderLink = (link) => {
	if (!link) return '';

	const target = link.external ? ' target="_blank" rel="noopener"' : '';
	const icon = link.external
		? '<svg class="icon o-mega-menu__link__icon"><use xlink:href="#icon-external-link"></use></svg>'
		: '';

	return `<a href="${escapeHtml(link.href)}"${target}>${escapeHtml(link.text)}${icon}</a>`;
};

const renderButton = (button) => {
	if (!button) return '';

	const dataAttrs = Object.entries(button.data || {})
		.map(([key, value]) => ` data-${escapeHtml(key)}="${escapeHtml(value)}"`)
		.join('');
	const icon = button.icon
		? `<svg class="icon a-button__icon" aria-hidden="true"><use xlink:href="${escapeHtml(button.icon)}"></use></svg>`
		: '';

	return `<button type="button"${dataAttrs} class="a-button a-button--lemon-light a-button--small a-button--icon whois-button u-nowrap">
		<span class="a-button__text">${escapeHtml(button.text)}</span>
		${icon}
	</button>`;
};

const renderWhoisCell = (params) => {
	const value = params.value;

	if (!value) return '';

	if (typeof value !== 'object' || Array.isArray(value)) {
		return escapeHtml(value);
	}

	const parts = [];

	if (value.label) {
		const tooltip = value.tooltip
			? `<span class="whois-cell__inline-tooltip">${renderTooltip(value.tooltip)}</span>`
			: '';

		parts.push(`<span class="whois-cell__label-text">${escapeHtml(value.label)}</span>${tooltip}`);
	}

	if (value.text) {
		parts.push(`<span>${escapeHtml(value.text)}</span>`);
	}

	if (Array.isArray(value.lines)) {
		parts.push(`<span>${value.lines.map(escapeHtml).join('<br>')}</span>`);
	}

	if (value.link) {
		parts.push(renderLink(value.link));
	}

	if (value.button) {
		parts.push(renderButton(value.button));
	}

	return parts.join(' ');
};

const shouldWrapWhoisCell = (params) => {
	const value = params?.value;

	if (!value || typeof value !== 'object' || Array.isArray(value)) {
		return false;
	}

	return value.wrapText === true;
};

function getViewportWidth() {
	return window.visualViewport ? window.visualViewport.width : document.documentElement.clientWidth;
}

function shouldPinWhoisFieldColumn() {
	const w = getViewportWidth();

	return w > 0 && w < WHOIS_PIN_BREAKPOINT;
}

function getColumnApi(params) {
	return params.columnApi ||
		(params.api && typeof params.api.getColumnApi === 'function' ? params.api.getColumnApi() : null);
}

function setColumnsState(params, { state = [], defaultState = { hide: false, pinned: null } }) {
	const columnApi = getColumnApi(params);

	if (columnApi && typeof columnApi.applyColumnState === 'function') {
		columnApi.applyColumnState({ state, defaultState });
		return;
	}

	if (params.api && typeof params.api.applyColumnState === 'function') {
		params.api.applyColumnState({ state, defaultState });
		return;
	}

	if (columnApi && typeof columnApi.setColumnState === 'function') {
		if (typeof columnApi.resetColumnState === 'function') columnApi.resetColumnState();
		columnApi.setColumnState(state);
	}
}

function getWhoisGroups(data) {
	return data
		.filter((row) => row.section?.id && row.section?.label)
		.map((row) => ({
			id: row.section.id,
			label: row.section.label,
		}));
}

function getWhoisRowsByGroup(data, groups) {
	return groups.reduce((acc, group) => {
		acc[group.id] = data.filter((row) => row.group === group.id);

		return acc;
	}, {});
}

function buildWhoisMatrixRows(data, groups) {
	const rowsByGroup = getWhoisRowsByGroup(data, groups);
	const maxRows = Math.max(...groups.map((group) => rowsByGroup[group.id].length));

	return Array.from({ length: maxRows }, (_, index) => groups.reduce((row, group) => {
		const item = rowsByGroup[group.id][index];

		row[`${group.id}Field`] = item?.field || null;
		row[`${group.id}Value`] = item?.value || null;

		return row;
	}, {}));
}

function buildWhoisColumnDefs(groups) {
	return groups.map((group) => ({
		headerName: group.label,
		marryChildren: true,
		children: [
			{
				headerName: 'Uppgift',
				colId: `${group.id}.field`,
				field: `${group.id}Field`,
				cellRenderer: renderWhoisCell,
				cellClass: 'whois-cell--label',
				autoHeight: true,
				sortable: false,
				filter: false,
				minWidth: 220,
				flex: 1,
			},
			{
				headerName: 'Värde',
				colId: `${group.id}.value`,
				field: `${group.id}Value`,
				cellRenderer: renderWhoisCell,
				cellClassRules: {
					'whois-cell--wrap': (params) => shouldWrapWhoisCell(params),
				},
				autoHeight: true,
				sortable: false,
				filter: false,
				minWidth: 200,
				flex: 1.4,
			},
		],
	}));
}

function getWhoisColumnState(groups, activeGroupId) {
	const isMobile = shouldPinWhoisFieldColumn();

	return groups.flatMap((group) => {
		const hideGroup = isMobile && group.id !== activeGroupId;

		return [
			{
				colId: `${group.id}.field`,
				hide: hideGroup,
				pinned: null,
				width: isMobile ? 160 : 150,
				flex: isMobile ? null : 1,
			},
			{
				colId: `${group.id}.value`,
				hide: hideGroup,
				pinned: null,
				flex: isMobile ? 1 : 1.4,
			},
		];
	});
}

function applyWhoisResponsiveVisibility(params, groups, activeGroupId) {
	setColumnsState(params, {
		state: getWhoisColumnState(groups, activeGroupId),
	});
}

function updateSwitcherState(switcher, activeGroupId) {
	switcher.querySelectorAll('[data-whois-table-group]').forEach((button) => {
		const isActive = button.dataset.whoisTableGroup === activeGroupId;

		button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
	});
}

function createGroupSwitcher(el, groups, activeGroup, onChange) {
	const wrapper = el.closest('.ag-grid__wrapper');

	if (!wrapper || wrapper.previousElementSibling?.classList.contains('whois-table-switcher')) {
		return wrapper?.previousElementSibling || null;
	}

	const switcher = document.createElement('div');
	switcher.className = 'whois-table-switcher';
	switcher.setAttribute('aria-label', 'Välj grupp');
	switcher.innerHTML = groups.map((group) => (
		`<button type="button" class="whois-table-switcher__button" data-whois-table-group="${escapeHtml(group.id)}" aria-pressed="${group.id === activeGroup.id ? 'true' : 'false'}">${escapeHtml(group.label)}</button>`
	)).join('');

	switcher.addEventListener('click', (event) => {
		const button = event.target.closest('[data-whois-table-group]');

		if (!button) {
			return;
		}

		activeGroup.id = button.dataset.whoisTableGroup;
		updateSwitcherState(switcher, activeGroup.id);
		onChange(activeGroup.id);
	});

	wrapper.before(switcher);

	return switcher;
}

document.addEventListener('tableAdvanced:configure', (event) => {
	const { el } = event.detail;

	if (el.dataset.tableType !== 'whois') {
		return;
	}

	const groups = getWhoisGroups(event.detail.data);
	const activeGroup = { id: groups[0]?.id };

	el.dataset.whoisTable = 'true';
	event.detail.columnDefs = buildWhoisColumnDefs(groups);
	event.detail.rowData = buildWhoisMatrixRows(event.detail.data, groups);
	event.detail.gridOptions.suppressHorizontalScroll = false;
	event.detail.applyResponsiveVisibility = (params) => {
		applyWhoisResponsiveVisibility(params, groups, activeGroup.id);
	};
	event.detail.onReady.push((params) => {
		initTooltips(el);
		createGroupSwitcher(el, groups, activeGroup, () => {
			applyWhoisResponsiveVisibility(params, groups, activeGroup.id);
		});
	});
	event.detail.onGridSizeChanged.push((params) => {
		applyWhoisResponsiveVisibility(params, groups, activeGroup.id);
	});
	event.detail.onFirstDataRendered.push(() => {
		initTooltips(el);
	});
	event.detail.onModelUpdated.push(() => {
		initTooltips(el);
	});
});
