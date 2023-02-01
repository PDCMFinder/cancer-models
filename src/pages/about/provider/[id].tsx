import styles from "./Provider.module.scss";
import { getAllProvidersId, getProviderData } from "../../../utils/providers";
import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import Button from "../../../components/Button/Button";

interface IProviderProps {
	providerData: {
		abbreviation: string;
		name: string;
		logo: string;
		contentHtml: string;
	};
}

const Provider = ({ providerData }: IProviderProps) => {
	return (
		<>
			<section>
				<div className="container">
					<div className="row mb-5 align-center">
						<div className="col-12 col-md-9">
							<h1 className="m-0">{providerData.name}</h1>
						</div>
						<div className="col-12 col-md-3 text-left">
							<Image
								src={`/${providerData.logo}`}
								alt={`${providerData.name} logo`}
								width={150}
								height={150}
								className={`w-auto h-auto ${styles.Provider_logo}`}
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
								href={`/search?facets=model.data_source:${providerData.abbreviation}`}
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
	const paths = getAllProvidersId();

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const providerData = await getProviderData(params?.id as string);

	return {
		props: {
			providerData,
		},
	};
};
