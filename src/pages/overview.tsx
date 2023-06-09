import { NextPage } from "next";
import BarChart from "../components/BarChart/BarChart";
import DonutChart from "../components/DonutChart/DonutChart";
import SunBurstChart from "../components/SunBurstChart/SunBurstChart";
import Button from "../components/Button/Button";
import { useQuery } from "react-query";
import {
	getCancerHierarchy,
	getDataReleaseInformation,
	getModelCount,
	getModelsByMutatedGene,
	getModelsByPatientAge,
	getModelsByPatientEthnicity,
	getModelsByPatientGender,
	getModelsByPrimarySite,
	getModelsByTreatment,
	getModelsByTumourType,
	getProviderCount,
} from "../apis/AggregatedData.api";
import Link from "next/link";
import { useRouter } from "next/router";

interface IEthnicityCounter {
	patient_ethnicity: string;
	count: number;
}

function collapseEthnicity(ethnicityList: IEthnicityCounter[]) {
	const ethnicityEntries = Object.entries({
		African: "Black Or African American",
		"African American": "Black Or African American",
		Black: "Black Or African American",
		"Black Or African American": "Black Or African American",
		"Black Or African American; Not Hispanic Or Latino":
			"Black Or African American",
		Eastasian: "Asian",
		"East Asian": "Asian",
		"South Asian": "Asian",
		Southasianorhispanic: "Asian",
		"White; Not Hispanic Or Latino": "White",
		European: "White",
		Caucasian: "White",
		Latino: "Hispanic Or Latino",
		"White; Hispanic Or Latino": "Hispanic Or Latino",
		"Not Specified": "Not Provided",
		Unknown: "Not Provided",
		"Not Provided": "Not Provided",
		"Not Collected": "Not Provided",
		Mixed_or_unknown: "Not Provided",
		"Declined To Answer": "Not Provided",
		Other: "Other",
		Arabic: "Other",
		"Native Hawaiian Or Other Pacific Islander": "Other",
		"Not hispanic or Latino": "Other",
		Asian: "Asian",
		Hispanic: "Hispanic Or Latino",
		"Hispanic Or Latino": "Hispanic Or Latino",
		White: "White",
	});

	const ethnicityDictionary: any = Object.fromEntries(
		ethnicityEntries.map(([k, v]: string[]) => [k.toLowerCase(), v])
	);

	const mappedEthnictyCounts: any = {};

	ethnicityList.forEach((ethnicity) => {
		const mappedEthnicty =
			ethnicityDictionary[ethnicity.patient_ethnicity.toLowerCase()];

		if (!mappedEthnictyCounts[mappedEthnicty]) {
			mappedEthnictyCounts[mappedEthnicty] = 0;
		}

		mappedEthnictyCounts[mappedEthnicty] += ethnicity.count;
	});

	return Object.keys(mappedEthnictyCounts).map((e) => {
		const ethnicityDictionaryArr = ethnicityEntries.map(([k, v]: string[]) => [
			k,
			v,
		]);
		const subcategories = ethnicityDictionaryArr
			.filter((subcategory) => subcategory[1] === e)
			.map((categoryPair) => categoryPair[0]);

		return {
			patient_ethnicity: e,
			count: mappedEthnictyCounts[e],
			onClickFilters: subcategories,
		};
	});
}

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
	const notValidCategories = ["not provided", "not collected"];

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
	let providerCount = useQuery("providerCount", () => {
		return getProviderCount();
	});
	let modelCount = useQuery("modelCount", () => {
		return getModelCount();
	});
	let releaseInfo = useQuery("releaseInfo", () => {
		return getDataReleaseInformation();
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
			}`,
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
								{releaseInfo.data ? (
									<li>
										Data release version:{" "}
										{releaseInfo.data.name.replace("dr.", "").replace("dr", "")}
									</li>
								) : null}
								{releaseInfo.data ? (
									<li>
										Date of publication:{" "}
										{new Date(releaseInfo.data.date)
											.toISOString()
											.substring(0, 10)}
									</li>
								) : null}
								<li>Number of models: {modelCount.data ?? 7091}</li>
								<li>Number of providers: {providerCount.data ?? 33}</li>
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
										data={collapseEthnicity(modelsByPatientEthnicity.data)
											.sort(
												(
													a: { patient_ethnicity: string; count: number },
													b: { patient_ethnicity: string; count: number }
												) => b.count - a.count
											)
											.filter(
												(ethnicity: {
													patient_ethnicity: string;
													count: number;
												}) =>
													!notValidCategories.includes(
														ethnicity.patient_ethnicity.toLowerCase()
													)
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
