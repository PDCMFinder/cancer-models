import nextMdx from "@next/mdx";
import remarkGfm from "remark-gfm";

const withMDX = nextMdx({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [],
	},
});

const nextConfig = {
	reactStrictMode: true,
	pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
	swcMinify: true,
	output: "standalone",
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "www.ebi.ac.uk",
			},
		],
	},
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "https://www.ebi.ac.uk/:path*",
			},
		];
	},
};

export default withMDX(nextConfig);
