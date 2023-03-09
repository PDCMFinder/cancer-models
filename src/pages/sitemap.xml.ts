import { routes } from "../utils/routes";
import path from "path";
import { promises as fs } from "fs";
import { GetServerSideProps } from "next";

// Alternative to host, host is more dynamic and adaptable than hardcoding the url
// const BASE_URL = "https://cancermodels.org";

function generateSiteMap(providers: string[], host: string): string {
	return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${routes
				.map((route) => {
					if (route.children?.length) {
						return route.children
							.map(
								(child) =>
									`<url>
                    <loc>${host}${child.path}</loc>
                  </url>`
							)
							.join("");
					} else {
						return `<url>
              <loc>${host}${route.path}</loc>
            </url>`;
					}
				})
				.join("")}
      <url>
        <loc>${host}/terms-of-use</loc>
      </url>
      <url>
        <loc>${host}/privacy-policy</loc>
      </url>
      <url>
        <loc>${host}/about/providers</loc>
      </url>
      ${providers
				.map(
					(provider) =>
						`<url>
              <loc>${host}/about/providers/${provider.replace(
							/\.md$/,
							""
						)}</loc>
            </url>`
				)
				.join("")}
    </urlset>
 `;
}

function SiteMap() {
	// getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
	const providersDirectory = path.join(
		process.cwd(),
		"/public/static/providers"
	);
	const providers = await fs.readdir(providersDirectory);

	// We generate the XML sitemap with the fetched data
	const sitemap = generateSiteMap(providers, req.headers.host as string);

	res.setHeader("Content-Type", "text/xml");
	// we send the XML to the browser
	res.write(sitemap);
	res.end();

	return {
		props: {},
	};
};

export default SiteMap;
