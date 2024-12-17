import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";
import { getProviderDataCounts } from "../../apis/AggregatedData.api";
import Button from "../Button/Button";
import PieChart from "../Charts/PieChart";
import Loader from "../Loader/Loader";
import styles from "./ProviderInfo.module.scss";

type ProviderInfoProps = {
	provider: {
		id: string;
		abbreviation: string;
		logo: string;
		name: string;
	};
};

const ProviderInfo = ({ provider }: ProviderInfoProps) => {
	const providerName = provider.name;

	const { data: providerDataCounts, isLoading } = useQuery(
		["providerDataCounts", provider.abbreviation],
		() => getProviderDataCounts(provider.abbreviation),
		{
			enabled: !!provider.abbreviation
		}
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
				{isLoading ? (
					<div style={{ height: "200px" }}>
						<Loader />
					</div>
				) : (
					<div className="row row-cols-2 row-cols-md-5 mb-4">
						<div className="col">
							<PieChart
								title="Cancer system"
								values={Object.values(providerDataCounts?.histology ?? {})}
								labels={Object.keys(providerDataCounts?.histology ?? {})}
							/>
						</div>
						<div className="col">
							<PieChart
								title="Patient age"
								values={Object.values(providerDataCounts?.patient_age ?? {})}
								labels={Object.keys(providerDataCounts?.patient_age ?? {})}
							/>
						</div>
						<div className="col">
							<PieChart
								title="Model type"
								values={Object.values(providerDataCounts?.model_type ?? {})}
								labels={Object.keys(providerDataCounts?.model_type ?? {})}
							/>
						</div>
						<div className="col">
							<PieChart
								title="Tumour type"
								values={Object.values(providerDataCounts?.tumour_type ?? {})}
								labels={Object.keys(providerDataCounts?.tumour_type ?? {})}
							/>
						</div>
						<div className="col">
							<PieChart
								title="Ethnicity"
								values={Object.values(
									providerDataCounts?.patient_ethnicity ?? {}
								)}
								labels={Object.keys(
									providerDataCounts?.patient_ethnicity ?? {}
								)}
							/>
						</div>
					</div>
				)}
				<div className="row">
					<div className="col-12 mb-2">
						<Link href={`/about/providers/${provider.abbreviation}`}>
							Read more about {provider.abbreviation} ...
						</Link>
					</div>
					<div className="col-12">
						<h4 className="mb-0 d-inline mr-2">View models and data at:</h4>
						<Button
							color="dark"
							priority="primary"
							className="mr-2 mt-0"
							href={`/search?filters=data_source:${provider.abbreviation}`}
							htmlTag="a"
						>
							<>CancerModels.Org</>
						</Button>
						<Button
							color="dark"
							priority="secondary"
							className="mt-0"
							href={`/cbioportal/study/clinicalData?id=${provider.abbreviation}`}
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
