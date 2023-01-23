import type { NextPage } from "next";
import { getAllProvidersId } from "../../../lib/providers";
import { GetStaticProps } from "next";
import Link from "next/link";

interface IProvidersProps {
	allProviderIds: {
		params: {
			id: string;
		};
	}[];
}

const Providers = ({ allProviderIds }: IProvidersProps) => {
	return allProviderIds.map((provider) => (
		<Link href={`/about/provider/${provider.params.id}`}>
			{provider.params.id}
		</Link>
	));
};

export default Providers;

export const getStaticProps: GetStaticProps = async () => {
	const allProviderIds = getAllProvidersId();

	return {
		props: {
			allProviderIds,
		},
	};
};
