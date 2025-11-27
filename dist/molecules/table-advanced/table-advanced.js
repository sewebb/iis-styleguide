"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _aggridcommunity = /*#__PURE__*/ _interop_require_wildcard(require("ag-grid-community"));
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
_aggridcommunity.ModuleRegistry.registerModules([
    _aggridcommunity.AllCommunityModule
]);
// ---- THEME -----------------------------------------------------------
const iisTheme = _aggridcommunity.themeQuartz.withPart(_aggridcommunity.iconSetMaterial).withParams({
    accentColor: '#0477CE',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    browserColorScheme: 'light',
    cellTextColor: '#1F2A36',
    chromeBackgroundColor: {
        ref: 'foregroundColor',
        mix: 0.07,
        onto: 'backgroundColor'
    },
    fontFamily: 'inherit',
    fontSize: 16,
    foregroundColor: '#1F2A36',
    headerBackgroundColor: '#D8D8D8',
    headerFontFamily: 'inherit',
    headerFontSize: 16,
    headerFontWeight: 400,
    headerTextColor: '#1F2A36',
    oddRowBackgroundColor: '#EDEDED',
    wrapperBorderRadius: 3
});
// ---- RENDERERS -------------------------------------------------------
const renderStatusIcon = (params)=>{
    const status = params.value;
    if (!status) return '';
    const map = {
        passed: {
            icon: '#icon-security-variant',
            color: '#25c279',
            label: 'Passed'
        },
        failed: {
            icon: '#icon-unsecure-variant',
            color: '#d9002f',
            label: 'Failed'
        },
        warning: {
            icon: '#icon-warning-variant',
            color: '#f99963',
            label: 'Warning'
        },
        error: {
            icon: '#icon-unsecure-variant',
            color: '#8E9297',
            label: 'Error'
        },
        not_tested: {
            icon: '#icon-unsecure-variant',
            color: '#d8d8d8',
            label: 'Not tested'
        },
        informational: {
            icon: '#icon-info-variant',
            color: '#50b2fc',
            label: 'Informational'
        }
    };
    const { icon, color, label } = map[status] || {};
    return icon ? `<span class="cell-center">
         <svg class="status-icon" fill="${color}" width="20" height="20" aria-label="${label}">
           <use xlink:href="${icon}"></use>
         </svg>
         <span class="status-text">${label}</span>
       </span>` : status;
};
// ---- HELPERS ---------------------------------------------------------
const titleCase = (s)=>s.replace(/[_\-\.]+/g, ' ').replace(/\b\w/g, (c)=>c.toUpperCase());
function buildColumnDefsFromData(data) {
    if (!Array.isArray(data) || data.length === 0) return [
        {
            headerName: 'No Data',
            field: 'noData'
        }
    ];
    const sample = data[0];
    // Internet.nl-like shape
    if (sample && sample.results && typeof sample.results === 'object') {
        const base = [
            {
                headerName: 'Domain',
                field: 'domain',
                minWidth: 200
            },
            {
                headerName: 'Score (%)',
                field: 'score_percent',
                filter: 'agNumberColumnFilter',
                minWidth: 140
            },
            {
                headerName: 'Report',
                field: 'report_url',
                cellRenderer: (p)=>p.value ? `<a href="${p.value}" target="_blank" rel="noopener">View</a>` : '',
                maxWidth: 220,
                flex: 0
            }
        ];
        const resultKeys = Object.keys(sample.results);
        const childColIds = [];
        const children = resultKeys.map((k, idx)=>{
            const colId = `results.${k}.status`;
            childColIds.push(colId);
            return {
                colId,
                headerName: titleCase(k),
                field: colId,
                cellRenderer: renderStatusIcon,
                tooltipValueGetter: (p)=>{
                    var _p_data_results_k, _p_data_results, _p_data;
                    const since = p == null ? void 0 : (_p_data = p.data) == null ? void 0 : (_p_data_results = _p_data.results) == null ? void 0 : (_p_data_results_k = _p_data_results[k]) == null ? void 0 : _p_data_results_k.since;
                    return since ? `Since: ${since}` : '';
                },
                cellClass: (p)=>`status-${p.value}`,
                minWidth: 150,
                sortable: true,
                filter: true,
                hide: idx > 0
            };
        });
        base.push({
            headerName: 'Results',
            headerGroupComponent: 'ExpandHeader',
            headerGroupComponentParams: {
                childColIds,
                startExpanded: false
            },
            children
        });
        return base;
    }
    // Generic fallback
    const cols = [];
    for (const [key, val] of Object.entries(sample)){
        if (val && typeof val === 'object' && !Array.isArray(val)) {
            for (const subKey of Object.keys(val)){
                if (val[subKey] !== null && typeof val[subKey] !== 'object') {
                    cols.push({
                        headerName: `${titleCase(key)} • ${titleCase(subKey)}`,
                        field: `${key}.${subKey}`,
                        sortable: true,
                        filter: true,
                        minWidth: 140
                    });
                }
            }
        } else {
            cols.push({
                headerName: titleCase(key),
                field: key,
                sortable: true,
                filter: true,
                minWidth: 120
            });
        }
    }
    return cols;
}
// Version-safe column state helper
function setColumnsState(params, { state = [], defaultState = {
    hide: false,
    pinned: null
} }) {
    const columnApi = params.columnApi || (params.api && typeof params.api.getColumnApi === 'function' ? params.api.getColumnApi() : null);
    if (columnApi && typeof columnApi.applyColumnState === 'function') {
        columnApi.applyColumnState({
            state,
            defaultState
        });
        return;
    }
    if (params.api && typeof params.api.applyColumnState === 'function') {
        params.api.applyColumnState({
            state,
            defaultState
        });
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
    const w = (el == null ? void 0 : el.getBoundingClientRect().width) || (el == null ? void 0 : el.clientWidth) || 0;
    if (w < 520) {
        setColumnsState(params, {
            state: [
                {
                    colId: 'domain',
                    pinned: 'left'
                },
                {
                    colId: 'results.rpki.status',
                    hide: true
                },
                {
                    colId: 'results.security_options.status',
                    hide: true
                },
                {
                    colId: 'results.ipv6.status',
                    hide: true
                }
            ]
        });
    } else if (w < 760) {
        setColumnsState(params, {
            state: [
                {
                    colId: 'domain',
                    pinned: null
                },
                {
                    colId: 'results.rpki.status',
                    hide: true
                }
            ]
        });
    } else {
        setColumnsState(params, {
            state: []
        });
    }
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
        var _params_displayName;
        e.innerHTML = `
      <span class="expander" style="display:inline-block;transition:transform .15s">▶</span>
      <span class="title">${(_params_displayName = params.displayName) != null ? _params_displayName : 'Group'}</span>
    `;
        e.addEventListener('click', ()=>{
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
        const icon = this.eGui.querySelector('.expander');
        if (icon) icon.style.transform = this.expanded ? 'rotate(90deg)' : 'rotate(0deg)';
    }
    getGui() {
        return this.eGui;
    }
    refresh() {
        return true;
    }
}
function toggleChildColumnsVisibility(params, colIds, makeVisible) {
    var _params_api_sizeColumnsToFit, _params_api;
    const columnApi = params.columnApi || (params.api && typeof params.api.getColumnApi === 'function' ? params.api.getColumnApi() : null);
    if (!columnApi) return;
    columnApi.setColumnsVisible(colIds, !!makeVisible);
    (_params_api = params.api) == null ? void 0 : (_params_api_sizeColumnsToFit = _params_api.sizeColumnsToFit) == null ? void 0 : _params_api_sizeColumnsToFit.call(_params_api);
}
// Factory to create per-grid options with the correct closures
function makeGridOptionsFor(el) {
    return {
        theme: iisTheme,
        components: {
            ExpandHeader
        },
        defaultColDef: {
            resizable: true,
            sortable: true,
            filter: true,
            flex: 1,
            minWidth: 150,
            unSortIcon: true
        },
        columnDefs: [],
        rowData: [],
        onGridReady (params) {
            return _async_to_generator(function*() {
                try {
                    // dynamic JSON import based on *this* element's data attribute
                    const attr = el.dataset.json || './table.json';
                    const jsonUrl = new URL(attr, require("url").pathToFileURL(__filename).toString()).toString();
                    const mod = yield fetch(jsonUrl);
                    const data = yield mod.json();
                    const cols = buildColumnDefsFromData(data);
                    params.api.setGridOption('columnDefs', cols);
                    params.api.setGridOption('rowData', data);
                    applyResponsiveVisibility(params, el);
                    params.api.sizeColumnsToFit();
                } catch (e) {
                    console.error('Dynamic JSON import failed for grid:', el, e);
                }
            })();
        },
        onGridSizeChanged (params) {
            applyResponsiveVisibility(params, el);
            params.api.sizeColumnsToFit();
        },
        animateRows: true
    };
}
// ---- INIT ALL GRIDS --------------------------------------------------
document.addEventListener('DOMContentLoaded', ()=>{
    // Use a class selector so you can have multiple grids;
    // make sure your HTML uses: <div class="ag-theme-quartz js-ag-grid" data-json="./table1.json"></div>
    const containers = document.querySelectorAll('.js-ag-grid');
    containers.forEach((el)=>{
        // Ensure theme class + measurable size BEFORE createGrid (each grid separately)
        if (!el.classList.contains('ag-theme-quartz')) el.classList.add('ag-theme-quartz');
        //if (!el.style.height) el.style.height = '600px';
        if (!el.style.width) el.style.width = '100%';
        const gridOptions = makeGridOptionsFor(el);
        const api = _aggridcommunity.createGrid(el, gridOptions);
        // Per-grid ResizeObserver (don’t reuse one global API)
        const ro = new ResizeObserver(()=>{
            var _gridOptions_api, _gridOptions_api1;
            (_gridOptions_api = gridOptions.api) == null ? void 0 : _gridOptions_api.onGridSizeChanged();
            (_gridOptions_api1 = gridOptions.api) == null ? void 0 : _gridOptions_api1.sizeColumnsToFit();
        });
        ro.observe(el);
    });
});
// ---- TOGGLE FULLSCREEN CLASS ON PARENT CONTAINER WHEN CLICKING FULLSCREEN BUTTON ----
document.querySelectorAll('[data-ag-grid-fullscreen]').forEach((btn)=>{
    btn.addEventListener('click', (e)=>{
        // Find the nearest parent container for this button
        const gridEl = btn.closest('.js-ag-grid');
        if (!gridEl) return;
        // Toggle fullscreen class only for this specific element
        gridEl.classList.toggle('has-fullscreen');
    });
});
