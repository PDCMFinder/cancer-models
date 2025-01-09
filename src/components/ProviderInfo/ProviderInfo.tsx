import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";
import {
	getProviderDataCounts,
	ProviderDataCounts
} from "../../apis/AggregatedData.api";
import { capitalizeFirstLetter } from "../../utils/dataUtils";
import Button from "../Button/Button";
import PieChart from "../Charts/PieChart";
import SunBurstChart from "../Charts/SunBurstChart";
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

// const getChartDataType = <T extends keyof ProviderDataCounts>(
// 	data: ProviderDataCounts[T],
// 	chartType: string
// ) => {
// 	if (chartType === "SunBurstChart") {
// 		return data as Record<string, [Record<string, number>, number]>;
// 	} else {
// 		return data as Record<string, number>;
// 	}
// };

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

const chartCategories: Array<{
	title: string;
	dataEndPoint: keyof ProviderDataCounts;
	chartType: "PieChart" | "SunBurstChart";
}> = [
	{
		title: "Cancer system",
		dataEndPoint: "cancer_system",
		chartType: "PieChart"
	},
	{
		title: "Patient age",
		dataEndPoint: "patient_age",
		chartType: "SunBurstChart"
	},
	{
		title: "Model type",
		dataEndPoint: "model_type",
		chartType: "PieChart"
	},
	{
		title: "Tumour type",
		dataEndPoint: "tumour_type",
		chartType: "PieChart"
	},
	{
		title: "Ethnicity",
		dataEndPoint: "patient_ethnicity",
		chartType: "PieChart"
	}
];

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

	if (providerDataCounts?.patient_age) {
		console.log(
			transformSunBurstData(
				providerDataCounts?.patient_age as Record<
					string,
					[Record<string, number>, number]
				>
			).parents,
			transformSunBurstData(
				providerDataCounts?.patient_age as Record<
					string,
					[Record<string, number>, number]
				>
			).labels,
			transformSunBurstData(
				providerDataCounts?.patient_age as Record<
					string,
					[Record<string, number>, number]
				>
			).values
		);
	}

	return (
		<>
			<div className="col-12 col-md-2 text-center">
				{logo && (
					<Image
						src={`/${logo}`}
						alt={`${name} logo`}
						width={150}
						height={150}
						className={`mx-auto mb-2 w-auto h-auto ${styles.Providers_logo}`}
					/>
				)}
			</div>
			<div className="col-12 col-md-9 mb-5">
				<div className="row">
					<div className="col-12 d-flex align-center">
						<h2 className="h3 mt-0 mr-3">{name}</h2>
					</div>
				</div>
				{isLoading ? (
					<div style={{ height: "200px" }}>
						<Loader />
					</div>
				) : (
					<div className="row row-cols-2 row-cols-md-5 mb-4">
						{chartCategories.map(({ title, dataEndPoint, chartType }) => {
							const commonProps = {
								title,
								dataEndPoint,
								provider: abbreviation,
								data: providerDataCounts?.[dataEndPoint] ?? {}
							};

							return (
								<div className="col" key={dataEndPoint}>
									{chartType === "SunBurstChart" ? (
										<SunBurstChart
											{...commonProps}
											labels={
												transformSunBurstData(
													commonProps.data as Record<
														string,
														[Record<string, number>, number]
													>
												).labels
											}
											values={
												transformSunBurstData(
													commonProps.data as Record<
														string,
														[Record<string, number>, number]
													>
												).values
											}
											parents={
												transformSunBurstData(
													commonProps.data as Record<
														string,
														[Record<string, number>, number]
													>
												).parents
											}
										/>
									) : (
										<PieChart
											{...commonProps}
											data={commonProps.data as Record<string, number>}
										/>
									)}
								</div>
							);
						})}
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
		</>
	);
};

export default ProviderInfo;
