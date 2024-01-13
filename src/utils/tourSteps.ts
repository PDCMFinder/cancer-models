import { DriveStep } from "driver.js";

// /search page
export const searchTourSteps: DriveStep[] = [
	{
		element: "#searchBar",
		popover: {
			title: "Cancer diagnosis search",
			description:
				"Search bar where you can input and search by cancer diagnosis Eg. Melanoma.",
			side: "bottom",
			align: "center",
		},
	},
	{
		element: "#tour_filters",
		popover: {
			title: "Search results filters",
			description: "Narrow your search results to suit your needs.",
			side: "right",
			align: "center",
		},
	},
	{
		element: "#sortBy",
		popover: {
			title: "Change sorting order",
			description: "Sort the current search results by different criteria.",
			side: "left",
			align: "center",
		},
	},
	{
		element: "#tour_searchResult",
		popover: {
			title: "Search result",
			description:
				"A single cancer model based on your search query and/or filtering.",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#tour_searchResult",
		popover: {
			description:
				"Check the bottom right checkbox ('Add to compare') to continue.",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#tour_compareCard",
		popover: {
			title: "Compare",
			description:
				"Includes the models you've chosen to compare. Keep checking more boxes to add.",
			side: "left",
			align: "center",
		},
	},
	{
		popover: {
			description:
				"More detailed information can be found at our <a href='/training' target='_blank'>training page</a>",
			side: "left",
			align: "center",
		},
	},
];

// /compare
export const compareTourSteps: DriveStep[] = [
	{
		element: "#tour_modelsToCompare",
		popover: {
			title: "Models to compare",
			description: "This are the models that have their data being compared",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#tour_compare-metadata",
		popover: {
			title: "Patient / tumour metadata",
			// description: "Metadata",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#tour_compare-engraftment",
		popover: {
			title: "PDX Model Engraftment",
			// description: "Metadata",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#tour_compare-qualityControl",
		popover: {
			title: "Model quality control",
			// description: "Metadata",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#tour_compare-availableData",
		popover: {
			title: "Available data",
			// description: "Metadata",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#tour_compare-buttons",
		popover: {
			title: "Compare buttons",
			description:
				"Click any of the corresponding model buttons to view more detailed information",
			side: "top",
			align: "center",
		},
	},
	{
		popover: {
			description:
				"More detailed information can be found at our <a href='/training' target='_blank'>training page</a>",
			side: "left",
			align: "center",
		},
	},
];

// /data/models/[provider]/[modelId]
export const modelTourSteps: DriveStep[] = [
	{
		element: "#tour_model-histologyType",
		popover: {
			title: "Model histology and type",
			description: "Eg. Breast Cancer (histology) - PDX (type)",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#tour_model-id",
		popover: {
			title: "Model id",
			description: "Model unique identifier given by CancerModels.Org",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#tour_model-score",
		popover: {
			title: "Model score",
			description:
				"Score related to the amount of information available about the model, not the quality of the model.",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#tour_model-providerInfo",
		popover: {
			title: "Model provider",
			description: "Provider information and contact",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#metadata",
		popover: {
			title: "Model metadata",
			description: "Metadata for model",
			side: "top",
			align: "center",
		},
		// onHighlightStarted: (element) => {
		// 	if (!element) {
		// 		driverObj.moveNext();
		// 	}
		// },
	},
	{
		element: "#engraftments",
		popover: {
			title: "Model engraftment",
			description: "engraftment for model",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#quality-control",
		popover: {
			title: "Model quality control",
			description: "quality control for model",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#molecular-data",
		popover: {
			title: "Model molecular data",
			description: "molecular data for model",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#immune-markers",
		popover: {
			title: "Model immune markers",
			description: "immune markers for model",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#dosing-studies",
		popover: {
			title: "Model dosing studies",
			description: "dosing studies for model",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#patient-treatment",
		popover: {
			title: "Model patient treatment",
			description: "patient treatment for model",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#histology-images",
		popover: {
			title: "Model histology images",
			description: "histology images for model",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#publications",
		popover: {
			title: "Model publications",
			description: "publications for model",
			side: "top",
			align: "center",
		},
	},
	{
		popover: {
			description:
				"More detailed information can be found at our <a href='/training' target='_blank'>training page</a>",
			side: "left",
			align: "center",
		},
	},
];
