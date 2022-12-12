export const routes = [
	{ path: "/", name: "Home" },
	{ path: "/search", name: "Advanced Search" },
	{ path: "/submit", name: "Submit Model Data" },
	{ path: "/explore", name: "Explore" },
	{ path: "/blog", name: "Blog" },
	{ path: "/contact", name: "Contact" },
	{ path: "", name: "About", parent: true },
	{ path: "/about/", name: "About PDCM Finder", child: true, childTo: "About" },
	{
		path: "/about/data-providers",
		name: "Data Providers",
		child: true,
		childTo: "About",
	},
	{
		path: "/about/privacy-policy",
		name: "Privacy Policy",
		child: true,
		childTo: "About",
	},
	{
		path: "/about/terms-of-use",
		name: "Terms of Use",
		child: true,
		childTo: "About",
	},
];
