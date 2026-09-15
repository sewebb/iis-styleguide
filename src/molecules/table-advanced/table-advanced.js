import * as agGrid from 'ag-grid-community';
import { themeQuartz, iconSetMaterial } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

// ---- THEME -----------------------------------------------------------
const iisTheme = themeQuartz
	.withPart(iconSetMaterial)
	.withParams({
		accentColor: '#0477CE',
		backgroundColor: '#FFFFFF',
		borderRadius: 3,
		browserColorScheme: 'light',
		cellTextColor: '#1F2A36',
		chromeBackgroundColor: { ref: 'foregroundColor', mix: 0.07, onto: 'backgroundColor' },
		fontFamily: 'inherit',
		fontSize: 16,
		foregroundColor: '#1F2A36',
		headerBackgroundColor: '#D8D8D8',
		headerFontFamily: 'inherit',
		headerFontSize: 16,
		headerFontWeight: 400,
		headerTextColor: '#1F2A36',
		oddRowBackgroundColor: '#EDEDED',
		wrapperBorderRadius: 3,
	});

// ---- RENDERERS -------------------------------------------------------
const renderStatusIcon = (params) => {
	const status = params.value;
	if (!status) return '';
	const map = {
		passed:        { icon: '#icon-security-variant', color: '#25c279', label: 'Passed' },
		failed:        { icon: '#icon-unsecure-variant', color: '#d9002f', label: 'Failed' },
		warning:       { icon: '#icon-warning-variant',  color: '#f99963', label: 'Warning' },
		error:         { icon: '#icon-unsecure-variant', color: '#8E9297', label: 'Error' },
		not_tested:    { icon: '#icon-unsecure-variant', color: '#d8d8d8', label: 'Not tested' },
		informational: { icon: '#icon-info-variant',     color: '#50b2fc', label: 'Informational' },
	};
	const { icon, color, label } = map[status] || {};
	return icon
		? `<span class="cell-center">
         <svg class="status-icon" fill="${color}" width="20" height="20" aria-label="${label}">
           <use xlink:href="${icon}"></use>
         </svg>
         <span class="status-text">${label}</span>
       </span>`
		: status;
};

// ---- HELPERS ---------------------------------------------------------
const titleCase = (s) => s.replace(/[_\-.]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

function buildColumnDefsFromData(data) {
	if (!Array.isArray(data) || data.length === 0) return [{ headerName: 'No Data', field: 'noData' }];
	const sample = data[0];

	// Internet.nl-like shape
	if (sample && sample.results && typeof sample.results === 'object') {
		const base = [
			{ headerName: 'Domain', field: 'domain', minWidth: 200 },
			{ headerName: 'Score (%)', field: 'score_percent', filter: 'agNumberColumnFilter', minWidth: 140 },
			{
				headerName: 'Report',
				field: 'report_url',
				cellRenderer: (p) => (p.value ? `<a href="${p.value}" target="_blank" rel="noopener">View</a>` : ''),
				maxWidth: 220,
				flex: 0,
			},
		];

		const resultKeys = Object.keys(sample.results);
		const childColIds = [];
		const children = resultKeys.map((k, idx) => {
			const colId = `results.${k}.status`;
			childColIds.push(colId);
			return {
				colId,
				headerName: titleCase(k),
				field: colId,
				cellRenderer: renderStatusIcon,
				tooltipValueGetter: (p) => {
					const since = p?.data?.results?.[k]?.since;
					return since ? `Since: ${since}` : '';
				},
				cellClass: (p) => `status-${p.value}`,
				minWidth: 150,
				sortable: true,
				filter: true,
				hide: idx > 0,                 // start collapsed (only first child visible)
			};
		});

		base.push({
			headerName: 'Results',
			headerGroupComponent: 'ExpandHeader',          // 👈 correct prop for groups
			headerGroupComponentParams: {
				childColIds,          // toggle these children together
				startExpanded: false, // set true to start expanded
			},
			children,
		});

		return base;
	}

	// Generic fallback
	const cols = [];
	for (const [key, val] of Object.entries(sample)) {
		if (val && typeof val === 'object' && !Array.isArray(val)) {
			for (const subKey of Object.keys(val)) {
				if (val[subKey] !== null && typeof val[subKey] !== 'object') {
					cols.push({
						headerName: `${titleCase(key)} • ${titleCase(subKey)}`,
						field: `${key}.${subKey}`,
						sortable: true,
						filter: true,
						minWidth: 140,
					});
				}
			}
		} else {
			cols.push({
				headerName: titleCase(key),
				field: key,
				sortable: true,
				filter: true,
				minWidth: 120,
			});
		}
	}
	return cols;
}

// Version-safe column state helper
function setColumnsState(params, { state = [], defaultState = { hide: false, pinned: null } }) {
	const columnApi =
		params.columnApi ||
		(params.api && typeof params.api.getColumnApi === 'function' ? params.api.getColumnApi() : null);

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
		return;
	}
	console.warn('No applicable column state API found in this AG Grid version.');
}

