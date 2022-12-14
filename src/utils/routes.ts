// secondary: most right items, not main items
// parent: to add dropdown
// childTo: child to which parent (use parents name)
export const routes = [
	{ path: "/", name: "Home" },
	{ path: "/search", name: "Search" },
	{ path: "/submit", name: "Submit Data" },
	{ path: "/explore", name: "Explore" },
	{ path: "/blog", name: "Blog" },
	{ path: "/contact", name: "Contact", secondary: true },
	{ path: "/about/", name: "About", parent: true, secondary: true },
	{
		path: "/about/pdcm-finder",
		name: "PDCM Finder",
		childTo: "About",
	},
	{
		path: "/about/data-providers",
		name: "Data Providers",
		childTo: "About",
	},
	{
		path: "/about/privacy-policy",
		name: "Privacy Policy",
		childTo: "About",
	},
	{
		path: "/about/terms-of-use",
		name: "Terms of Use",
		childTo: "About",
	},
];
