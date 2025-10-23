import * as agGrid from "ag-grid-community";
import {
	ModuleRegistry,
	AllCommunityModule
} from 'ag-grid-community';

ModuleRegistry.registerModules([
	AllCommunityModule,
]);

let gridApi;

const gridOptions = {
	columnDefs: [
		{ field: "athlete", width: 150 },
		{ field: "age", width: 90 },
		{ field: "country", width: 150 },
		{ field: "year", width: 90 },
		{ field: "date", width: 150 },
		{ field: "sport", width: 150 },
		{ field: "gold", width: 100 },
		{ field: "silver", width: 100 },
		{ field: "bronze", width: 100 },
		{ field: "total", width: 100 },
	],
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
gridApi = agGrid.createGrid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
	.then((response) => response.json())
	.then((data) => gridApi.setGridOption("rowData", data));
