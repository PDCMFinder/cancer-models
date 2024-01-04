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
			description: "Includes the models you've chosen to compare",
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
];
