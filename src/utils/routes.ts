// children: if it has children, it is parent; children of that item
// If adding a page that already existed, check sitemaps so it's not duplicated
export const routes = [
	{ path: "/", name: "Home" },
	{ path: "/search", name: "Search" },
	{ path: "/submit", name: "Submit" },
	{ path: "/overview", name: "Overview" },
	{
		path: "/contact",
		name: "Contact"
	},
	{
		name: "More",
		children: [
			{
				path: "/about",
				name: "About"
			},
			{
				path: "/about/providers",
				name: "Data Providers"
			},
			{
				path: "/validation/dictionary",
				name: "Metadata Dictionary"
			},
			{
				path: "/validation/validator",
				name: "Data Validator"
			},
			{
				path: "https://documenter.getpostman.com/view/6493399/2s8ZDbX1e7",
				name: "API",
				opensNewTab: true
			},
			{
				path: "/cbioportal",
				name: "cBioPortal",
				opensNewTab: true
			},
			{
				path: "https://github.com/PDCMFinder/",
				name: "Open source repositories",
				opensNewTab: true
			},
			{
				path: "/tutorials",
				name: "Tutorials"
			}
		]
	}
];

export const routesWithGAEvents = [
	{
		routeName: "API",
		eventName: "view_api"
	},
	{
		routeName: "cBioPortal",
		eventName: "view_cbioportal"
	}
];
