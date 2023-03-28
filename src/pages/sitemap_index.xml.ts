import { GetServerSideProps } from "next";

// Alternative to host, host is more dynamic and adaptable than hardcoding the url
// const BASE_URL = "https://cancermodels.org";

function generateSiteMap(host: string): string {
	return `
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>${host}/sitemap.xml</loc>
      </sitemap>
      <sitemap>
        <loc>${host}/sitemap1.xml</loc>
      </sitemap>
    </sitemapindex>
  `;
}

function SiteMap() {
	// getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
	const sitemap = generateSiteMap(req.headers.host as string);

	res.setHeader("Content-Type", "text/xml");
	// we send the XML to the browser
	res.write(sitemap);
	res.end();

	return {
		props: {},
	};
};

export default SiteMap;
