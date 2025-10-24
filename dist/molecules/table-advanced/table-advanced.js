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
// to use iisTheme in an application, pass it to the theme grid option
const iisTheme = _aggridcommunity.themeQuartz.withPart(_aggridcommunity.iconSetMaterial).withParams({
    accentColor: "#0477CE",
    backgroundColor: "#FFFFFF",
    borderRadius: 3,
    browserColorScheme: "light",
    cellTextColor: "#1F2A36",
    chromeBackgroundColor: {
        ref: "foregroundColor",
        mix: 0.07,
        onto: "backgroundColor"
    },
    fontFamily: "inherit",
    fontSize: 16,
    foregroundColor: "#1F2A36",
    headerBackgroundColor: "#D8D8D8",
    headerFontFamily: "inherit",
    headerFontSize: 16,
    headerFontWeight: 400,
    headerTextColor: "#1F2A36",
    oddRowBackgroundColor: "#EDEDED",
    wrapperBorderRadius: 3
});
let gridApi;
const gridOptions = {
    theme: iisTheme,
    sortable: true,
    suppressAutoHideAllSortIcons: true,
    columnDefs: [
        {
            headerName: 'Domain',
            field: 'domain',
            sortable: true,
            filter: true
        },
        {
            headerName: 'Score (%)',
            field: 'score_percent',
            sortable: true,
            filter: 'agNumberColumnFilter',
            width: 120
        },
        {
            headerName: 'Report',
            field: 'report_url',
            cellRenderer: (params)=>{
                return params.value ? `<a href="${params.value}" target="_blank" rel="noopener">View</a>` : '';
            }
        },
        {
            headerName: 'Results',
            children: [
                {
                    headerName: 'IPv6',
                    field: 'results.ipv6.status',
                    sortable: true,
                    filter: true,
                    cellClass: (params)=>`status-${params.value}`
                },
                {
                    headerName: 'DNSSEC',
                    field: 'results.dnssec.status',
                    sortable: true,
                    filter: true,
                    cellClass: (params)=>`status-${params.value}`
                },
                {
                    headerName: 'HTTPS',
                    field: 'results.https.status',
                    sortable: true,
                    filter: true,
                    cellClass: (params)=>`status-${params.value}`
                },
                {
                    headerName: 'Security Options',
                    field: 'results.security_options.status',
                    sortable: true,
                    filter: true,
                    cellClass: (params)=>`status-${params.value}`
                },
                {
                    headerName: 'RPKI',
                    field: 'results.rpki.status',
                    sortable: true,
                    filter: true,
                    cellClass: (params)=>`status-${params.value}`
                }
            ]
        }
    ]
};
(function fillLarge() {
    setWidthAndHeight("100%");
})();
function setWidthAndHeight(size) {
    const eGridDiv = document.querySelector("#myGrid");
    eGridDiv.style.setProperty("width", size);
    eGridDiv.style.setProperty("height", size);
}
const gridDiv = document.querySelector("#myGrid");
gridApi = _aggridcommunity.createGrid(gridDiv, gridOptions);
fetch('public/assets/json/table.json').then((res)=>_async_to_generator(function*() {
        const ct = res.headers.get('content-type') || '';
        if (!res.ok) {
            const body = yield res.text();
            throw new Error(`Fetch failed ${res.status} ${res.statusText}\n${body.slice(0, 200)}`);
        }
        if (!ct.includes('application/json')) {
            const body = yield res.text();
            throw new Error(`Expected JSON, got ${ct}. First 200 chars:\n${body.slice(0, 200)}`);
        }
        return res.json();
    })()).then((data)=>{
    console.log('Loaded JSON rows:', Array.isArray(data) ? data.length : data);
}).catch((e)=>{
    console.error(e);
});
