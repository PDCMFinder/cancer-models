import styles from "./Provider.module.scss";
import { getAllProvidersId, getProviderData } from "../../../../lib/providers";
import { GetStaticProps, GetStaticPaths } from "next";

interface IProviderProps {
	providerData: {
		abbreviation: string;
		name: string;
		id: string;
		logo: string;
	};
}

const Provider = ({ providerData }: IProviderProps) => {
	return <div>{providerData.name}</div>;
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
