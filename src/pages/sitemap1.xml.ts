import { GetServerSideProps } from "next";

// Alternative to host, host is more dynamic and adaptable than hardcoding the url
// const BASE_URL = "https://cancermodels.org";

function generateSiteMap(
	modelProviderMixes: { data_source: string; external_model_id: string }[],
	host: string
): string {
	return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${modelProviderMixes
				.map(
					(modelproviderMix) =>
						`<url>
              <loc>${host}/data/models/${modelproviderMix.data_source}/${modelproviderMix.external_model_id}</loc>
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
	const modelProviderMixesRequest = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/search_index?select=external_model_id,data_source`
	);
	const modelProviderMixes = await modelProviderMixesRequest.json();

	// We generate the XML sitemap with the fetched data
	const sitemap = generateSiteMap(
		modelProviderMixes,
		req.headers.host as string
	);

	res.setHeader("Content-Type", "text/xml");
	// we send the XML to the browser
	res.write(sitemap);
	res.end();

	return {
		props: {},
	};
};

export default SiteMap;
