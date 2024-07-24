import Image from "next/image";
import Link from "next/link";
import Button from "../Button/Button";
import styles from "./ProviderInfo.module.scss";

interface IProviderInfoProps {
	provider: {
		id: string;
		parsedContent: string;
		abbreviation: string;
		logo: string;
		name: string;
	};
}

const ProviderInfo = ({ provider }: IProviderInfoProps) => {
	const parsedProvider = provider.abbreviation.replace(" ", "-");
	const providerName = provider.name;
	const providerId = provider.id;

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
								<p className="mt-1">
									<Link href={`/about/providers/${providerId}`}>
										Continue reading...
									</Link>
								</p>
							</div>
						</div>
					)}
					<div className="row">
						<div className="col-12">
							<h4 className="mb-0 d-inline mr-2">View models and data at:</h4>
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
};

export default ProviderInfo;
