// secondary: most right items, not main items
// children: if it has children, its parent; children of that item
export const routes = [
	{ path: "/", name: "Home" },
	{ path: "/search", name: "Search" },
	{ path: "/submit", name: "Submit Data" },
	{ path: "/explore", name: "Explore" },
	// { path: "/blog", name: "Blog" },
	{ path: "/contact", name: "Contact", secondary: true },
	{
		name: "About",
		secondary: true,
		children: [
			{
				path: "/about/pdcm-finder",
				name: "PDCM Finder",
			},
			{
				path: "/about/data-providers",
				name: "Data Providers",
			},
			{
				path: "/about/privacy-policy",
				name: "Privacy Policy",
			},
			{
				path: "/about/terms-of-use",
				name: "Terms of Use",
			},
		],
	},
];
