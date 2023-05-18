import { NextPage } from "next";
import BarChart from "../components/BarChart/BarChart";
import DonutChart from "../components/DonutChart/DonutChart";
import SunBurstChart from "../components/SunBurstChart/SunBurstChart";
import Button from "../components/Button/Button";
import { useQuery } from "react-query";
import { getModelsByType } from "../apis/AggregatedData.api";
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
	let modelsByTypeCountsQuery = useQuery("modelsByTypeCounts", () => {
		return getModelsByType();
	});
	// let modelsByTreatment = useQuery("modelsByTreatment", () => {
	// 	return getModelsByTreatment();
	// });

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
							<div style={{ height: "600px", width: "100%" }}>
								{modelsByTypeCountsQuery.data ? (
									<DonutChart
										keyId="primary_site"
										data={[
											{
												primary_site: "lung",
												count: 787,
											},
											{
												primary_site: "breast",
												count: 443,
											},
											{
												primary_site: "colon",
												count: 440,
											},
											{
												primary_site: "not provided",
												count: 429,
											},
											{
												primary_site: "digestive/gastrointestinal",
												count: 423,
											},
											{
												primary_site: "skin",
												count: 318,
											},
											{
												primary_site: "pancreas",
												count: 316,
											},
											{
												primary_site: "haematopoietic and lymphoid",
												count: 292,
											},
											{
												primary_site: "large intestine",
												count: 240,
											},
											{
												primary_site: "ovary",
												count: 193,
											},
										]}
										onSliceClick={onGraphClick}
									/>
								) : null}
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
							<div style={{ height: "600px" }}>
								<BarChart
									chartTitle="Models by top mutated gene"
									onBarClick={onGraphClick}
									data={[
										{
											makers_with_mutation_data: "TP53",
											count: 2260,
										},
										{
											makers_with_mutation_data: "TTN",
											count: 1517,
										},
										{
											makers_with_mutation_data: "MUC16",
											count: 1346,
										},
										{
											makers_with_mutation_data: "KMT2C",
											count: 1321,
										},
										{
											makers_with_mutation_data: "MUC4",
											count: 1234,
										},
										{
											makers_with_mutation_data: "APC",
											count: 1111,
										},
										{
											makers_with_mutation_data: "MUC3A",
											count: 987,
										},
										{
											makers_with_mutation_data: "KRAS",
											count: 886,
										},
										{
											makers_with_mutation_data: "MUC17",
											count: 865,
										},
										{
											makers_with_mutation_data: "PABPC1",
											count: 856,
										},
										{
											makers_with_mutation_data: "GPRIN2",
											count: 816,
										},
										{
											makers_with_mutation_data: "FCGBP",
											count: 778,
										},
										{
											makers_with_mutation_data: "FLG",
											count: 778,
										},
										{
											makers_with_mutation_data: "USH2A",
											count: 777,
										},
										{
											makers_with_mutation_data: "MUC5B",
											count: 774,
										},
									]}
									rotateTicks={true}
									indexKey="makers_with_mutation_data"
								/>
							</div>
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
						<div className="col-12 col-md-6">
							<div className="text-center">
								<h3>Models by reported ethnicity</h3>
							</div>
							<div style={{ height: "600px" }}>
								<BarChart
									chartTitle="Models by top mutated gene"
									onBarClick={onGraphClick}
									rotateTicks={true}
									data={[
										{
											patient_ethnicity: "African",
											count: 26,
										},
										{
											patient_ethnicity: "African American",
											count: 17,
										},
										{
											patient_ethnicity: "Asian",
											count: 69,
										},
										{
											patient_ethnicity: "Black",
											count: 77,
										},
										{
											patient_ethnicity: "Black Or African American",
											count: 23,
										},
										{
											patient_ethnicity:
												"Black Or African American; Not Hispanic Or Latino",
											count: 4,
										},
										{
											patient_ethnicity: "Caucasian",
											count: 604,
										},
										{
											patient_ethnicity: "Eastasian",
											count: 6,
										},
										{
											patient_ethnicity: "East Asian",
											count: 290,
										},
										{
											patient_ethnicity: "European",
											count: 182,
										},
										{
											patient_ethnicity: "Hispanic",
											count: 19,
										},
										{
											patient_ethnicity: "Hispanic Or Latino",
											count: 67,
										},
										{
											patient_ethnicity: "Mixed_or_unknown",
											count: 14,
										},
										{
											patient_ethnicity:
												"Native Hawaiian Or Other Pacific Islander",
											count: 2,
										},
										{
											patient_ethnicity: "Not Hispanic Or Latino",
											count: 919,
										},
										{
											patient_ethnicity: "Other",
											count: 8,
										},
										{
											patient_ethnicity: "South Asian",
											count: 2,
										},
										{
											patient_ethnicity: "Southasianorhispanic",
											count: 29,
										},
										{
											patient_ethnicity: "White",
											count: 931,
										},
										{
											patient_ethnicity: "Unknown",
											count: 733,
										},
									].sort((a, b) => b.count - a.count)}
									indexKey="patient_ethnicity"
								/>
							</div>
						</div>
						<div className="col-12 col-md-6">
							<div className="text-center">
								<h3>Models by patient age</h3>
							</div>
							<div style={{ height: "600px" }}>
								<DonutChart
									onSliceClick={onGraphClick}
									data={collapseAgeGroup([
										{
											patient_age: "0 - 23 months",
											count: 48,
										},
										{
											patient_age: "2 - 9",
											count: 201,
										},
										{
											patient_age: "10 - 19",
											count: 201,
										},
										{
											patient_age: "20 - 29",
											count: 144,
										},
										{
											patient_age: "30 - 39",
											count: 274,
										},
										{
											patient_age: "40 - 49",
											count: 730,
										},
										{
											patient_age: "50 - 59",
											count: 1299,
										},
										{
											patient_age: "60 - 69",
											count: 1538,
										},
										{
											patient_age: "70 - 79",
											count: 999,
										},
										{
											patient_age: "80 - 89",
											count: 273,
										},
										{
											patient_age: "90 - 99",
											count: 4,
										},
										{
											patient_age: "Not specified",
											count: 1306,
										},
									])}
									keyId="patient_age"
								/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12 col-md-6">
							<div className="text-center">
								<h3>Models by patient gender</h3>
							</div>
							<div style={{ height: "600px" }}>
								<DonutChart
									onSliceClick={onGraphClick}
									keyId="patient_sex"
									data={[
										{
											patient_sex: "female",
											count: 2967,
										},
										{
											patient_sex: "male",
											count: 3750,
										},
									]}
								/>
							</div>
						</div>
						<div className="col-12 col-md-6">
							<div className="text-center">
								<h3>Models by tumour type</h3>
							</div>
							<div style={{ height: "600px" }}>
								<DonutChart
									onSliceClick={onGraphClick}
									keyId="tumour_type"
									data={[
										{
											tumour_type: "Primary",
											count: 2398,
										},
										{
											tumour_type: "Metastatic",
											count: 2370,
										},
										{
											tumour_type: "Recurrent",
											count: 374,
										},
										{
											tumour_type: "Refractory",
											count: 7,
										},
									]}
								/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12 col-md-12">
							<div className="text-center">
								<h3>Models by anatomical system & diagnosis</h3>
							</div>
							<div style={{ height: "800px" }}>
								<SunBurstChart
									keyId="search_terms"
									data={{
										search_terms: "PDCM",
										children: [
											{
												search_terms: "Digestive System Cancer",
												children: [
													{
														search_terms: "Colorectal Carcinoma",
														count: 641,
													},
													{
														search_terms: "Colon Adenocarcinoma",
														count: 477,
													},
													{
														search_terms: "Colorectal Adenocarcinoma",
														count: 243,
													},
													{
														search_terms: "Pancreatic Ductal Adenocarcinoma",
														count: 196,
													},
													{
														search_terms: "Pancreatic Adenocarcinoma",
														count: 157,
													},
													{
														search_terms: "Colon Cancer",
														count: 90,
													},
													{
														search_terms: "Gastric Carcinoma",
														count: 76,
													},
													{
														search_terms: "Rectal Adenocarcinoma",
														count: 62,
													},
													{
														search_terms: "Pancreatic Cancer",
														count: 57,
													},
													{
														search_terms: "Esophageal Adenocarcinoma",
														count: 56,
													},
													{
														search_terms: "Gastric Cancer",
														count: 41,
													},
													{
														search_terms: "Cholangiocarcinoma",
														count: 40,
													},
													{
														search_terms: "Esophageal Squamous Cell Carcinoma",
														count: 32,
													},
													{
														search_terms: "Hepatocellular Carcinoma",
														count: 28,
													},
													{
														search_terms: "Ampulla of Vater Adenocarcinoma",
														count: 26,
													},
													{
														search_terms: "Colon Carcinoma",
														count: 24,
													},
													{
														search_terms: "Gastric Adenocarcinoma",
														count: 23,
													},
													{
														search_terms: "Cecum Adenocarcinoma",
														count: 23,
													},
													{
														search_terms: "Colon Mucinous Adenocarcinoma",
														count: 18,
													},
													{
														search_terms:
															"Gastroesophageal Junction Adenocarcinoma",
														count: 17,
													},
													{
														search_terms: "Pancreatic Carcinoma",
														count: 13,
													},
													{
														search_terms: "Hepatobiliary Cancer",
														count: 12,
													},
													{
														search_terms: "Colorectal Cancer",
														count: 11,
													},
													{
														search_terms: "Small Intestinal Adenocarcinoma",
														count: 11,
													},
													{
														search_terms: "Anal Squamous Cell Carcinoma",
														count: 8,
													},
													{
														search_terms: "Intrahepatic Cholangiocarcinoma",
														count: 7,
													},
													{
														search_terms: "Hepatoblastoma",
														count: 7,
													},
													{
														search_terms: "Gastric Tubular Adenocarcinoma",
														count: 6,
													},
													{
														search_terms: "Gallbladder Carcinoma",
														count: 6,
													},
													{
														search_terms: "Pancreatic Adenosquamous Carcinoma",
														count: 6,
													},
													{
														search_terms: "Anal Cancer",
														count: 5,
													},
													{
														search_terms: "Pancreatic Neuroendocrine Carcinoma",
														count: 5,
													},
													{
														search_terms:
															"Gastric Signet Ring Cell Adenocarcinoma",
														count: 5,
													},
													{
														search_terms: "Esophageal Cancer",
														count: 4,
													},
													{
														search_terms:
															"Pancreatic Intraductal Papillary-Mucinous Neoplasm with an Associated Invasive Carcinoma",
														count: 3,
													},
													{
														search_terms:
															"Liver and Intrahepatic Bile Duct Carcinoma",
														count: 3,
													},
													{
														search_terms: "Duodenal Adenocarcinoma",
														count: 3,
													},
													{
														search_terms: "Colorectal Mucinous Adenocarcinoma",
														count: 3,
													},
													{
														search_terms: "Extrahepatic Bile Duct Carcinoma",
														count: 3,
													},
													{
														search_terms: "Pancreatic Colloid Carcinoma",
														count: 3,
													},
													{
														search_terms: "Hepatosplenic T-Cell Lymphoma",
														count: 3,
													},
													{
														search_terms: "Gallbladder Adenocarcinoma",
														count: 2,
													},
													{
														search_terms:
															"Pancreatic Poorly Differentiated Ductal Adenocarcinoma",
														count: 2,
													},
													{
														search_terms:
															"Pancreatic Moderately Differentiated Ductal Adenocarcinoma",
														count: 2,
													},
													{
														search_terms: "Biliary Tract Carcinoma",
														count: 2,
													},
													{
														search_terms:
															"Gastric Small Cell Neuroendocrine Carcinoma",
														count: 2,
													},
													{
														search_terms: "Gastric Fundus Carcinoma",
														count: 1,
													},
													{
														search_terms: "Bile Duct Adenocarcinoma",
														count: 1,
													},
													{
														search_terms: "Hilar Cholangiocarcinoma",
														count: 1,
													},
													{
														search_terms: "Gastric Neuroendocrine Carcinoma",
														count: 1,
													},
													{
														search_terms:
															"Pancreatic Mixed Acinar-Neuroendocrine Carcinoma",
														count: 1,
													},
													{
														search_terms: "Colorectal Medullary Carcinoma",
														count: 1,
													},
													{
														search_terms: "Appendix Carcinoma",
														count: 1,
													},
													{
														search_terms:
															"Pancreatic Undifferentiated Carcinoma",
														count: 1,
													},
													{
														search_terms: "Colon Squamous Cell Carcinoma",
														count: 1,
													},
													{
														search_terms: "Anal Adenocarcinoma",
														count: 1,
													},
													{
														search_terms: "Exocrine Pancreas Cancer",
														count: 1,
													},
													{
														search_terms:
															"Rectal Cribriform Comedo-Type Adenocarcinoma",
														count: 1,
													},
													{
														search_terms: "Adult Liver Carcinoma",
														count: 1,
													},
													{
														search_terms:
															"Gallbladder Undifferentiated Carcinoma",
														count: 1,
													},
													{
														search_terms: "Appendix Cancer",
														count: 1,
													},
													{
														search_terms: "Barrett Adenocarcinoma",
														count: 1,
													},
													{
														search_terms: "Anal Canal Squamous Cell Carcinoma",
														count: 1,
													},
													{
														search_terms: "Pancreatic Squamous Cell Carcinoma",
														count: 1,
													},
													{
														search_terms: "Duodenal Carcinoma",
														count: 1,
													},
													{
														search_terms: "Gastric Adenosquamous Carcinoma",
														count: 1,
													},
													{
														search_terms: "Gastric Mucinous Adenocarcinoma",
														count: 1,
													},
													{
														search_terms: "Rectosigmoid Adenocarcinoma",
														count: 1,
													},
													{
														search_terms: "Pancreatic Acinar Cell Carcinoma",
														count: 1,
													},
													{
														search_terms:
															"Extrahepatic Bile Duct Adenosquamous Carcinoma",
														count: 1,
													},
													{
														search_terms: "Gastric Choriocarcinoma",
														count: 1,
													},
												],
											},
											{
												search_terms: "Skin Cancer",
												children: [
													{
														search_terms: "Cutaneous Melanoma",
														count: 350,
													},
													{
														search_terms: "Cutaneous Nodular Melanoma",
														count: 16,
													},
													{
														search_terms: "Skin Squamous Cell Carcinoma",
														count: 13,
													},
													{
														search_terms: "Low-CSD Melanoma",
														count: 9,
													},
													{
														search_terms: "Amelanotic Cutaneous Melanoma",
														count: 8,
													},
													{
														search_terms: "Acral Lentiginous Melanoma",
														count: 8,
													},
													{
														search_terms: "Skin Carcinoma",
														count: 2,
													},
													{
														search_terms:
															"Stage 0 Cutaneous Melanoma AJCC v6 and v7",
														count: 2,
													},
													{
														search_terms: "Lentigo Maligna Melanoma",
														count: 1,
													},
													{
														search_terms: "Skin Basal Cell Carcinoma",
														count: 1,
													},
													{
														search_terms: "Keratoacanthoma",
														count: 1,
													},
												],
											},
											{
												search_terms: "Thoracic Cancer",
												children: [
													{
														search_terms: "Lung Adenocarcinoma",
														count: 284,
													},
													{
														search_terms: "Lung Squamous Cell Carcinoma",
														count: 221,
													},
													{
														search_terms: "Lung Non-Small Cell Carcinoma",
														count: 117,
													},
													{
														search_terms: "Lung Cancer",
														count: 27,
													},
													{
														search_terms: "Lung Large Cell Carcinoma",
														count: 20,
													},
													{
														search_terms: "Pleural Epithelioid Mesothelioma",
														count: 15,
													},
													{
														search_terms: "Lung Carcinoma",
														count: 14,
													},
													{
														search_terms: "Lung Adenosquamous Carcinoma",
														count: 12,
													},
													{
														search_terms: "Pleural Mesothelioma",
														count: 10,
													},
													{
														search_terms: "Pleural Biphasic Mesothelioma",
														count: 7,
													},
													{
														search_terms: "Pleural Malignant Mesothelioma",
														count: 7,
													},
													{
														search_terms: "Lung Pleomorphic Carcinoma",
														count: 6,
													},
													{
														search_terms: "Pleural Sarcomatoid Mesothelioma",
														count: 5,
													},
													{
														search_terms: "Lung Giant Cell Carcinoma",
														count: 4,
													},
													{
														search_terms: "Thoracic Cancer",
														count: 3,
													},
													{
														search_terms: "Lung Papillary Adenocarcinoma",
														count: 3,
													},
													{
														search_terms: "Lung Acinar Adenocarcinoma",
														count: 2,
													},
													{
														search_terms: "Lung Mucoepidermoid Carcinoma",
														count: 2,
													},
													{
														search_terms: "Solid Lung Adenocarcinoma",
														count: 1,
													},
													{
														search_terms: "Lung Colloid Adenocarcinoma",
														count: 1,
													},
													{
														search_terms: "Lung Sarcomatoid Carcinoma",
														count: 1,
													},
													{
														search_terms:
															"Lung Basaloid Squamous Cell  Carcinoma",
														count: 1,
													},
													{
														search_terms: "Lung Adenocarcinoma In Situ",
														count: 1,
													},
													{
														search_terms: "Bronchogenic Carcinoma",
														count: 1,
													},
												],
											},
											{
												search_terms: "Breast Cancer",
												children: [
													{
														search_terms:
															"Invasive Breast Carcinoma of No Special Type",
														count: 158,
													},
													{
														search_terms: "Breast Carcinoma",
														count: 104,
													},
													{
														search_terms: "Breast Cancer",
														count: 70,
													},
													{
														search_terms: "Breast Ductal Carcinoma",
														count: 50,
													},
													{
														search_terms: "Invasive Breast Carcinoma",
														count: 38,
													},
													{
														search_terms: "Breast Adenocarcinoma",
														count: 13,
													},
													{
														search_terms: "Basal-Like Breast Carcinoma",
														count: 11,
													},
													{
														search_terms: "Luminal B Breast Carcinoma",
														count: 9,
													},
													{
														search_terms: "Breast Metaplastic Carcinoma",
														count: 6,
													},
													{
														search_terms: "Multifocal Breast Carcinoma",
														count: 3,
													},
													{
														search_terms: "Breast Inflammatory Carcinoma",
														count: 3,
													},
													{
														search_terms: "Invasive Breast Lobular Carcinoma",
														count: 3,
													},
													{
														search_terms: "Breast Ductal Carcinoma In Situ",
														count: 2,
													},
													{
														search_terms:
															"Breast Micropapillary Ductal Carcinoma In Situ",
														count: 1,
													},
													{
														search_terms: "Triple-Negative Breast Carcinoma",
														count: 1,
													},
													{
														search_terms:
															"Breast Adenocarcinoma with Spindle Cell Metaplasia",
														count: 1,
													},
													{
														search_terms: "Breast Lobular Carcinoma",
														count: 1,
													},
													{
														search_terms: "Breast Lobular Carcinoma In Situ",
														count: 1,
													},
													{
														search_terms:
															"Breast Squamous Cell Carcinoma, Acantholytic Variant",
														count: 1,
													},
												],
											},
											{
												search_terms:
													"Hematopoietic and Lymphoid System Cancer",
												children: [
													{
														search_terms: "B Acute Lymphoblastic Leukemia",
														count: 143,
													},
													{
														search_terms: "Acute Myeloid Leukemia",
														count: 122,
													},
													{
														search_terms: "Diffuse Large B-Cell Lymphoma",
														count: 43,
													},
													{
														search_terms: "Acute Lymphoblastic Leukemia",
														count: 37,
													},
													{
														search_terms: "Plasma Cell Myeloma",
														count: 31,
													},
													{
														search_terms: "Burkitt Lymphoma",
														count: 25,
													},
													{
														search_terms:
															"Childhood T Acute Lymphoblastic Leukemia",
														count: 24,
													},
													{
														search_terms: "T Acute Lymphoblastic Leukemia",
														count: 24,
													},
													{
														search_terms:
															"Recurrent T Acute Lymphoblastic Leukemia",
														count: 24,
													},
													{
														search_terms: "T Lymphoblastic Leukemia/Lymphoma",
														count: 19,
													},
													{
														search_terms:
															"Chronic Myelogenous Leukemia, BCR-ABL1 Positive",
														count: 18,
													},
													{
														search_terms: "Leukemia",
														count: 16,
													},
													{
														search_terms: "Mantle Cell Lymphoma",
														count: 16,
													},
													{
														search_terms: "Central Nervous System Lymphoma",
														count: 13,
													},
													{
														search_terms: "Lymphoma",
														count: 12,
													},
													{
														search_terms: "Hodgkin Lymphoma",
														count: 11,
													},
													{
														search_terms: "Anaplastic Large Cell Lymphoma",
														count: 9,
													},
													{
														search_terms: "B-Cell Non-Hodgkin Lymphoma",
														count: 8,
													},
													{
														search_terms:
															"Adult B Acute Lymphoblastic Leukemia",
														count: 7,
													},
													{
														search_terms: "Follicular Lymphoma",
														count: 6,
													},
													{
														search_terms: "Chronic Lymphocytic Leukemia",
														count: 6,
													},
													{
														search_terms: "Primary Effusion Lymphoma",
														count: 6,
													},
													{
														search_terms:
															"Early T Acute Lymphoblastic Leukemia",
														count: 6,
													},
													{
														search_terms:
															"Natural Killer Cell Lymphoblastic Leukemia/Lymphoma",
														count: 5,
													},
													{
														search_terms:
															"Primary Cutaneous T-Cell Non-Hodgkin Lymphoma",
														count: 5,
													},
													{
														search_terms: "Hairy Cell Leukemia",
														count: 4,
													},
													{
														search_terms: "Acute Monocytic Leukemia",
														count: 4,
													},
													{
														search_terms: "Angioimmunoblastic T-Cell Lymphoma",
														count: 4,
													},
													{
														search_terms: "Erythroleukemia",
														count: 4,
													},
													{
														search_terms: "Aggressive Non-Hodgkin Lymphoma",
														count: 4,
													},
													{
														search_terms: "Myelodysplastic Syndrome",
														count: 4,
													},
													{
														search_terms: "Adult Acute Monocytic Leukemia",
														count: 4,
													},
													{
														search_terms: "Adult T-Cell Leukemia/Lymphoma",
														count: 3,
													},
													{
														search_terms:
															"Childhood Acute Megakaryoblastic Leukemia",
														count: 3,
													},
													{
														search_terms: "Myeloid Leukemia",
														count: 2,
													},
													{
														search_terms:
															"Mycosis Fungoides and Sezary Syndrome",
														count: 2,
													},
													{
														search_terms: "Acute Leukemia",
														count: 2,
													},
													{
														search_terms: "Childhood Acute Monocytic Leukemia",
														count: 2,
													},
													{
														search_terms: "Non-Hodgkin Lymphoma",
														count: 2,
													},
													{
														search_terms: "Acute Megakaryoblastic Leukemia",
														count: 2,
													},
													{
														search_terms: "T Lymphoblastic Lymphoma",
														count: 2,
													},
													{
														search_terms: "Acute Biphenotypic Leukemia",
														count: 2,
													},
													{
														search_terms: "Splenic Marginal Zone Lymphoma",
														count: 1,
													},
													{
														search_terms: "Refractory Lymphoma",
														count: 1,
													},
													{
														search_terms:
															"T-Cell Large Granular Lymphocyte Leukemia",
														count: 1,
													},
													{
														search_terms: "Juvenile Myelomonocytic Leukemia",
														count: 1,
													},
													{
														search_terms:
															"Chronic Eosinophilic Leukemia, Not Otherwise Specified",
														count: 1,
													},
													{
														search_terms:
															"Adult Acute Promyelocytic Leukemia with PML-RARA",
														count: 1,
													},
													{
														search_terms: "Sezary Syndrome",
														count: 1,
													},
													{
														search_terms: "T-Cell Non-Hodgkin Lymphoma",
														count: 1,
													},
													{
														search_terms: "Centroblastic Lymphoma",
														count: 1,
													},
													{
														search_terms: "Mixed Phenotype Acute Leukemia",
														count: 1,
													},
													{
														search_terms:
															"Blastic Plasmacytoid Dendritic Cell Neoplasm",
														count: 1,
													},
													{
														search_terms:
															"Peripheral T-Cell Lymphoma, Not Otherwise Specified",
														count: 1,
													},
													{
														search_terms: "Lymphoblastic Lymphoma",
														count: 1,
													},
													{
														search_terms:
															"Childhood Acute Myeloid Leukemia with Maturation",
														count: 1,
													},
													{
														search_terms: "B-Cell Prolymphocytic Leukemia",
														count: 1,
													},
													{
														search_terms: "T-Cell Prolymphocytic Leukemia",
														count: 1,
													},
													{
														search_terms:
															"Mature T-Cell and NK-Cell Non-Hodgkin Lymphoma",
														count: 1,
													},
													{
														search_terms: "Marginal Zone Lymphoma",
														count: 1,
													},
													{
														search_terms:
															"Primary Mediastinal (Thymic) Large B-Cell Lymphoma",
														count: 1,
													},
												],
											},
											{
												search_terms: "Unclassified",
												children: [
													{
														search_terms: "Melanoma of Unknown Primary",
														count: 128,
													},
													{
														search_terms: "Melanoma",
														count: 17,
													},
													{
														search_terms: "Wilms Tumor",
														count: 13,
													},
													{
														search_terms: "Rhabdoid Tumor",
														count: 8,
													},
													{
														search_terms: "Mucosal Melanoma",
														count: 6,
													},
													{
														search_terms: "Endometrioid Adenocarcinoma",
														count: 6,
													},
													{
														search_terms: "Amelanotic Melanoma",
														count: 5,
													},
													{
														search_terms: "Malignant Mesothelioma",
														count: 4,
													},
													{
														search_terms: "Adenocarcinoma",
														count: 2,
													},
													{
														search_terms: "Recurrent Melanoma",
														count: 2,
													},
													{
														search_terms: "Carcinoma",
														count: 1,
													},
													{
														search_terms: "Epithelioid Mesothelioma",
														count: 1,
													},
													{
														search_terms: "Mucinous Cystadenocarcinoma",
														count: 1,
													},
													{
														search_terms: "Recurrent Rhabdoid Tumor",
														count: 1,
													},
													{
														search_terms:
															"Breast Intracystic Papillary Carcinoma",
														count: 1,
													},
													{
														search_terms: "Adenocarcinoma of Unknown Primary",
														count: 1,
													},
													{
														search_terms: "Basaloid Squamous Cell Carcinoma",
														count: 1,
													},
													{
														search_terms: "Yolk Sac Tumor",
														count: 1,
													},
													{
														search_terms: "Papillary Serous Cystadenocarcinoma",
														count: 1,
													},
												],
											},
											{
												search_terms: "Endocrine Cancer",
												children: [
													{
														search_terms: "Lung Small Cell Carcinoma",
														count: 100,
													},
													{
														search_terms: "Merkel Cell Carcinoma",
														count: 9,
													},
													{
														search_terms:
															"Lung Large Cell Neuroendocrine Carcinoma",
														count: 7,
													},
													{
														search_terms: "Neuroendocrine Carcinoma",
														count: 6,
													},
													{
														search_terms: "Lung Carcinoid Tumor",
														count: 6,
													},
													{
														search_terms: "Thyroid Gland Follicular Carcinoma",
														count: 6,
													},
													{
														search_terms: "Small Cell Neuroendocrine Carcinoma",
														count: 5,
													},
													{
														search_terms: "Lung Neuroendocrine Neoplasm",
														count: 4,
													},
													{
														search_terms: "Thyroid Gland Papillary Carcinoma",
														count: 3,
													},
													{
														search_terms:
															"Cervical Small Cell Neuroendocrine Carcinoma",
														count: 2,
													},
													{
														search_terms:
															"Hereditary Thyroid Gland Medullary Carcinoma",
														count: 1,
													},
													{
														search_terms:
															"Extrapulmonary Small Cell Neuroendocrine Carcinoma",
														count: 1,
													},
													{
														search_terms:
															"Thyroid Gland Hurthle Cell Carcinoma",
														count: 1,
													},
													{
														search_terms: "Bladder Neuroendocrine Carcinoma",
														count: 1,
													},
													{
														search_terms: "Adrenal Cortex Carcinoma",
														count: 1,
													},
												],
											},
											{
												search_terms: "Reproductive System Cancer",
												children: [
													{
														search_terms:
															"High Grade Ovarian Serous Adenocarcinoma",
														count: 80,
													},
													{
														search_terms: "Ovarian Cancer",
														count: 36,
													},
													{
														search_terms:
															"Endometrial Endometrioid Adenocarcinoma",
														count: 34,
													},
													{
														search_terms: "Ovarian Carcinoma",
														count: 30,
													},
													{
														search_terms: "Endometrial Adenocarcinoma",
														count: 25,
													},
													{
														search_terms: "Ovarian Serous Adenocarcinoma",
														count: 19,
													},
													{
														search_terms: "Uterine Carcinosarcoma",
														count: 17,
													},
													{
														search_terms:
															"Cervical Squamous Cell Carcinoma, Not Otherwise Specified",
														count: 14,
													},
													{
														search_terms:
															"Human Papillomavirus-Related Cervical Squamous Cell Carcinoma",
														count: 12,
													},
													{
														search_terms:
															"Malignant Mixed Mesodermal (Mullerian) Tumor",
														count: 9,
													},
													{
														search_terms: "Ovarian Clear Cell Adenocarcinoma",
														count: 8,
													},
													{
														search_terms: "Prostate Carcinoma",
														count: 8,
													},
													{
														search_terms: "Endometrial Carcinoma",
														count: 8,
													},
													{
														search_terms: "Cervical Adenocarcinoma",
														count: 7,
													},
													{
														search_terms: "Ovarian Cystadenocarcinoma",
														count: 7,
													},
													{
														search_terms: "Ovarian Adenocarcinoma",
														count: 6,
													},
													{
														search_terms: "Cervical Cancer",
														count: 6,
													},
													{
														search_terms: "Ovarian Endometrioid Adenocarcinoma",
														count: 6,
													},
													{
														search_terms: "Prostate Cancer",
														count: 5,
													},
													{
														search_terms: "Endometrial Serous Adenocarcinoma",
														count: 5,
													},
													{
														search_terms: "Ovarian Carcinosarcoma",
														count: 5,
													},
													{
														search_terms: "Ovarian Mucinous Adenocarcinoma",
														count: 4,
													},
													{
														search_terms: "Gestational Choriocarcinoma",
														count: 4,
													},
													{
														search_terms: "Ovarian Serous Cystadenocarcinoma",
														count: 4,
													},
													{
														search_terms:
															"Ovarian Serous Surface Papillary Adenocarcinoma",
														count: 4,
													},
													{
														search_terms: "Vaginal Cancer",
														count: 3,
													},
													{
														search_terms: "Uterine Cancer",
														count: 3,
													},
													{
														search_terms: "Testicular Cancer",
														count: 3,
													},
													{
														search_terms: "Testicular Embryonal Carcinoma",
														count: 2,
													},
													{
														search_terms:
															"Squamous Cell Carcinoma of the Penis",
														count: 2,
													},
													{
														search_terms: "Endometrial Adenosquamous Carcinoma",
														count: 2,
													},
													{
														search_terms: "Vulvar Squamous Cell Carcinoma",
														count: 2,
													},
													{
														search_terms: "Prostate Adenocarcinoma",
														count: 2,
													},
													{
														search_terms: "Uterine Corpus Carcinosarcoma",
														count: 2,
													},
													{
														search_terms: "Vulvar Carcinoma",
														count: 1,
													},
													{
														search_terms:
															"Malignant Ovarian Endometrioid Tumor",
														count: 1,
													},
													{
														search_terms: "Ovarian Undifferentiated Carcinoma",
														count: 1,
													},
													{
														search_terms: "Vulvar Melanoma",
														count: 1,
													},
													{
														search_terms: "Cervical Carcinoma",
														count: 1,
													},
													{
														search_terms:
															"Malignant Ovarian Granulosa Cell Tumor",
														count: 1,
													},
													{
														search_terms:
															"Low Grade Ovarian Serous Adenocarcinoma",
														count: 1,
													},
													{
														search_terms: "Cervical Carcinosarcoma",
														count: 1,
													},
													{
														search_terms: "Ovarian Yolk Sac Tumor",
														count: 1,
													},
													{
														search_terms: "Malignant Ovarian Brenner Tumor",
														count: 1,
													},
													{
														search_terms:
															"Testicular Teratoma with Somatic-Type Malignancy",
														count: 1,
													},
													{
														search_terms:
															"Childhood Malignant Testicular Germ Cell Tumor",
														count: 1,
													},
												],
											},
											{
												search_terms: "Nervous System Cancer",
												children: [
													{
														search_terms: "Brain Glioblastoma",
														count: 61,
													},
													{
														search_terms: "Glioblastoma",
														count: 58,
													},
													{
														search_terms: "Peripheral Neuroblastoma",
														count: 35,
													},
													{
														search_terms:
															"Glioblastoma, Not Otherwise Specified",
														count: 32,
													},
													{
														search_terms: "Neuroblastoma",
														count: 31,
													},
													{
														search_terms: "Glioblastoma, IDH-Wildtype",
														count: 29,
													},
													{
														search_terms: "Medulloblastoma",
														count: 28,
													},
													{
														search_terms: "Brain Astrocytoma",
														count: 22,
													},
													{
														search_terms: "Childhood Neuroblastoma",
														count: 17,
													},
													{
														search_terms: "Central Nervous System Cancer",
														count: 13,
													},
													{
														search_terms: "Atypical Teratoid/Rhabdoid Tumor",
														count: 11,
													},
													{
														search_terms: "Primitive Neuroectodermal Tumor",
														count: 10,
													},
													{
														search_terms: "Brain Stem Glioblastoma",
														count: 8,
													},
													{
														search_terms: "Adrenal Gland Neuroblastoma",
														count: 7,
													},
													{
														search_terms: "Ependymoma",
														count: 6,
													},
													{
														search_terms: "Anaplastic Astrocytoma",
														count: 5,
													},
													{
														search_terms: "Secondary Glioblastoma",
														count: 4,
													},
													{
														search_terms: "Glioblastoma, IDH-Mutant",
														count: 3,
													},
													{
														search_terms:
															"Anaplastic Oligodendroglioma, Not Otherwise Specified",
														count: 3,
													},
													{
														search_terms:
															"Embryonal Tumor with Multilayered Rosettes, Not Otherwise Specified",
														count: 3,
													},
													{
														search_terms: "Gliosarcoma",
														count: 3,
													},
													{
														search_terms: "Anaplastic Oligodendroglioma",
														count: 2,
													},
													{
														search_terms: "Askin Tumor",
														count: 2,
													},
													{
														search_terms: "Malignant Brain Glioma",
														count: 2,
													},
													{
														search_terms: "Diffuse Intrinsic Pontine Glioma",
														count: 2,
													},
													{
														search_terms: "Pineoblastoma",
														count: 1,
													},
													{
														search_terms: "Recurrent Malignant Glioma",
														count: 1,
													},
													{
														search_terms:
															"Embryonal Tumor with Multilayered Rosettes, C19MC-Altered",
														count: 1,
													},
													{
														search_terms: "Malignant Glioma",
														count: 1,
													},
													{
														search_terms: "Central Nervous System Germinoma",
														count: 1,
													},
													{
														search_terms:
															"Central Nervous System Embryonal Neoplasm",
														count: 1,
													},
													{
														search_terms: "Brain Cancer",
														count: 1,
													},
													{
														search_terms: "Childhood Ependymoma",
														count: 1,
													},
													{
														search_terms: "Childhood Meningeal Melanoma",
														count: 1,
													},
													{
														search_terms: "Mediastinal Neuroblastoma",
														count: 1,
													},
													{
														search_terms: "WHO Grade III Glioma",
														count: 1,
													},
												],
											},
											{
												search_terms: "Urinary System Cancer",
												children: [
													{
														search_terms: "Kidney Cancer",
														count: 52,
													},
													{
														search_terms: "Clear Cell Renal Cell Carcinoma",
														count: 52,
													},
													{
														search_terms: "Urinary System Cancer",
														count: 36,
													},
													{
														search_terms: "Bladder Carcinoma",
														count: 36,
													},
													{
														search_terms: "Renal Cell Carcinoma",
														count: 32,
													},
													{
														search_terms: "Bladder Cancer",
														count: 20,
													},
													{
														search_terms: "Urothelial Carcinoma",
														count: 19,
													},
													{
														search_terms: "Bladder Urothelial Carcinoma",
														count: 11,
													},
													{
														search_terms: "Childhood Kidney Wilms Tumor",
														count: 5,
													},
													{
														search_terms: "Papillary Renal Cell Carcinoma",
														count: 4,
													},
													{
														search_terms: "Kidney Carcinoma",
														count: 3,
													},
													{
														search_terms:
															"Bladder Papillary Urothelial Carcinoma",
														count: 3,
													},
													{
														search_terms: "Rhabdoid Tumor of the Kidney",
														count: 2,
													},
													{
														search_terms: "Ureter Urothelial Carcinoma",
														count: 1,
													},
													{
														search_terms: "Renal Pelvis Carcinoma",
														count: 1,
													},
													{
														search_terms: "Bladder Adenocarcinoma",
														count: 1,
													},
													{
														search_terms: "Kidney Wilms Tumor",
														count: 1,
													},
													{
														search_terms: "Bladder Squamous Cell Carcinoma",
														count: 1,
													},
												],
											},
											{
												search_terms: "Head and Neck Cancer",
												children: [
													{
														search_terms:
															"Lip and Oral Cavity Squamous Cell Carcinoma",
														count: 52,
													},
													{
														search_terms: "Tongue Squamous Cell Carcinoma",
														count: 40,
													},
													{
														search_terms:
															"Head and Neck Squamous Cell Carcinoma",
														count: 35,
													},
													{
														search_terms: "Laryngeal Squamous Cell Carcinoma",
														count: 21,
													},
													{
														search_terms: "Pharyngeal Squamous Cell Carcinoma",
														count: 20,
													},
													{
														search_terms: "Oral Cavity Squamous Cell Carcinoma",
														count: 16,
													},
													{
														search_terms: "Salivary Gland Cancer",
														count: 13,
													},
													{
														search_terms: "Thyroid Gland Anaplastic Carcinoma",
														count: 8,
													},
													{
														search_terms:
															"Buccal Mucosa Squamous Cell Carcinoma",
														count: 6,
													},
													{
														search_terms:
															"Floor of Mouth Squamous Cell Carcinoma",
														count: 6,
													},
													{
														search_terms: "Head and Neck Cancer",
														count: 6,
													},
													{
														search_terms: "Glottic Squamous Cell Carcinoma",
														count: 4,
													},
													{
														search_terms: "Thyroid Gland Cancer",
														count: 4,
													},
													{
														search_terms:
															"Retromolar Trigone Squamous Cell Carcinoma",
														count: 4,
													},
													{
														search_terms:
															"Hypopharyngeal Squamous Cell Carcinoma",
														count: 3,
													},
													{
														search_terms: "Gingival Squamous Cell Carcinoma",
														count: 2,
													},
													{
														search_terms: "Laryngeal Cancer",
														count: 2,
													},
													{
														search_terms:
															"Thyroid Gland Squamous Cell Carcinoma",
														count: 2,
													},
													{
														search_terms: "Hard Palate Squamous Cell Carcinoma",
														count: 2,
													},
													{
														search_terms: "Nasopharyngeal Carcinoma",
														count: 2,
													},
													{
														search_terms: "Tonsillar Squamous Cell Carcinoma",
														count: 2,
													},
													{
														search_terms: "Tongue Cancer",
														count: 1,
													},
													{
														search_terms: "Postcricoid Squamous Cell Carcinoma",
														count: 1,
													},
													{
														search_terms: "Oral Cavity Cancer",
														count: 1,
													},
													{
														search_terms:
															"Parotid Gland Mucoepidermoid Carcinoma",
														count: 1,
													},
													{
														search_terms:
															"Salivary Gland Mucoepidermoid Carcinoma",
														count: 1,
													},
													{
														search_terms:
															"Salivary Gland Squamous Cell Carcinoma",
														count: 1,
													},
													{
														search_terms: "Pharyngeal Cancer",
														count: 1,
													},
													{
														search_terms:
															"Supraglottic Squamous Cell Carcinoma",
														count: 1,
													},
													{
														search_terms: "Tonsillar Cancer",
														count: 1,
													},
												],
											},
											{
												search_terms: "Connective and Soft Tissue Cancer",
												children: [
													{
														search_terms: "Soft Tissue Sarcoma",
														count: 47,
													},
													{
														search_terms: "Bone Osteosarcoma",
														count: 45,
													},
													{
														search_terms: "Osteosarcoma",
														count: 38,
													},
													{
														search_terms: "Childhood Osteosarcoma",
														count: 37,
													},
													{
														search_terms: "Fusion-Negative Rhabdomyosarcoma",
														count: 25,
													},
													{
														search_terms: "Ewing Sarcoma",
														count: 19,
													},
													{
														search_terms: "Fusion-Positive Rhabdomyosarcoma",
														count: 17,
													},
													{
														search_terms: "Fibrosarcoma",
														count: 16,
													},
													{
														search_terms:
															"Undifferentiated Pleomorphic Sarcoma",
														count: 15,
													},
													{
														search_terms: "Uterine Corpus Leiomyosarcoma",
														count: 15,
													},
													{
														search_terms: "Alveolar Rhabdomyosarcoma",
														count: 15,
													},
													{
														search_terms: "Ewing Sarcoma of Bone",
														count: 13,
													},
													{
														search_terms: "Synovial Sarcoma",
														count: 12,
													},
													{
														search_terms: "Rhabdomyosarcoma",
														count: 11,
													},
													{
														search_terms: "Sarcoma",
														count: 10,
													},
													{
														search_terms: "Leiomyosarcoma",
														count: 10,
													},
													{
														search_terms: "Liposarcoma",
														count: 8,
													},
													{
														search_terms: "Childhood Soft Tissue Sarcoma",
														count: 6,
													},
													{
														search_terms: "Chondrosarcoma",
														count: 6,
													},
													{
														search_terms:
															"Childhood Desmoplastic Small Round Cell Tumor",
														count: 5,
													},
													{
														search_terms: "Embryonal Rhabdomyosarcoma",
														count: 5,
													},
													{
														search_terms: "Uterine Corpus Sarcoma",
														count: 4,
													},
													{
														search_terms: "Gastrointestinal Stromal Tumor",
														count: 4,
													},
													{
														search_terms: "Epithelioid Sarcoma",
														count: 4,
													},
													{
														search_terms: "Sacral Chordoma",
														count: 3,
													},
													{
														search_terms: "Bone Sarcoma",
														count: 3,
													},
													{
														search_terms:
															"Malignancy in Giant Cell Tumor of Bone",
														count: 3,
													},
													{
														search_terms: "Spindle Cell Sarcoma",
														count: 3,
													},
													{
														search_terms: "Metastatic Bone Sarcoma",
														count: 3,
													},
													{
														search_terms:
															"Malignant Gastric Gastrointestinal Stromal Tumor",
														count: 2,
													},
													{
														search_terms: "Undifferentiated Round Cell Sarcoma",
														count: 2,
													},
													{
														search_terms:
															"Advanced Gastrointestinal Stromal Tumor",
														count: 2,
													},
													{
														search_terms: "Spindle Cell Rhabdomyosarcoma",
														count: 1,
													},
													{
														search_terms:
															"Malignant Epithelioid Cell Type Gastrointestinal Stromal Tumor",
														count: 1,
													},
													{
														search_terms: "Clear Cell Sarcoma of Soft Tissue",
														count: 1,
													},
													{
														search_terms: "Clivus Chordoma",
														count: 1,
													},
													{
														search_terms: "Childhood Epithelioid Sarcoma",
														count: 1,
													},
													{
														search_terms: "Liver Embryonal Sarcoma",
														count: 1,
													},
													{
														search_terms: "Childhood Rhabdomyosarcoma",
														count: 1,
													},
													{
														search_terms: "Ovarian Leiomyosarcoma",
														count: 1,
													},
													{
														search_terms: "Refractory Osteosarcoma",
														count: 1,
													},
													{
														search_terms: "Sclerosing Rhabdomyosarcoma",
														count: 1,
													},
													{
														search_terms: "Childhood Fibrosarcoma",
														count: 1,
													},
													{
														search_terms:
															"Uterine Corpus Myxoid Leiomyosarcoma",
														count: 1,
													},
													{
														search_terms: "Childhood Synovial Sarcoma",
														count: 1,
													},
													{
														search_terms: "Kidney Ewing Sarcoma",
														count: 1,
													},
													{
														search_terms: "Endometrioid Stromal Sarcoma",
														count: 1,
													},
													{
														search_terms:
															"Childhood Gastrointestinal Stromal Tumor",
														count: 1,
													},
													{
														search_terms: "Primary Central Chondrosarcoma",
														count: 1,
													},
													{
														search_terms: "Vulvar Leiomyosarcoma",
														count: 1,
													},
													{
														search_terms: "Small Cell Sarcoma",
														count: 1,
													},
													{
														search_terms: "Thyroid Gland Sarcoma",
														count: 1,
													},
													{
														search_terms: "Childhood Liposarcoma",
														count: 1,
													},
												],
											},
											{
												search_terms: "Eye Cancer",
												children: [
													{
														search_terms:
															"Childhood Intraocular Retinoblastoma",
														count: 38,
													},
													{
														search_terms: "Uveal Melanoma",
														count: 5,
													},
													{
														search_terms: "Retinoblastoma",
														count: 2,
													},
												],
											},
											{
												search_terms: "Peritoneal and Retroperitoneal Cancer",
												children: [
													{
														search_terms: "Primary Peritoneal Carcinoma",
														count: 1,
													},
												],
											},
										],
									}}
									onSliceClick={onGraphClick}
								/>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-12 col-md-12">
							<div className="text-center">
								<h3>Most used drugs</h3>
							</div>
							<div style={{ height: "600px" }}>
								<BarChart
									chartTitle="Models by top mutated gene"
									onBarClick={onGraphClick}
									rotateTicks={true}
									data={[
										{
											treatment_list: "fluorouracil",
											count: 246,
										},
										{
											treatment_list: "oxaliplatin",
											count: 208,
										},
										{
											treatment_list: "leucovorin calcium",
											count: 184,
										},
										{
											treatment_list: "radiation therapy",
											count: 159,
										},
										{
											treatment_list: "cisplatin",
											count: 122,
										},
										{
											treatment_list: "cyclophosphamide",
											count: 113,
										},
										{
											treatment_list: "gemcitabine",
											count: 110,
										},
										{
											treatment_list: "irinotecan",
											count: 109,
										},
										{
											treatment_list: "doxorubicin",
											count: 99,
										},
										{
											treatment_list: "bevacizumab",
											count: 98,
										},
										{
											treatment_list: "paclitaxel",
											count: 97,
										},
										{
											treatment_list: "leucovorin",
											count: 96,
										},
										{
											treatment_list: "nab-paclitaxel",
											count: 93,
										},
										{
											treatment_list: "capecitabine",
											count: 81,
										},
										{
											treatment_list: "carboplatin",
											count: 74,
										},
									]}
									indexKey="treatment_list"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Overview;
