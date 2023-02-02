import { getAllProvidersBasics } from "../../utils/providers";
import { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "./providers.module.scss";
import { remark } from "remark";
import html from "remark-html";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";

interface IProvidersProps {
	allProvidersBasics: {
		id: string;
		content: string;
		logo: string;
		name: string;
		abbreviation: string;
		parsedContent: string;
	}[];
}

const Providers = ({ allProvidersBasics }: IProvidersProps) => {
	const [initialRendercomplete, setInitialRendercomplete] = useState(false);

	useEffect(() => {
		setInitialRendercomplete(true);
	}, []);

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
			{!initialRendercomplete ? (
				<Loader />
			) : (
				<section>
					<div className="container">
						<div className="row">
							{allProvidersBasics.map((provider) => (
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
														href={`/about/provider/${provider.id}`}
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
			)}
		</>
	);
};

export default Providers;

export const getStaticProps: GetStaticProps = async () => {
	const allProvidersBasicsFirst = await getAllProvidersBasics();

	let parsedAllProviderBasics: IProvidersProps["allProvidersBasics"] = [];
	allProvidersBasicsFirst.forEach(async (providerBasics) => {
		const processedContent = await remark()
			.use(html)
			.process(providerBasics.content);

		providerBasics.parsedContent = processedContent
			.toString()
			.substring(0, 420);

		parsedAllProviderBasics.push(providerBasics);
	});

	return {
		props: {
			allProvidersBasics: parsedAllProviderBasics,
		},
	};
};
