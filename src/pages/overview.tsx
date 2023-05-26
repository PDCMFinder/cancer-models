import { NextPage } from "next";
import BarChart from "../components/BarChart/BarChart";
import DonutChart from "../components/DonutChart/DonutChart";
import SunBurstChart from "../components/SunBurstChart/SunBurstChart";
import Button from "../components/Button/Button";
import { useQuery } from "react-query";
import {
	getCancerHierarchy,
	getModelsByMutatedGene,
	getModelsByPatientAge,
	getModelsByPatientEthnicity,
	getModelsByPatientGender,
	getModelsByPrimarySite,
	getModelsByTreatment,
	getModelsByTumourType,
} from "../apis/AggregatedData.api";
import Link from "next/link";
import { useRouter } from "next/router";

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
		"90 - 99",
	];
	const mappedAgeGroups: any = {
		pediatric: { label: "Pediatric", count: 0, ranges: pediatricAgeGroups },
		adult: { label: "Adult", count: 0, ranges: adultAgeGroups },
		"Not Provided": { count: 0, ranges: ["Not Provided"] },
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
			count: group.count,
		};
	});
}

const Overview: NextPage = () => {
	let modelsByCancerHierarchy = useQuery("modelsByCancerHierarchy", () => {
		return getCancerHierarchy();
	});
	let modelsByTreatment = useQuery("modelsByTreatment", () => {
		return getModelsByTreatment();
	});
	let modelsByPrimarySite = useQuery("modelsByPrimarySite", () => {
		return getModelsByPrimarySite();
	});
	let modelsByMutatedGene = useQuery("modelsByMutatedGene", () => {
		return getModelsByMutatedGene();
	});
	let modelsByPatientGender = useQuery("modelsByPatientGender", () => {
		return getModelsByPatientGender();
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

	const router = useRouter();

	const onGraphClick = (node: any, filterId: string) => {
		router.push({
			pathname: "/search",
			search: `?filters=${filterId}:${node.data[filterId]}`,
		});
	};

	return (
		<>
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
							<h2>Discover Models</h2>
							<ul>
								<li>Detailed annotations including Tissue and Cancer type</li>{" "}
								<li>Advanced filters for model selection</li>
								<li>Links to originating model source</li>
							</ul>
							<div className="text-center">
								<Link href="/search">Browse all models</Link>
							</div>
						</div>
						<div className="col-12 col-lg-5 mb-5">
							{modelsByPrimarySite.data && (
								<div style={{ height: "600px", width: "100%" }}>
									<DonutChart
										keyId="primary_site"
										data={modelsByPrimarySite.data}
										onSliceClick={onGraphClick}
									/>
								</div>
							)}
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
							{modelsByMutatedGene.data && (
								<div style={{ height: "600px" }}>
									<BarChart
										chartTitle="Models by top mutated gene"
										onBarClick={onGraphClick}
										data={modelsByMutatedGene.data}
										rotateTicks={true}
										indexKey="makers_with_mutation_data"
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
								<li>Data release version: 3.1</li>
								<li>Date of publication: 07/02/2023</li>
								<li>Number of models: 7017</li>
								<li>Number of providers: 27</li>
							</ul>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2>More data reports</h2>
						</div>
					</div>
					<div className="row">
						{modelsByPatientEthnicity.data && (
							<div className="col-12 col-md-6">
								<div className="text-center">
									<h3>Models by reported ethnicity</h3>
								</div>
								<div style={{ height: "600px" }}>
									<BarChart
										chartTitle="Models by top mutated gene"
										onBarClick={onGraphClick}
										rotateTicks={true}
										data={modelsByPatientEthnicity.data?.sort(
											(
												a: { patient_ethnicity: string; count: number },
												b: { patient_ethnicity: string; count: number }
											) => b.count - a.count
										)}
										indexKey="patient_ethnicity"
									/>
								</div>
							</div>
						)}
						{modelsByPatientAge.data && (
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
						{modelsByPatientGender.data && (
							<div className="col-12 col-md-6">
								<div className="text-center">
									<h3>Models by patient gender</h3>
								</div>
								<div style={{ height: "600px" }}>
									<DonutChart
										onSliceClick={onGraphClick}
										keyId="patient_sex"
										data={modelsByPatientGender.data}
									/>
								</div>
							</div>
						)}
						{modelsByTumourType.data && (
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
						{modelsByCancerHierarchy.data && (
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
						{modelsByTreatment.data && (
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
