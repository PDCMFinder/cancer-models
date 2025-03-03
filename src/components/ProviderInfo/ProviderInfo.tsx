import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";
import {
	getProviderDataCounts,
	ProviderDataCounts
} from "../../apis/AggregatedData.api";
import { capitalizeFirstLetter } from "../../utils/dataUtils";
import Button from "../Button/Button";
import {
	datasetCountColors,
	patientAgeColors,
	patientEthnicityColors,
	tumourTypeColors
} from "../Charts/colors";
import PieChart from "../Charts/PieChart";
import RadialChart from "../Charts/RadialChart";
import SunBurstChart from "../Charts/SunBurstChart";
import ModelTypeIcon from "../Icons/ModelTypeIcon";
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

const transformSunBurstData = (data: ProviderDataCounts["patient_age"]) => {
	const labels: string[] = [];
	const values: number[] = [];
	const parents: string[] = [];

	Object.entries(data).forEach(([parent, [children, parentValue]]) => {
		if (parentValue) {
			labels.push(capitalizeFirstLetter(parent));
			values.push(parentValue);
			parents.push("");

			Object.entries(children).forEach(([child, value]) => {
				labels.push(capitalizeFirstLetter(child));
				values.push(value);
				parents.push(capitalizeFirstLetter(parent));
			});
		}
	});

	return { labels, values, parents };
};

const ProviderInfo = ({
	provider: { abbreviation, name, logo }
}: ProviderInfoProps) => {
	const { data: providerDataCounts, isLoading } = useQuery(
		["providerDataCounts", abbreviation],
		() => getProviderDataCounts(abbreviation),
		{
			enabled: !!abbreviation
		}
	);
	const parsedPatientAgeData = providerDataCounts
		? transformSunBurstData(
				providerDataCounts?.patient_age as Record<
					string,
					[Record<string, number>, number]
				>
		  )
		: ({} as {
				labels: string[];
				values: number[];
				parents: string[];
		  });

	return (
		<div className="col-12 mb-5">
			<div className="row mb-3">
				<div className="col-12 d-lg-flex align-center justify-content-between">
					{logo && (
						<Image
							src={`/${logo}`}
							alt={`${name} logo`}
							width={200}
							height={200}
							className={`mr-5 w-auto h-auto ${styles.Providers_logo}`}
							style={{ maxWidth: "200px" }}
							title={name}
						/>
					)}
					{providerDataCounts?.model_type && (
						<div className="row row-cols-4 row-cols-md-auto">
							{Object.entries(providerDataCounts?.model_type).map(
								([modelType, count]) => (
									<div className="my-3 col my-lg-0" key={modelType}>
										<Link
											href={`/search?filters=model_type:${modelType}+AND+data_source:${abbreviation}`}
											className="p text-noDecoration"
										>
											<div className="d-flex align-center flex-column text-center">
												<div
													style={{ height: "2em", width: "2em" }}
													className="d-flex align-center justify-content-center mb-1"
												>
													<ModelTypeIcon modelType={modelType} size="2em" />
												</div>
												<p className="mb-0 lh-1">
													<span className="text-family-primary d-block">
														{count.toLocaleString()}
													</span>
												</p>
											</div>
										</Link>
									</div>
								)
							)}
						</div>
					)}
				</div>
			</div>
			{isLoading ? (
				<div style={{ height: "500px" }}>
					<Loader />
				</div>
			) : (
				<div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 mb-4">
					{providerDataCounts?.cancer_system && (
						<div className="col">
							<PieChart
								title="Cancer system"
								dataEndPoint="cancer_system"
								provider={abbreviation}
								data={providerDataCounts?.cancer_system ?? {}}
							/>
						</div>
					)}
					{parsedPatientAgeData && (
						<div className="col">
							<SunBurstChart
								title="Patient age"
								dataEndPoint="patient_age"
								provider={abbreviation}
								labels={parsedPatientAgeData.labels ?? []}
								values={parsedPatientAgeData.values ?? []}
								parents={parsedPatientAgeData.parents ?? []}
								colors={patientAgeColors}
							/>
						</div>
					)}
					{providerDataCounts?.tumour_type && (
						<div className="col">
							<PieChart
								title="Tumour type"
								dataEndPoint="tumour_type"
								provider={abbreviation}
								data={providerDataCounts?.tumour_type ?? {}}
								colors={tumourTypeColors}
							/>
						</div>
					)}
					{providerDataCounts?.patient_ethnicity && (
						<div className="col">
							<PieChart
								title="Ethnicity"
								dataEndPoint="patient_ethnicity"
								provider={abbreviation}
								data={providerDataCounts?.patient_ethnicity ?? {}}
								colors={patientEthnicityColors}
							/>
						</div>
					)}
					{providerDataCounts?.dataset_available && (
						<div className="col">
							<RadialChart
								title="Dataset available"
								dataEndPoint="dataset_available"
								data={providerDataCounts?.dataset_available ?? {}}
								colors={datasetCountColors}
								totalModelCount={providerDataCounts?.totalModelCount ?? 0}
								provider={abbreviation}
							/>
						</div>
					)}
				</div>
			)}
			<div className="row">
				<div className="col-12 mb-2">
					<Link href={`/about/providers/${abbreviation}`}>
						Read more about {abbreviation} ...
					</Link>
				</div>
				<div className="col-12">
					<h4 className="mb-0 d-inline mr-2">View models and data at:</h4>
					<Button
						color="dark"
						priority="primary"
						className="mr-2 mt-0"
						href={`/search?dataEndPoints=data_source:${abbreviation}`}
						htmlTag="a"
					>
						CancerModels.Org
					</Button>
					<Button
						color="dark"
						priority="secondary"
						className="mt-0"
						href={`/cbioportal/study/clinicalData?id=${abbreviation}`}
						htmlTag="a"
						target="_blank"
					>
						cBioPortal
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ProviderInfo;
