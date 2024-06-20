import { promises as fs } from "fs";
import matter from "gray-matter";
import type { NextPage } from "next";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import { remark } from "remark";
import remarkHtml from "remark-html";
import Button from "../../../components/Button/Button";
import styles from "./providers.module.scss";

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
	allProvidersBasics
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
						{allProvidersBasics?.map((provider) => {
							const parsedProvider = provider.abbreviation.replace(" ", "-"),
								providerName = provider.name,
								providerId = provider.id;

							return (
								<div className="col-12 mb-3" key={providerId}>
									<div className="row">
										<div className="col-12 col-md-2 text-center">
											{provider.logo && (
												<Image
													src={`/${provider.logo}`}
													alt={`${providerName} logo`}
													width={150}
													height={150}
													className={`mx-auto mb-2 w-auto h-auto ${styles.Providers_logo}`}
												/>
											)}
										</div>
										<div className="col-12 col-md-9 mb-5">
											<div className="row">
												<div className="col-12 d-flex align-center">
													<h2 className="h3 mt-0 mr-3">{providerName}</h2>
												</div>
											</div>
											{provider.parsedContent && (
												<div className="row mb-3">
													<div className="col-12">
														<div className={styles.Providers_content}>
															<div
																dangerouslySetInnerHTML={{
																	__html: provider.parsedContent
																}}
															/>
														</div>
														<Link
															href={`/about/providers/${providerId}`}
															className="mt-0"
														>
															Continue reading...
														</Link>
													</div>
												</div>
											)}
											<div className="row">
												<div className="col-12">
													<h4 className="mb-0 d-inline mr-2">
														View models and data at:
													</h4>
													<Button
														color="dark"
														priority="primary"
														className="mr-2 mt-0"
														href={`/search?filters=data_source:${parsedProvider}`}
														htmlTag="a"
													>
														<>CancerModels.Org</>
													</Button>
													<Button
														color="dark"
														priority="secondary"
														className="mt-0"
														href={`/cbioportal/study/clinicalData?id=${parsedProvider}`}
														htmlTag="a"
														target="_blank"
													>
														<>cBioPortal</>
													</Button>
												</div>
											</div>
										</div>
									</div>
								</div>
							);
						})}
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
				})
			};
		}
	);

	return {
		props: {
			allProvidersBasics: await Promise.all(allProvidersBasicsFirst)
		}
	};
};
