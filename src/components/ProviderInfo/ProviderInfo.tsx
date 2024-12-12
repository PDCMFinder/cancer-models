import Image from "next/image";
import Button from "../Button/Button";
import PieChart from "../Charts/PieChart";
import styles from "./ProviderInfo.module.scss";

type ProviderInfoProps = {
	provider: {
		id: string;
		parsedContent: string;
		abbreviation: string;
		logo: string;
		name: string;
	};
};

const ProviderInfo = ({ provider }: ProviderInfoProps) => {
	const parsedProvider = provider.abbreviation.replace(" ", "-"),
		providerName = provider.name;

	return (
		<>
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
				<div className="row row-cols-4">
					<div className="col">
						<PieChart
							title="Models by"
							values={[16, 15, 12, 6, 5, 4, 42, 5, 4, 42, 5, 4, 42]}
							labels={[
								"US",
								"China",
								"European Union",
								"Russian Federation",
								"Brazil",
								"India",
								"Rest of World",
								"Brazail",
								"Indisa",
								"Rest fof World",
								"Brazails",
								"Indisas",
								"Rest fosf World"
							]}
						/>
					</div>
					<div className="col">
						<PieChart
							title="Models by"
							values={[16, 15, 12, 6, 5, 4, 42, 5, 4, 42, 5, 4, 42]}
							labels={[
								"US",
								"China",
								"European Union",
								"Russian Federation",
								"Brazil",
								"India",
								"Rest of World",
								"Brazail",
								"Indisa",
								"Rest fof World",
								"Brazails",
								"Indisas",
								"Rest fosf World"
							]}
						/>
					</div>
					<div className="col">
						<PieChart
							title="Models by"
							values={[16, 15, 12, 6, 5, 4, 42, 5, 4, 42, 5, 4, 42]}
							labels={[
								"US",
								"China",
								"European Union",
								"Russian Federation",
								"Brazil",
								"India",
								"Rest of World",
								"Brazail",
								"Indisa",
								"Rest fof World",
								"Brazails",
								"Indisas",
								"Rest fosf World"
							]}
						/>
					</div>
				</div>
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
		</>
	);
};

export default ProviderInfo;
