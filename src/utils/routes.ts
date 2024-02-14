// children: if it has children, it is parent; children of that item
// If adding a page that already existed, check sitemaps so it's not duplicated
export const routes = [
	{ path: "/", name: "Home" },
	{ path: "/search", name: "Search" },
	{ path: "/submit", name: "Submit" },
	{ path: "/overview", name: "Overview" },
	{
		name: "More",
		children: [
			{
				path: "/about",
				name: "About",
			},
			{
				path: "/about/providers",
				name: "Data Providers",
			},
			{
				path: "https://documenter.getpostman.com/view/6493399/2s8ZDbX1e7",
				name: "API",
			},
			{
				path: "/cbioportal",
				name: "cBioPortal",
			},
			{
				path: "/training",
				name: "Training",
			},
			{
				path: "https://www.ebi.ac.uk/training/events/guide-identifying-suitable-patient-derived-cancer-models-cancermodelsorg/",
				name: "EMBL-EBI Training",
			},
			{
				path: "/contact",
				name: "Contact",
			},
		],
	},
];

export const routesWithGAEvents = [
	{
		routeName: "API",
		eventName: "view_api",
	},
	{
		routeName: "EMBL-EBI Training",
		eventName: "view_EMBLEBITraining",
	},
];
