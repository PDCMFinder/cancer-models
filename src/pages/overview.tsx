import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useQueries } from "react-query";
import {
	getLatestDataReleaseInformation,
	getModelCount,
	getModelsByCancerSystem,
	getModelsByMutatedGene,
	getModelsByPatientAge,
	getModelsByPatientEthnicity,
	getModelsByPatientSex,
	getModelsByPrimarySite,
	getModelsByTreatment,
	getModelsByTumourType,
	getModelsByType,
	getProviderCount
} from "../apis/AggregatedData.api";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import BarChart from "../components/Charts/BarChart";
import PieChart from "../components/Charts/PieChart";
import PolarBarChart from "../components/Charts/PolarBarChart";
import Label from "../components/Input/Label";
import Select from "../components/Input/Select";

const Overview: NextPage = () => {
	const queries = useQueries([
		{
			queryKey: "modelsByPrimarySite",
			queryFn: getModelsByPrimarySite
		},
		{
			queryKey: "modelsByType",
			queryFn: getModelsByType
		},
		{
			queryKey: "modelsByCancerSystem",
			queryFn: getModelsByCancerSystem
		},
		{
			queryKey: "modelsByTreatment",
			queryFn: getModelsByTreatment
		},
		{
			queryKey: "modelsByMutatedGene",
			queryFn: getModelsByMutatedGene
		},
		{
			queryKey: "modelsByPatientSex",
			queryFn: getModelsByPatientSex
		},
		{
			queryKey: "modelsByTumourType",
			queryFn: getModelsByTumourType
		},
		{
			queryKey: "modelsByPatientEthnicity",
			queryFn: getModelsByPatientEthnicity
		},
		{
			queryKey: "modelsByPatientAge",
			queryFn: getModelsByPatientAge
		},
		{
			queryKey: "providerCount",
			queryFn: getProviderCount
		},
		{
			queryKey: "modelCount",
			queryFn: getModelCount
		},
		{
			queryKey: "latestDataReleaseInfo",
			queryFn: getLatestDataReleaseInformation
		}
	]);

	const queryResults = {
		modelsByPrimarySite: queries[0],
		modelsByType: queries[1],
		modelsByCancerSystem: queries[2],
		modelsByTreatment: queries[3],
		modelsByMutatedGene: queries[4],
		modelsByPatientSex: queries[5],
		modelsByTumourType: queries[6],
		modelsByPatientEthnicity: queries[7],
		modelsByPatientAge: queries[8],
		providerCount: queries[9],
		modelCount: queries[10],
		latestDataReleaseInfo: queries[11]
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
								{queryResults.latestDataReleaseInfo.data ? (
									<li>
										Data release version:{" "}
										{queryResults.latestDataReleaseInfo.data.tag_name}
									</li>
								) : null}
								{queryResults.latestDataReleaseInfo.data ? (
									<li>
										Date of publication:{" "}
										{queryResults.latestDataReleaseInfo.data?.released_at}
									</li>
								) : null}
								<li>
									Number of models: {queryResults.modelCount.data ?? 10000}
								</li>
								<li>
									Number of providers: {queryResults.providerCount.data ?? 56}
								</li>
							</ul>
							<Link href="/about/releases">Release log</Link>
						</div>
					</div>
				</div>
			</section>
			<section>
				<div className="container">
					<div className="row mb-5">
						<div className="col-12">
							<div className="d-flex align-center">
								<Label
									label="Filter by provider:"
									forId="filter-by-provider"
									name="filter-by-provider-name"
									className="mr-1"
								/>
								<Select
									id="filter-by-provider"
									options={[{ text: "All", value: "all" }]}
									className="w-auto mb-0"
								/>
							</div>
						</div>
					</div>
					<div className="row mb-5">
						{queryResults.modelsByPrimarySite.data &&
							!queryResults.modelsByPrimarySite.isLoading && (
								<div className="col-md-6 col-lg-4 mb-4">
									<Card className="py-0 px-5">
										<PieChart
											title="Models by primary site"
											data={queryResults.modelsByPrimarySite.data}
											dataEndPoint="primary_site"
										/>
									</Card>
								</div>
							)}
						{queryResults.modelsByType.data &&
							!queryResults.modelsByType.isLoading && (
								<div className="col-md-6 col-lg-4 mb-4">
									<Card className="py-0 px-5">
										<PieChart
											title="Models by model type"
											data={queryResults.modelsByType.data}
											dataEndPoint="model_type"
										/>
									</Card>
								</div>
							)}
						{queryResults.modelsByCancerSystem.data &&
							!queryResults.modelsByCancerSystem.isLoading && (
								<div className="col-md-6 col-lg-4 mb-4">
									<Card className="py-0 px-5">
										<PieChart
											title="Models by cancer system"
											data={queryResults.modelsByCancerSystem.data}
											dataEndPoint="cancer_system"
										/>
									</Card>
								</div>
							)}
						{queryResults.modelsByMutatedGene.data &&
							!queryResults.modelsByMutatedGene.isLoading && (
								<div className="col-md-6 col-lg-4 mb-4">
									<Card className="py-0 px-2">
										<PolarBarChart
											title="Models by mutated gene"
											data={queryResults.modelsByMutatedGene.data}
											dataEndPoint="mutated_gene"
										/>
									</Card>
								</div>
							)}
						{queryResults.modelsByPatientEthnicity.data &&
							!queryResults.modelsByPatientEthnicity.isLoading && (
								<div className="col-md-12 col-lg-8 mb-4">
									<Card className="py-0 px-2">
										<BarChart
											title="Models by patient ethnicity"
											x={Object.keys(
												queryResults.modelsByPatientEthnicity.data
											)}
											y={Object.values(
												queryResults.modelsByPatientEthnicity.data
											)}
											dataEndPoint="patient_ethnicity"
										/>
									</Card>
								</div>
							)}
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
