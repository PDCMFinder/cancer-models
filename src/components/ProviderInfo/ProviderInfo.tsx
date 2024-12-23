import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";
import {
	getProviderDataCounts,
	ProviderDataCounts
} from "../../apis/AggregatedData.api";
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

const chartCategories: Array<{
	title: string;
	dataEndPoint: keyof ProviderDataCounts;
}> = [
	{
		title: "Cancer system",
		dataEndPoint: "cancer_system"
	},
	{
		title: "Patient age",
		dataEndPoint: "patient_age"
	},
	{
		title: "Model type",
		dataEndPoint: "model_type"
	},
	{
		title: "Tumour type",
		dataEndPoint: "tumour_type"
	},
	{
		title: "Ethnicity",
		dataEndPoint: "patient_ethnicity"
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
						<div className="col" key={`providerDataCounts?.["cancer_system"]`}>
							<PieChart
								title="Cancer system"
								values={Object.values(
									providerDataCounts?.["cancer_system"] ?? {}
								)}
								labels={Object.keys(
									providerDataCounts?.["cancer_system"] ?? {}
								)}
								dataEndPoint="cancer_system"
							/>
						</div>
						<div className="col">
							<SunBurstChart
								title="Patient age"
								dataEndPoint="patient_age"
								data={providerDataCounts?.["patient_age"] ?? {}}
							/>
						</div>
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