// Per-grid responsive visibility
function applyResponsiveVisibility(params, el) {
	const w = el?.getBoundingClientRect().width || el?.clientWidth || 0;
	if (w < 520) {
		setColumnsState(params, {
			state: [
				{ colId: 'domain', pinned: 'left' },
				{ colId: 'results.rpki.status', hide: true },
				{ colId: 'results.security_options.status', hide: true },
				{ colId: 'results.ipv6.status', hide: true },
			],
		});
	} else if (w < 760) {
		setColumnsState(params, {
			state: [
				{ colId: 'domain', pinned: null },
				{ colId: 'results.rpki.status', hide: true },
			],
		});
	} else {
		setColumnsState(params, { state: [] });
	}
}

function createTableExtensionContext(el, data, params) {
	const context = {
		el,
		data,
		params,
		columnDefs: buildColumnDefsFromData(data),
		rowData: data,
		gridOptions: {},
		applyResponsiveVisibility: null,
		onReady: [],
		onGridSizeChanged: [],
		onFirstDataRendered: [],
		onModelUpdated: [],
	};

	el.dispatchEvent(new CustomEvent('tableAdvanced:configure', {
		bubbles: true,
		detail: context,
	}));

	return context;
}

function applyGridOptions(api, gridOptions = {}) {
	Object.entries(gridOptions).forEach(([key, value]) => {
		api.setGridOption(key, value);
	});
}

function runExtensionCallbacks(callbacks = [], params, el) {
	callbacks.forEach((callback) => {
		callback(params, el);
	});
}

function applyTableResponsiveVisibility(extensionContext, params, el) {
	if (extensionContext?.applyResponsiveVisibility) {
		extensionContext.applyResponsiveVisibility(params, el);
		return;
	}

	applyResponsiveVisibility(params, el);
}


// ---- EXPAND/COLLAPSE GROUP HEADER -----------------------------------
class ExpandHeader {
	init(params) {
		this.params = params;
		this.childColIds = params.childColIds || [];
		this.expanded = !!params.startExpanded;

		// Debug: prove we mounted
		console.log('[ExpandHeader] init for group:', params.displayName, 'children:', this.childColIds);

		// Create a full-width, clickable label (no AG classes needed)
		const e = document.createElement('div');
		e.className = 'expand-header';
		e.style.cssText = 'display:flex;align-items:center;gap:6px;cursor:pointer;width:100%;';
		e.innerHTML = `
      <span class="expander js-table-advanced-expander" style="display:inline-block;transition:transform .15s">▶</span>
      <span class="title">${params.displayName ?? 'Group'}</span>
    `;

		e.addEventListener('click', () => {
			this.expanded = !this.expanded;
			this.updateIcon();
			toggleChildColumnsVisibility(params, this.childColIds, this.expanded);
		});

		this.eGui = e;
		this.updateIcon();

		// Apply initial expanded state
		if (this.expanded) {
			toggleChildColumnsVisibility(params, this.childColIds, true);
		}
	}
	updateIcon() {
		const icon = this.eGui.querySelector('.js-table-advanced-expander');
		if (icon) icon.style.transform = this.expanded ? 'rotate(90deg)' : 'rotate(0deg)';
	}
	getGui() { return this.eGui; }
	refresh() { return true; }
}

