import fs from "fs";
import path from "path";
import matter from "gray-matter";

const providerDirectory = path.join(process.cwd(), "./public/static/providers");

export function getAllProvidersId() {
	const fileNames = fs.readdirSync(providerDirectory);

	return fileNames.map((fileName) => {
		return {
			params: {
				id: fileName.replace(/\.md$/, ""),
			},
		};
	});
}

export function getProviderData(id) {
	const fullPath = path.join(providerDirectory, `${id}.md`);
	const fileContents = fs.readFileSync(fullPath, "utf8");

	// Use gray-matter to parse the provider metadata section
	const matterResult = matter(fileContents);

	// Combine the data with the provider id
	return {
		id,
		...matterResult.data,
	};
}
