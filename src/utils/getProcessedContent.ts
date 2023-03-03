import { remark } from "remark";
import remarkHtml from "remark-html";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";

export const getProcessedContent = async (fileName: string) => {
	const filePath = path.join(
		process.cwd(),
		`/public/static/content/${fileName}.md`
	);
	const fileContents = await fs.readFile(filePath, "utf8");
	const matterResult = await matter(fileContents);
	const processedContent = await remark()
		.use(remarkHtml, { sanitize: true })
		.use(remarkGfm)
		.use(remarkUnwrapImages)
		.process(await matterResult.content);

	return JSON.parse(JSON.stringify(processedContent.value)) as string;
};
