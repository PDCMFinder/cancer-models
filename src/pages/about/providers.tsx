import { getAllProvidersBasics } from "../../utils/providers";
import { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "./providers.module.scss";
import { remark } from "remark";
import html from "remark-html";
import { useEffect, useState } from "react";

interface IProvidersProps {
	allProvidersBasics: {
		id: string;
		content: string;
		logo: string;
		name: string;
		abbreviation: string;
	}[];
}

const Providers = ({ allProvidersBasics }: IProvidersProps) => {
	const [providersBasics, setProvidersBasics] =
		useState<IProvidersProps["allProvidersBasics"]>(allProvidersBasics);

	useEffect(() => {
		const parseContent = async (content: string) => {
			const processedContent = await remark().use(html).process(content);

			return processedContent.toString();
		};

		let parsedAllProviderBasics: IProvidersProps["allProvidersBasics"] = [];

		allProvidersBasics.forEach(async (providerBasics) => {
			const temp = Object.assign({}, providerBasics);
			temp.content = await parseContent(providerBasics.content);
			temp.content = temp.content.substring(0, 420);

			parsedAllProviderBasics.push(temp);
		});

		setProvidersBasics(parsedAllProviderBasics);
	}, []);

	return (
		<section>
			<div className="container">
				<div className="row">
					{providersBasics.map((provider) => (
						<div className="col-12 mb-3" key={provider.id}>
							<div className="row">
								<div className="col-12 col-md-2">
									<Image
										src={`/${provider.logo}`}
										alt={`${provider.name} logo`}
										width={150}
										height={150}
										className={`ml-md-auto w-auto h-auto ${styles.Providers_logo}`}
									/>
								</div>
								<div className="col-12 col-md-9 mb-5">
									<div className="row">
										<div className="col-12 d-flex align-center">
											<h2 className="h3 my-0 mr-3">
												{/* <Link
											key={provider.id}
											href={`/about/provider/${provider.id}`}
										> */}
												{provider.name}
												{/* </Link> */}
											</h2>
											<Link
												href={`/search?facets=model.data_source:${provider.abbreviation}`}
											>
												<>See all {provider.abbreviation} models</>
											</Link>
										</div>
									</div>
									<div className="row">
										<div className="col-12">
											<div className={styles.Providers_content}>
												<div
													dangerouslySetInnerHTML={{
														__html: provider.content,
													}}
												/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-12">
											<Link href={`/about/provider/${provider.id}`}>
												Continue reading...
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Providers;

export const getStaticProps: GetStaticProps = async () => {
	const allProvidersBasics = await getAllProvidersBasics();

	return {
		props: {
			allProvidersBasics,
		},
	};
};
