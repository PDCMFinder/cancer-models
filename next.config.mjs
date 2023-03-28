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
	experimental: {
		fontLoaders: [
			{ loader: "@next/font/google", options: { subsets: ["latin"] } },
		],
	},
	output: "standalone",
};

export default withMDX(nextConfig);
