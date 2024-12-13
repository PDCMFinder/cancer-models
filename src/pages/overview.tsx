import { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import {
	getCancerHierarchy,
	getLatestDataReleaseInformation,
	getModelCount,
	getModelsByMutatedGene,
	getModelsByPatientAge,
	getModelsByPatientEthnicity,
	getModelsByPatientSex,
	getModelsByTreatment,
	getModelsByTumourType,
	getProviderCount
} from "../apis/AggregatedData.api";
import Button from "../components/Button/Button";
import BarChart from "../components/Charts/BarChart";
import PieChart from "../components/Charts/PieChart";
import Loader from "../components/Loader/Loader";

const DynamicCirclePacking = dynamic(
	() => import("../components/CirclePacking/CirclePacking"),
	{
		loading: () => <Loader style={{ height: "300px" }} />
	}
);

function collapseAgeGroup(
	ageGroupList: { patient_age: string; count: number }[]
) {
	const pediatricAgeGroups = ["0 - 23 months", "2 - 9", "10 - 19"];
	const adultAgeGroups = [
		"20 - 29",
		"30 - 39",
		"40 - 49",
		"50 - 59",
		"60 - 69",
		"70 - 79",
		"80 - 89",
		"90 - 99"
	];
	const mappedAgeGroups: any = {
		pediatric: { label: "Pediatric", count: 0, ranges: pediatricAgeGroups },
		adult: { label: "Adult", count: 0, ranges: adultAgeGroups },
		"Not Provided": { count: 0, ranges: ["Not Provided"] }
	};
	ageGroupList.forEach((a) => {
		if (pediatricAgeGroups.includes(a.patient_age)) {
			mappedAgeGroups.pediatric.count += a.count;
		} else if (adultAgeGroups.includes(a.patient_age)) {
			mappedAgeGroups.adult.count += a.count;
		} else {
			mappedAgeGroups["Not Provided"].count += a.count;
		}
	});

	return Object.keys(mappedAgeGroups).map((e) => {
		const group = mappedAgeGroups[e];

		return {
			label: group.label,
			patient_age: group.ranges.join(", "),
			count: group.count
		};
	});
}

const Overview: NextPage = () => {
	const notValidCategories = ["not provided", "not collected"];

	let modelsByCancerHierarchy = useQuery("modelsByCancerHierarchy", () => {
		return getCancerHierarchy();
	});
	let modelsByTreatment = useQuery("modelsByTreatment", () => {
		return getModelsByTreatment();
	});
	let modelsByMutatedGene = useQuery("modelsByMutatedGene", () => {
		return getModelsByMutatedGene();
	});
	let modelsByPatientSex = useQuery("modelsByPatientSex", () => {
		return getModelsByPatientSex();
	});
	let modelsByTumourType = useQuery("modelsByTumourType", () => {
		return getModelsByTumourType();
	});
	let modelsByPatientEthnicity = useQuery("modelsByPatientEthnicity", () => {
		return getModelsByPatientEthnicity();
	});
	let modelsByPatientAge = useQuery("modelsByPatientAge", () => {
		return getModelsByPatientAge();
	});
	let providerCount = useQuery("providerCount", () => {
		return getProviderCount();
	});
	let modelCount = useQuery("modelCount", () => {
		return getModelCount();
	});
	let latestDataReleaseInfo = useQuery("latestDataReleaseInfo", () => {
		return getLatestDataReleaseInformation();
	});

	const router = useRouter();

	const onGraphClick = (
		node: any,
		filterId: string,
		onClickFilters?: boolean
	) => {
		router.push({
			pathname: "/search",
			search: `?filters=${filterId}:${
				node.data[onClickFilters ? "onClickFilters" : filterId]
			}`
		});
	};

	return (
		<>
			{/* page metadata */}
			<Head>
				<title>Comprehensive Overview of Patient-Derived Cancer Models</title>
				<meta
					name="description"
					content="Gain insights of PDX, organoid, and cell line models data on our portal."
				/>
				<meta
					name="keywords"
					content="Patient-derived cancer models, overview, research insights"
				/>
			</Head>
			<header className="bg-primary-primary text-white mb-5 py-5">
				<div className="container">
					<div className="row py-5">
						<div className="col-12 col-lg-8">
							<h1 className="m-0">
								Find the right PDX, organoid or cell line patient-derived cancer
								model for your next project.
							</h1>
						</div>
					</div>
				</div>
			</header>
			<section>
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h2>Current data release</h2>
							<ul>
								{latestDataReleaseInfo.data ? (
									<li>
										Data release version: {latestDataReleaseInfo.data.tag_name}
									</li>
								) : null}
								{latestDataReleaseInfo.data ? (
									<li>
										Date of publication:{" "}
										{latestDataReleaseInfo.data?.released_at}
									</li>
								) : null}
								<li>Number of models: {modelCount.data ?? 10000}</li>
								<li>Number of providers: {providerCount.data ?? 56}</li>
							</ul>
							<Link href="/about/releases">Release log</Link>
						</div>
					</div>
				</div>
			</section>
			<section>
				<div className="container">
					<div className="row mb-5">
						<div className="col-12 col-md-6 col-lg-4">
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
						<div className="col-md-6 col-lg-4">
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
						<div className="col-md-6 col-lg-4">
							<BarChart
								title="Models by"
								x={[
									"giraffes",
									"orangutans",
									"monkeys",
									"girafdfes",
									"orangsutans",
									"monkaeys",
									"girafdfdes",
									"orangsuatans",
									"monkaseys"
								]}
								y={[20, 14, 23, 20, 14, 23, 20, 14, 23, 20, 14, 23]}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-12 text-center">
							<Button
								href="/submit"
								priority="primary"
								color="dark"
								className="mb-1 mr-md-3"
								htmlTag="a"
							>
								Submit model data
							</Button>
							<Button
								href="/search"
								priority="secondary"
								color="dark"
								className="mt-1 ml-md-3"
								htmlTag="a"
							>
								Search all model data
							</Button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Overview;
