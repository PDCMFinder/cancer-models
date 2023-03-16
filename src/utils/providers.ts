import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";

const providerDirectory = path.join(process.cwd(), "./public/static/providers");

export const getAllProvidersId = () => {
	const fileNames = fs.readdirSync(providerDirectory);

	return fileNames.map((fileName: string) => {
		return {
			params: {
				id: fileName.replace(/\.md$/, "") as string,
			},
		};
	});
};

export const getProviderData = async (id: string) => {
	const fullPath = path.join(providerDirectory, `${id}.md`);
	const fileContents = fs.readFileSync(fullPath, "utf8");

	// Use gray-matter to parse the provider metadata section
	const matterResult = matter(fileContents);

	const processedContent = await remark()
		.use(remarkHtml, { sanitize: true })
		.use(remarkGfm)
		.process(matterResult.content);
	const contentHtml = processedContent.toString();

	// Combine the data with the provider id
	return {
		contentHtml: contentHtml as string,
		...(matterResult.data as {
			abbreviation: string;
			name: string;
			logo: string;
		}),
	};
};
