import { getAllProvidersBasics } from "../../utils/providers";
import { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "./providers.module.scss";

interface IProvidersProps {
	allProviderBasics: {
		id: string;
		logo: string;
		name: string;
	}[];
}

const Providers = ({ allProviderBasics }: IProvidersProps) => {
	return (
		<section>
			<div className="container">
				<div className="row">
					{allProviderBasics.map((provider) => (
						<div className="col-12 mb-3" key={provider.id}>
							<div className="row">
								<div className="col-12 col-md-2">
									<Image
										src={`/${provider.logo}`}
										alt={`${provider.name} logo`}
										width={70}
										height={70}
										className={`ml-md-auto w-auto h-auto ${styles.Providers_logo}`}
									/>
								</div>
								<div className="col-12 col-md-9">
									<h2 className="h3 mt-1">
										<Link
											key={provider.id}
											href={`/about/provider/${provider.id}`}
										>
											{provider.name}
										</Link>
									</h2>
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
	const allProviderBasics = await getAllProvidersBasics();

	return {
		props: {
			allProviderBasics,
		},
	};
};
