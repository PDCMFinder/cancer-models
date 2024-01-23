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
			description:
				"Narrow your search results to suit your needs using one or multiple filter options.",
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
				"Individual cancer model based on your search query and/or filtering.",
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
				"Includes the models you've chosen to compare. Keep checking more boxes to add and then compare.",
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
			description:
				"This are the models that have their data being compared. You can remove models you don't want to compare anymore. At least 2 models are needed at all times.",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#tour_compare-metadata",
		popover: {
			title: "Patient / tumour metadata",
			description:
				"This section provides information about the patient and tumour. It includes clinical information such as patient demographics, and tumour characteristics.",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#tour_compare-engraftment",
		popover: {
			title: "PDX Model Engraftment",
			description:
				"This section provides details about the successful engraftment of Patient-Derived Xenograft (PDX) models such as the establishment of the model, engraftment success rates, and relevant details about the transplantation process.",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#tour_compare-qualityControl",
		popover: {
			title: "Model quality control",
			description:
				"This section provides information on methods/protocols used to ensure the quality and reliability of the data and models.",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#tour_compare-availableData",
		popover: {
			title: "Available data",
			description:
				"Data that's available for this models. More data for this sections can be found in each individual model page.",
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
			description: "[histology] - [type]",
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
			description:
				"This section provides information about the patient and tumour. It includes clinical information such as patient demographics, and tumour characteristics.",
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
			description:
				"This section provides details about the successful engraftment of Patient-Derived Xenograft (PDX) models such as the establishment of the model, engraftment success rates, and relevant details about the transplantation process.",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#quality-control",
		popover: {
			title: "Model quality control",
			description:
				"This section provides information on methods/protocols used to ensure the quality and reliability of the data and models.",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#molecular-data",
		popover: {
			title: "Model molecular data",
			description:
				"This section provides information about molecular characterization of cancer models, such as expression, copy number alteration, mutation, biomarkers data. This provides an insight into the genetic makeup of tumour. ",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#immune-markers",
		popover: {
			title: "Model immune markers",
			description:
				"This section provides information about the immune response within the tumour microenvironment.  ",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#dosing-studies",
		popover: {
			title: "Model dosing studies",
			description:
				"This section provides information about the drug dosage and response of the drug in the cancer models, which provides insights into understanding the drug efficacy.",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#patient-treatment",
		popover: {
			title: "Model patient treatment",
			description:
				"This section provides information about the treatment dosage and response of the treatment in the cancer models, which provides insights into understanding the treatment efficacy.",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#histology-images",
		popover: {
			title: "Model histology images",
			description:
				"This section provides histology images associated with models, which provides deeper understanding of the tumour morphology.",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#publications",
		popover: {
			title: "Model publications",
			description:
				"This section provides relevant publications associated with the cancer models.",
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
