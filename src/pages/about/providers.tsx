import { getAllProvidersBasics } from "../../../lib/providers";
import { GetStaticProps } from "next";
import Link from "next/link";

interface IProvidersProps {
	allProviderBasics: {
		id: string;
		logo: string;
	}[];
}

const Providers = ({ allProviderBasics }: IProvidersProps) => {
	return allProviderBasics.map((provider) => (
		<Link key={provider.id} href={`/about/provider/${provider.id}`}>
			{provider.logo}
			{provider.id}
		</Link>
	));
};

export default Providers;

export const getStaticProps: GetStaticProps = async () => {
	const allProviderBasics = getAllProvidersBasics();

	return {
		props: {
			allProviderBasics,
		},
	};
};
