import type { NextPage } from "next";
import { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "./providers.module.scss";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import Button from "../../../components/Button/Button";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

interface IProvidersProps {
	allProvidersBasics: {
		id: string;
		parsedContent: string;
		abbreviation: string;
		logo: string;
		name: string;
	}[];
}

const Providers: NextPage<IProvidersProps> = ({
	allProvidersBasics,
}: IProvidersProps) => {
	return (
		<>
			<header className="bg-primary-primary text-white mb-5 py-5">
				<div className="container">
					<div className="row py-5">
						<div className="col-12">
							<h1 className="m-0">Our data providers</h1>
						</div>
					</div>
				</div>
			</header>
			<section>
				<div className="container">
					<div className="row">
						{allProvidersBasics?.map((provider) => (
							<div className="col-12 mb-3" key={provider.id}>
								<div className="row">
									<div className="col-12 col-md-2">
										<Image
											src={`/${provider.logo}`}
											alt={`${provider.name} logo`}
											width={150}
											height={150}
											className={`ml-md-auto mb-2 w-auto h-auto ${styles.Providers_logo}`}
										/>
									</div>
									<div className="col-12 col-md-9 mb-5">
										<div className="row">
											<div className="col-12 d-flex align-center">
												<h2 className="h3 mt-0 mr-3">{provider.name}</h2>
											</div>
										</div>
										<div className="row mb-3">
											<div className="col-12">
												<div className={styles.Providers_content}>
													<div
														dangerouslySetInnerHTML={{
															__html: provider.parsedContent,
														}}
													/>
												</div>
											</div>
										</div>
										<div className="row mb-3">
											<div className="col-12">
												<Link
													href={`/about/providers/${provider.id}`}
													className="mr-3"
												>
													Continue reading...
												</Link>
												<Button
													color="dark"
													priority="primary"
													href={`/search?facets=model.data_source:${provider.abbreviation}`}
													htmlTag="a"
												>
													<>See all {provider.abbreviation} models</>
												</Button>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default Providers;

export const getStaticProps: GetStaticProps = async () => {
	const providersDirectory = path.join(
		process.cwd(),
		"/public/static/providers"
	);
	const providersFiles = await fs.readdir(providersDirectory);

	const allProvidersBasicsFirst = providersFiles.map(
		async (providerFile: string) => {
			const fullPath = path.join(providersDirectory, providerFile);
			const fileContents = await fs.readFile(fullPath, "utf8");
			const matterResult = await matter(fileContents);
			const processedContent = await remark()
				.use(remarkHtml, { sanitize: true })
				.use(remarkGfm)
				.use(remarkUnwrapImages)
				.process(matterResult.content);

			return {
				id: providerFile.replace(/\.md$/, "") as string,
				text: matterResult.content,
				parsedContent: JSON.parse(
					JSON.stringify(processedContent.value)
				) as string,
				...(matterResult.data as {
					abbreviation: string;
					logo: string;
					name: string;
				}),
			};
		}
	);

	return {
		props: {
			allProvidersBasics: await Promise.all(allProvidersBasicsFirst),
		},
	};
};
