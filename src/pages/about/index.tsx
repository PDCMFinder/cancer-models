import type { NextPage } from "next";
import { GetStaticProps } from "next";
import { remark } from "remark";
import html from "remark-html";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import Button from "../../components/Button/Button";

interface IAboutProps {
	content: any;
}

const About: NextPage<IAboutProps> = ({ content }: IAboutProps) => {
	return (
		<>
			<section>
				<div className="container">
					<div className="row">
						<div className="col-12 col-md-8 offset-md-2">
							<div
								dangerouslySetInnerHTML={{
									__html: content,
								}}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-12 col-md-8 offset-md-2">
							<h2>Our data providers</h2>
						</div>
						<div className="col-12 col-md-8 offset-md-2">
							<Button
								color="dark"
								priority="primary"
								htmlTag="a"
								href="/about/providers"
								className="mt-0"
							>
								View all our data providers
							</Button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default About;

export const getStaticProps: GetStaticProps = async () => {
	const filePath = path.join(process.cwd(), "/public/static/content/about.md");
	const fileContents = await fs.readFile(filePath, "utf8");
	const matterResult = await matter(fileContents);
	const processedContent = await remark()
		.use(html)
		.process(matterResult.content);

	return {
		props: {
			content: JSON.parse(JSON.stringify(processedContent.value)) as string,
		},
	};
};
