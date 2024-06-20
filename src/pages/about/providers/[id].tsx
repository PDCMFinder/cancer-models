import type { NextPage } from "next";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Button from "../../../components/Button/Button";
import { getProviderData } from "../../../utils/providers";
import styles from "./Provider.module.scss";

interface IProviderProps {
	providerData: {
		abbreviation: string;
		name: string;
		logo: string;
		contentHtml: string;
	};
}

const Provider: NextPage<IProviderProps> = ({
	providerData
}: IProviderProps) => {
	return (
		<>
			{/* page metadata */}
			<Head>
				<title>{`Cancer Model Data providers: ${providerData.name}`}</title>
				<meta
					name="description"
					content="Discover our network of data providers enriching the ecosystem of patient-derived cancer model information."
				/>
			</Head>
			<section>
				<div className="container">
					<div className="row mb-5 align-center">
						<div className="col-12 col-md-9">
							<h1 className="m-0">{providerData.name}</h1>
						</div>
						<div className="col-12 col-md-3">
							<Image
								src={`/${providerData.logo}`}
								alt={`${providerData.name} logo`}
								width={3500}
								height={3500}
								className={`w-auto h-auto mx-auto ${styles.Provider_logo}`}
								priority={false}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-12 col-md-8 offset-md-2">
							<div
								dangerouslySetInnerHTML={{ __html: providerData.contentHtml }}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-12 text-center">
							<Button
								color="dark"
								priority="primary"
								href={`/search?filters=data_source:${providerData.abbreviation.replace(
									" ",
									"-"
								)}`}
								htmlTag="a"
							>
								<>See all {providerData.abbreviation} models</>
							</Button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Provider;

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: "blocking"
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const providerData = await getProviderData(params?.id as string);

	return {
		props: {
			providerData,
			revalidate: 600
		}
	};
};
