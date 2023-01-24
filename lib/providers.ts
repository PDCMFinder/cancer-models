import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const providerDirectory = path.join(process.cwd(), "./public/static/providers");

export const getAllProvidersBasics = () => {
	const providersFiles = fs.readdirSync(providerDirectory);

	return providersFiles.map((providerFile) => {
		const fullPath = path.join(providerDirectory, `/${providerFile}`);
		const fileContents = fs.readFileSync(fullPath, "utf8");

		// Use gray-matter to parse the provider metadata section
		const matterResult = matter(fileContents);

		// Combine the data with the provider id
		return {
			id: providerFile.replace(/\.md$/, ""),
			...(matterResult.data as {
				logo: string;
			}),
		};
	});
};

export const getAllProvidersId = () => {
	const fileNames = fs.readdirSync(providerDirectory);

	return fileNames.map((fileName) => {
		return {
			params: {
				id: fileName.replace(/\.md$/, ""),
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
		.use(html)
		.process(matterResult.content);
	const contentHtml = processedContent.toString();

	// Combine the data with the provider id
	return {
		id,
		contentHtml,
		...(matterResult.data as {
			abbreviation: string;
			name: string;
			logo: string;
		}),
	};
};
