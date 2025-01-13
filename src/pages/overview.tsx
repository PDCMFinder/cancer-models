import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useQueries } from "react-query";
import {
	getLatestDataReleaseInformation,
	getModelCount,
	getModelsByCancerSystem,
	getModelsByDatasetAvailability,
	getModelsByDiagnosis,
	getModelsByMutatedGene,
	getModelsByPatientAge,
	getModelsByPatientEthnicity,
	getModelsByPatientSex,
	getModelsByPrimarySite,
	getModelsByProvider,
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
import SunBurstChart from "../components/Charts/SunBurstChart";
import { ageCategories } from "../utils/collapseEthnicity";
import { capitalizeFirstLetter } from "../utils/dataUtils";

const transformSunBurstData = (data: Record<string, number>) => {
	const labels: string[] = [];
	const values: number[] = [];
	const parents: string[] = [];
	let parentTotalCount = 0,
		tempChildValues: number[] = [];

	Object.entries(ageCategories).forEach(([category, categoryValues]) => {
		// assuming all of this categories are included in our models (if not, why is it even in the dictionary?)
		labels.push(capitalizeFirstLetter(category.toLowerCase()));
		parents.push("");
		parentTotalCount = 0;
		tempChildValues = [];

		Object.entries(data).forEach(([age, count]) => {
			if (categoryValues.includes(age)) {
				labels.push(age);
				tempChildValues.push(count);
				parents.push(capitalizeFirstLetter(category.toLowerCase()));
				parentTotalCount += count;
			}
		});

		values.push(parentTotalCount);
		values.push(...tempChildValues);
	});

	return { labels, values, parents };
};

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
			queryFn: getModelsByPatientAge,
			select: transformSunBurstData
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
		},
		{
			queryKey: "modelsByDiagnosis",
			queryFn: getModelsByDiagnosis
		},
		{
			queryKey: "modelsByProvider",
			queryFn: getModelsByProvider
		},
		{
			queryKey: "modelsByDatasetAvailability",
			queryFn: getModelsByDatasetAvailability
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
		latestDataReleaseInfo: queries[11],
		modelsByDiagnosis: queries[12],
		modelsByProvider: queries[13],
		modelsByDatasetAvailability: queries[14]
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
						{queryResults.modelsByPrimarySite.data &&
							!queryResults.modelsByPrimarySite.isLoading && (
								<div className="col-md-6 col-lg-4 mb-4">
									<Card className="py-0 px-5 h-100">
										<PieChart
											title="Models by primary site"
											data={queryResults.modelsByPrimarySite.data}
											dataEndPoint="primary_site"
											holeRadius={100}
										/>
									</Card>
								</div>
							)}
						{queryResults.modelsByType.data &&
							!queryResults.modelsByType.isLoading && (
								<div className="col-md-6 col-lg-4 mb-4">
									<Card className="py-0 px-5 h-100">
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
									<Card className="py-0 px-5 h-100">
										<PieChart
											title="Models by cancer system"
											data={queryResults.modelsByCancerSystem.data}
											dataEndPoint="cancer_system"
											holeRadius={100}
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
											dataEndPoint="markers_with_mutation_data"
										/>
									</Card>
								</div>
							)}
						{queryResults.modelsByPatientEthnicity.data &&
							!queryResults.modelsByPatientEthnicity.isLoading && (
								<div className="col-md-12 col-lg-8 mb-4">
									<Card className="py-0 px-2 h-100">
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
						{queryResults.modelsByDiagnosis.data &&
							!queryResults.modelsByDiagnosis.isLoading && (
								<div className="col-md-6 col-lg-4 mb-4">
									<Card className="py-0 px-5 h-100">
										<PieChart
											title="Models by diagnosis"
											data={queryResults.modelsByDiagnosis.data}
											dataEndPoint="search_terms"
											holeRadius={100}
										/>
									</Card>
								</div>
							)}
						{queryResults.modelsByPatientAge.data &&
							!queryResults.modelsByPatientAge.isLoading && (
								<div className="col-md-6 col-lg-4 mb-4">
									<Card className="py-0 px-5 h-100">
										<SunBurstChart
											title="Models by patient age"
											values={queryResults.modelsByPatientAge.data.values}
											labels={queryResults.modelsByPatientAge.data.labels}
											parents={queryResults.modelsByPatientAge.data.parents}
											dataEndPoint="patient_age"
										/>
									</Card>
								</div>
							)}
						{queryResults.modelsByPatientSex.data &&
							!queryResults.modelsByPatientSex.isLoading && (
								<div className="col-md-6 col-lg-4 mb-4">
									<Card className="py-0 px-5 h-100">
										<PieChart
											title="Models by patient sex"
											data={queryResults.modelsByPatientSex.data}
											dataEndPoint="patient_sex"
										/>
									</Card>
								</div>
							)}
						{queryResults.modelsByDatasetAvailability.data &&
							!queryResults.modelsByDatasetAvailability.isLoading && (
								<div className="col-md-12 col-lg-8 mb-4">
									<Card className="py-0 px-2">
										<BarChart
											title="Models by dataset availability"
											x={Object.keys(
												queryResults.modelsByDatasetAvailability.data
											)}
											y={Object.values(
												queryResults.modelsByDatasetAvailability.data
											)}
											dataEndPoint="dataset_available"
										/>
									</Card>
								</div>
							)}
						{queryResults.modelsByProvider.data &&
							!queryResults.modelsByProvider.isLoading && (
								<div className="col-md-6 col-lg-4 mb-4">
									<Card className="py-0 px-5 h-100">
										<PieChart
											title="Models by provider"
											data={queryResults.modelsByProvider.data}
											dataEndPoint="data_source"
											holeRadius={100}
										/>
									</Card>
								</div>
							)}
						{queryResults.modelsByTreatment.data &&
							!queryResults.modelsByTreatment.isLoading && (
								<div className="col-md-12 mb-4">
									<Card className="py-0 px-2 h-100">
										<BarChart
											title="Models by treatment"
											x={Object.keys(queryResults.modelsByTreatment.data)}
											y={Object.values(queryResults.modelsByTreatment.data)}
											dataEndPoint="patient_treatments"
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