function toggleChildColumnsVisibility(params, colIds, makeVisible) {
	const columnApi =
		params.columnApi ||
		(params.api && typeof params.api.getColumnApi === 'function'
			? params.api.getColumnApi()
			: null);
	if (!columnApi) return;
	columnApi.setColumnsVisible(colIds, !!makeVisible);
	params.api?.sizeColumnsToFit?.();
}

// Factory to create per-grid options with the correct closures
function makeGridOptionsFor(el) {
	const autoHeight = el.dataset.autoHeight === 'true';
	let extensionContext = null;

	return {
		theme: iisTheme,
		domLayout: autoHeight ? 'autoHeight' : 'normal',
		components: { ExpandHeader },
		defaultColDef: {
			resizable: true,
			sortable: true,
			filter: true,
			flex: 1,
			minWidth: 150,
			unSortIcon: true,
		},
		columnDefs: [],
		rowData: [],
		async onGridReady(params) {
			try {
				// dynamic JSON import based on *this* element's data attribute
				const attr = el.dataset.json || './table.json';
				const jsonUrl = new URL(attr, import.meta.url).toString();
				const mod = await fetch(jsonUrl);
				const data = await mod.json();
				extensionContext = createTableExtensionContext(el, data, params);

				applyGridOptions(params.api, extensionContext.gridOptions);
				params.api.setGridOption('columnDefs', extensionContext.columnDefs);
				params.api.setGridOption('rowData', extensionContext.rowData);

				applyTableResponsiveVisibility(extensionContext, params, el);
				runExtensionCallbacks(extensionContext.onReady, params, el);

				if (!extensionContext.applyResponsiveVisibility) {
					params.api.sizeColumnsToFit();
				}
			} catch (e) {
				console.error('Dynamic JSON import failed for grid:', el, e);
			}
		},
		onGridSizeChanged(params) {
			applyTableResponsiveVisibility(extensionContext, params, el);
			runExtensionCallbacks(extensionContext?.onGridSizeChanged, params, el);

			if (!extensionContext?.applyResponsiveVisibility) {
				params.api.sizeColumnsToFit();
			}
		},
		onFirstDataRendered(params) {
			runExtensionCallbacks(extensionContext?.onFirstDataRendered, params, el);
		},
		onModelUpdated(params) {
			runExtensionCallbacks(extensionContext?.onModelUpdated, params, el);
		},
		animateRows: true,
	};
}

// ---- INIT ALL GRIDS --------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
	// Use a class selector so you can have multiple grids.
	const containers = document.querySelectorAll('.js-ag-grid');

	containers.forEach((el) => {
		if (!el.dataset.json) {
			return;
		}

		//if (!el.style.height) el.style.height = '600px';
		if (!el.style.width)  el.style.width  = '100%';

		const gridOptions = makeGridOptionsFor(el);
		agGrid.createGrid(el, gridOptions);

		// Per-grid ResizeObserver (don’t reuse one global API)
		const ro = new ResizeObserver(() => {
			gridOptions.api?.onGridSizeChanged();
		});
		ro.observe(el);
	});
});

// ---- TOGGLE FULLSCREEN STATE ON PARENT CONTAINER WHEN CLICKING FULLSCREEN BUTTON ----
document.querySelectorAll('.js-ag-grid-fullscreen').forEach((btn) => {
	btn.addEventListener('click', () => {

		// Find the nearest parent container for this button
		const gridEl = btn.closest('.js-ag-grid');
		if (!gridEl) return;

		// Toggle fullscreen state only for this specific element
		gridEl.dataset.fullscreenActive = gridEl.dataset.fullscreenActive === 'true' ? 'false' : 'true';
	});
});
