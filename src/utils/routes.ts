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
				name: "CancerModels.Org",
			},
			{
				path: "/about/providers",
				name: "Data Providers",
			},
			{
				path: "https://documenter.getpostman.com/view/6493399/2s8ZDbX1e7",
				name: "API", // if changes, update GA event in footer and header
			},
			{
				path: "/training",
				name: "Training",
			},
			{
				path: "/contact",
				name: "Contact",
			},
		],
	},
];
