import { remark } from "remark";
import html from "remark-html";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

export const getProcessedContent = async (fileName: string) => {
	const filePath = path.join(
		process.cwd(),
		`/public/static/content/${fileName}.md`
	);
	const fileContents = await fs.readFile(filePath, "utf8");
	const matterResult = await matter(fileContents);
	const processedContent = await remark()
		.use(html)
		.process(matterResult.content);

	return JSON.parse(JSON.stringify(processedContent.value)) as string;
};
