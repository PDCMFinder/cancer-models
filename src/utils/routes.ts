// children: if it has children, it is parent; children of that item
export const routes = [
	{ path: "/", name: "Home" },
	{ path: "/search", name: "Search" },
	{ path: "/submit", name: "Submit Data" },
	{ path: "/overview", name: "Data Overview" },
	// { path: "/blog", name: "Blog" },
	{
		name: "About",
		children: [
			{
				path: "/about",
				name: "PDCM Finder",
			},
			// {
			// 	path: "/about/metadata-dictionary",
			// 	name: "Metadata Dictionary",
			// },
			// {
			// 	path: "/about/faq",
			// 	name: "FAQ",
			// },
			{
				path: "/contact",
				name: "Contact",
			},
		],
	},
];
