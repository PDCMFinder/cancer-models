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
import BarChart from "../components/BarChart/BarChart";
import Button from "../components/Button/Button";
import DonutChart from "../components/DonutChart/DonutChart";
import Loader from "../components/Loader/Loader";
import SunBurstChart from "../components/SunBurstChart/SunBurstChart";
import { countEthnicity } from "../utils/collapseEthnicity";
import styles from "./overview.module.scss";

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

	let cancerHierarchyQuery = useQuery("cancerHierarchy", () => {
		return getCancerHierarchy();
	});
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
					<div className="row mb-5 align-center">
						<div className="col-12 col-lg-6 mb-5">
							<h2>CancerModels.Org portal features</h2>
							<ul>
								<li>Detailed annotations including Tissue and Cancer type</li>{" "}
								<li>Advanced filters for model selection</li>
								<li>Links to originating model source</li>
							</ul>
							<div className="text-center">
								<Button
									htmlTag="a"
									href="/search"
									priority="primary"
									color="dark"
								>
									Discover all models
								</Button>
							</div>
						</div>
						<div className={`col-12 col-lg-5 mb-5 ${styles.circlePacking_col}`}>
							{/* Graph */}
							<div
								style={{
									backgroundColor: "#085154",
									aspectRatio: "1",
									borderRadius: "500%"
								}}
							>
								{!cancerHierarchyQuery.isLoading &&
								cancerHierarchyQuery.data ? (
									<DynamicCirclePacking
										data={cancerHierarchyQuery.data}
										onCircleClick={(circleId, circleDepth) => {
											const searchPrefix =
												circleDepth === 1
													? `?filters=cancer_system:`
													: `?filters=search_terms:`;
											const termSuffix = circleDepth === 1 ? "Cancer" : "";
											const search = `${searchPrefix}${encodeURIComponent(
												circleId + termSuffix
											)}`;

											router.push({
												pathname: "/search",
												search
											});
										}}
									/>
								) : (
									<Loader />
								)}
							</div>
						</div>
					</div>
					<div className="row mb-5 align-center">
						<div className="col-12 col-lg-6 order-lg-1 mb-5">
							<h2>Explore Genetic features</h2>
							<ul>
								<li>Find models with specific mutations</li>
								<li>Links to cancer annotation resources</li>
								<li>Mutation, expression and other molecular datasets</li>
							</ul>
						</div>
						<div className="col-12 col-lg-6 mb-5">
							{modelsByMutatedGene.data && modelsByMutatedGene.data.length > 0 && (
								<div style={{ height: "600px" }}>
									<BarChart
										chartTitle="Models by top mutated gene"
										onBarClick={onGraphClick}
										data={modelsByMutatedGene.data}
										rotateTicks={true}
										indexKey="markers_with_mutation_data"
									/>
								</div>
							)}
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
								<li>Number of models: {modelCount.data ?? 7500}</li>
								<li>Number of providers: {providerCount.data ?? 37}</li>
							</ul>
							<Link href="/about/releases">Release log</Link>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2>More data reports</h2>
						</div>
					</div>
					<div className="row">
						{modelsByPatientEthnicity.data &&
							modelsByPatientEthnicity.data.length > 0 && (
								<div className="col-12 col-md-6">
									<div className="text-center">
										<h3>Models by reported ethnicity</h3>
									</div>
									<div style={{ height: "600px" }}>
										<BarChart
											chartTitle="Models by top mutated gene"
											onBarClick={onGraphClick}
											rotateTicks={true}
											data={
												countEthnicity(modelsByPatientEthnicity.data).sort(
													(
														a: { patient_ethnicity: string; count: number },
														b: { patient_ethnicity: string; count: number }
													) => b.count - a.count
												)
												// .filter(
												// 	(ethnicity: {
												// 		patient_ethnicity: string;
												// 		count: number;
												// 	}) =>
												// 		!notValidCategories.includes(
												// 			ethnicity.patient_ethnicity.toLowerCase()
												// 		)
												// )
											}
											indexKey="patient_ethnicity"
										/>
									</div>
								</div>
							)}
						{modelsByPatientAge.data && modelsByPatientAge.data.length > 0 && (
							<div className="col-12 col-md-6">
								<div className="text-center">
									<h3>Models by patient age</h3>
								</div>
								<div style={{ height: "600px" }}>
									<DonutChart
										onSliceClick={onGraphClick}
										data={collapseAgeGroup(modelsByPatientAge.data)}
										keyId="patient_age"
									/>
								</div>
							</div>
						)}
					</div>
					<div className="row">
						{modelsByPatientSex.data && modelsByPatientSex.data.length > 0 && (
							<div className="col-12 col-md-6">
								<div className="text-center">
									<h3>Models by patient sex</h3>
								</div>
								<div style={{ height: "600px" }}>
									<DonutChart
										onSliceClick={onGraphClick}
										keyId="patient_sex"
										data={modelsByPatientSex.data}
									/>
								</div>
							</div>
						)}
						{modelsByTumourType.data && modelsByTumourType.data.length > 0 && (
							<div className="col-12 col-md-6">
								<div className="text-center">
									<h3>Models by tumour type</h3>
								</div>
								<div style={{ height: "600px" }}>
									<DonutChart
										onSliceClick={onGraphClick}
										keyId="tumour_type"
										data={modelsByTumourType.data}
									/>
								</div>
							</div>
						)}
					</div>
					<div className="row">
						{modelsByCancerHierarchy.data &&
							modelsByCancerHierarchy.data.length > 0 && (
								<div className="col-12 col-md-12">
									<div className="text-center">
										<h3>Models by anatomical system & diagnosis</h3>
									</div>
									<div style={{ height: "800px" }}>
										<SunBurstChart
											keyId="search_terms"
											data={modelsByCancerHierarchy.data}
											onSliceClick={onGraphClick}
										/>
									</div>
								</div>
							)}
					</div>

					<div className="row">
						{modelsByTreatment.data && modelsByTreatment.data.length > 0 && (
							<div className="col-12 col-md-12">
								<div className="text-center">
									<h3>Most used drugs</h3>
								</div>
								<div style={{ height: "600px" }}>
									<BarChart
										chartTitle="Models by treatment"
										onBarClick={onGraphClick}
										rotateTicks={true}
										data={modelsByTreatment.data}
										indexKey="treatment_list"
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default Overview;
