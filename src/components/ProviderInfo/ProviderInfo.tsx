import Image from "next/image";
import { countUniqueValues } from "../../utils/dataUtils";
import Button from "../Button/Button";
import PieChart from "../Charts/PieChart";
import styles from "./ProviderInfo.module.scss";
import providerInfoMockData from "./providerInfoMockData.json";

type ProviderInfoProps = {
	provider: {
		id: string;
		abbreviation: string;
		logo: string;
		name: string;
	};
};

const ProviderInfo = ({ provider }: ProviderInfoProps) => {
	const parsedProvider = provider.abbreviation.replace(" ", "-"),
		providerName = provider.name;

	// replace for API calls
	const histologyData = countUniqueValues(providerInfoMockData, "histology");
	const patientAgeData = countUniqueValues(providerInfoMockData, "patient_age");
	const modelTypeData = countUniqueValues(providerInfoMockData, "model_type");
	const tumourTypeData = countUniqueValues(providerInfoMockData, "tumour_type");
	const patientEthnicityData = countUniqueValues(
		providerInfoMockData,
		"patient_ethnicity"
	);

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
				<div className="row row-cols-5 mb-4">
					<div className="col">
						<PieChart
							title="Cancer system"
							values={Object.values(histologyData)}
							labels={Object.keys(histologyData)}
						/>
					</div>
					<div className="col">
						<PieChart
							title="Patient age"
							values={Object.values(patientAgeData)}
							labels={Object.keys(patientAgeData)}
						/>
					</div>
					<div className="col">
						<PieChart
							title="Model type"
							values={Object.values(modelTypeData)}
							labels={Object.keys(modelTypeData)}
						/>
					</div>
					<div className="col">
						<PieChart
							title="Tumour type"
							values={Object.values(tumourTypeData)}
							labels={Object.keys(tumourTypeData)}
						/>
					</div>
					<div className="col">
						<PieChart
							title="Ethnicity"
							values={Object.values(patientEthnicityData)}
							labels={Object.keys(patientEthnicityData)}
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
