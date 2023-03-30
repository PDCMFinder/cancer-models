import { NextPage } from "next";
import BarChart from "../components/BarChart/BarChart";
import DonutChart from "../components/DonutChart/DonutChart";
import SunBurstChart from "../components/SunBurstChart/SunBurstChart";
import Features from "../../public/img/world_countries.json";
import Button from "../components/Button/Button";
import { useQuery } from "react-query";
import { getModelsByType } from "../apis/AggregatedData.api";
import { capitalizeFirstLetter } from "../utils/dataUtils";

function collapseEthnicity(
	ethnicityList: { patient_ethnicity: string; count: number }[]
) {
	const ethnicityDictionary: any = Object.fromEntries(
		Object.entries({
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
			"Not Collected": "Not Provided",
			Mixed_or_unknown: "Not Provided",
			Other: "Not Provided",
			Arabic: "Other",
			"Native Hawaiian Or Other Pacific Islander": "Other",
			"Not hispanic or Latino": "Other",
			Asian: "Asian",
			Hispanic: "Hispanic Or Latino",
			"Hispanic Or Latino": "Hispanic Or Latino",
			White: "White",
		}).map(([k, v]) => [k.toLowerCase(), v])
	);

	const mappedEthnictyCounts: any = {};

	ethnicityList.forEach((ethnicity) => {
		const mappedEthnicty =
			ethnicityDictionary[ethnicity.patient_ethnicity.toLowerCase()];
		if (!mappedEthnicty) console.log(ethnicity.patient_ethnicity);

		if (!mappedEthnictyCounts[mappedEthnicty]) {
			mappedEthnictyCounts[mappedEthnicty] = 0;
		}
		mappedEthnictyCounts[mappedEthnicty] += ethnicity.count;
	});
	return Object.keys(mappedEthnictyCounts).map((e) => {
		return { patient_ethnicity: e, count: mappedEthnictyCounts[e] };
	});
}

function collapseAgeGroup(
	ageGroupList: { patient_age: string; count: number }[]
) {
	const pediatricAgeGroups = ["0 - 23 months", "2 - 9", "10 - 19"];
	const mappedAgeGroups: any = { pediatric: 0, adult: 0, "not specified": 0 };
	ageGroupList.forEach((a) => {
		if (pediatricAgeGroups.includes(a.patient_age)) {
			mappedAgeGroups.pediatric += a.count;
		} else if (a.patient_age.toLowerCase() !== "not specified") {
			mappedAgeGroups.adult += a.count;
		} else {
			mappedAgeGroups["not specified"] += a.count;
		}
	});

	return Object.keys(mappedAgeGroups).map((e) => {
		return { patient_age: e, count: mappedAgeGroups[e] };
	});
}

const Overview: NextPage = () => {
	let modelsByTypeCountsQuery = useQuery("modelsByTypeCounts", () => {
		return getModelsByType();
	});
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
						<div className="col-12 col-lg-6 text-center text-lg-left mb-5">
							<h2>
								Some title letting the user know about all the different models
								and encouraging to explore them.
							</h2>
							<p>
								Tempus nunc arcu in faucibus amet turpis molestie quam
								elementum. Id a pretium nisl facilisis. Dui adipiscing tortor
								fames sed ornare nunc cursus. Tempus ultricies massa feugiat
								tortor porttitor ultrices nunc quam condimentum.
							</p>
						</div>
						<div className="col-12 col-lg-5 offset-lg-1 mb-5">
							<div style={{ height: "600px", width: "100%" }}>
								{modelsByTypeCountsQuery.data ? (
									<DonutChart
										keyId="model_type"
										data={
											modelsByTypeCountsQuery.data
												? modelsByTypeCountsQuery.data
														?.filter((d) => d.modelType !== "other")
														.map((d) => {
															return {
																model_type: capitalizeFirstLetter(d.modelType),
																count: d.count,
															};
														})
														.sort((a: any, b: any) => a.count - b.count)
												: []
										}
									/>
								) : null}
							</div>
						</div>
					</div>
					<div className="row mb-5 align-center">
						<div className="col-12 col-lg-6 offset-lg-1 order-lg-1 text-center text-lg-left mb-5">
							<h2>
								Text about users being able to upload their own model data and
								contribute to this statistics.
							</h2>
							<p>
								Non diam velit porta velit tempor volutpat elit eleifend velit.
								Etiam tellus aliquam blandit nunc nunc gravida tempus risus.
								Tristique gravida gravida tortor fermentum tincidunt eu
								sollicitudin. Platea amet nisl ac amet vel sapien magna.
							</p>
						</div>
						<div className="col-12 col-lg-5 mb-5">
							<div style={{ height: "600px" }}>
								<BarChart
									chartTitle="Models by top mutated gene"
									onBarClick={(category) => {
										return;
									}}
									rotateTicks={true}
									data={collapseEthnicity([
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
											patient_ethnicity: "Latino",
											count: 1,
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
											patient_ethnicity: "White; Hispanic Or Latino",
											count: 2,
										},
										{
											patient_ethnicity: "White; Not Hispanic Or Latino",
											count: 1,
										},
										{
											patient_ethnicity: "Unknown",
											count: 733,
										},
									]).sort((a, b) => b.count - a.count)}
									indexKey="patient_ethnicity"
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
								className="mb-1 mr-3"
								htmlTag="a"
							>
								Submit model data
							</Button>
							<Button
								href="/search"
								priority="secondary"
								color="dark"
								className="mt-1 ml-3"
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
								<h3>Models by primary site</h3>
							</div>
							<div style={{ height: "600px" }}>
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
								/>
							</div>
						</div>
						<div className="col-12 col-md-6">
							<div className="text-center">
								<h3>Models by gender</h3>
							</div>
							<div style={{ height: "600px" }}>
								<DonutChart
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
					</div>
					<div className="row">
						<div className="col-12 col-md-6">
							<div className="text-center">
								<h3>Models by anatomical system & diagnosis</h3>
							</div>
							<div style={{ height: "600px" }}>
								<SunBurstChart
									keyId="name"
									data={{
										name: "PDCM",
										children: [
											{
												name: "Digestive System Cancer",
												children: [
													{
														name: "Colorectal Carcinoma",
														count: 641,
													},
													{
														name: "Colon Adenocarcinoma",
														count: 477,
													},
													{
														name: "Colorectal Adenocarcinoma",
														count: 243,
													},
													{
														name: "Pancreatic Ductal Adenocarcinoma",
														count: 196,
													},
													{
														name: "Pancreatic Adenocarcinoma",
														count: 157,
													},
													{
														name: "Colon Cancer",
														count: 90,
													},
													{
														name: "Gastric Carcinoma",
														count: 76,
													},
													{
														name: "Rectal Adenocarcinoma",
														count: 62,
													},
													{
														name: "Pancreatic Cancer",
														count: 57,
													},
													{
														name: "Esophageal Adenocarcinoma",
														count: 56,
													},
													{
														name: "Gastric Cancer",
														count: 41,
													},
													{
														name: "Cholangiocarcinoma",
														count: 40,
													},
													{
														name: "Esophageal Squamous Cell Carcinoma",
														count: 32,
													},
													{
														name: "Hepatocellular Carcinoma",
														count: 28,
													},
													{
														name: "Ampulla of Vater Adenocarcinoma",
														count: 26,
													},
													{
														name: "Colon Carcinoma",
														count: 24,
													},
													{
														name: "Gastric Adenocarcinoma",
														count: 23,
													},
													{
														name: "Cecum Adenocarcinoma",
														count: 23,
													},
													{
														name: "Colon Mucinous Adenocarcinoma",
														count: 18,
													},
													{
														name: "Gastroesophageal Junction Adenocarcinoma",
														count: 17,
													},
													{
														name: "Pancreatic Carcinoma",
														count: 13,
													},
													{
														name: "Hepatobiliary Cancer",
														count: 12,
													},
													{
														name: "Colorectal Cancer",
														count: 11,
													},
													{
														name: "Small Intestinal Adenocarcinoma",
														count: 11,
													},
													{
														name: "Anal Squamous Cell Carcinoma",
														count: 8,
													},
													{
														name: "Intrahepatic Cholangiocarcinoma",
														count: 7,
													},
													{
														name: "Hepatoblastoma",
														count: 7,
													},
													{
														name: "Gastric Tubular Adenocarcinoma",
														count: 6,
													},
													{
														name: "Gallbladder Carcinoma",
														count: 6,
													},
													{
														name: "Pancreatic Adenosquamous Carcinoma",
														count: 6,
													},
													{
														name: "Anal Cancer",
														count: 5,
													},
													{
														name: "Pancreatic Neuroendocrine Carcinoma",
														count: 5,
													},
													{
														name: "Gastric Signet Ring Cell Adenocarcinoma",
														count: 5,
													},
													{
														name: "Esophageal Cancer",
														count: 4,
													},
													{
														name: "Pancreatic Intraductal Papillary-Mucinous Neoplasm with an Associated Invasive Carcinoma",
														count: 3,
													},
													{
														name: "Liver and Intrahepatic Bile Duct Carcinoma",
														count: 3,
													},
													{
														name: "Duodenal Adenocarcinoma",
														count: 3,
													},
													{
														name: "Colorectal Mucinous Adenocarcinoma",
														count: 3,
													},
													{
														name: "Extrahepatic Bile Duct Carcinoma",
														count: 3,
													},
													{
														name: "Pancreatic Colloid Carcinoma",
														count: 3,
													},
													{
														name: "Hepatosplenic T-Cell Lymphoma",
														count: 3,
													},
													{
														name: "Gallbladder Adenocarcinoma",
														count: 2,
													},
													{
														name: "Pancreatic Poorly Differentiated Ductal Adenocarcinoma",
														count: 2,
													},
													{
														name: "Pancreatic Moderately Differentiated Ductal Adenocarcinoma",
														count: 2,
													},
													{
														name: "Biliary Tract Carcinoma",
														count: 2,
													},
													{
														name: "Gastric Small Cell Neuroendocrine Carcinoma",
														count: 2,
													},
													{
														name: "Gastric Fundus Carcinoma",
														count: 1,
													},
													{
														name: "Bile Duct Adenocarcinoma",
														count: 1,
													},
													{
														name: "Hilar Cholangiocarcinoma",
														count: 1,
													},
													{
														name: "Gastric Neuroendocrine Carcinoma",
														count: 1,
													},
													{
														name: "Pancreatic Mixed Acinar-Neuroendocrine Carcinoma",
														count: 1,
													},
													{
														name: "Colorectal Medullary Carcinoma",
														count: 1,
													},
													{
														name: "Appendix Carcinoma",
														count: 1,
													},
													{
														name: "Pancreatic Undifferentiated Carcinoma",
														count: 1,
													},
													{
														name: "Colon Squamous Cell Carcinoma",
														count: 1,
													},
													{
														name: "Anal Adenocarcinoma",
														count: 1,
													},
													{
														name: "Exocrine Pancreas Cancer",
														count: 1,
													},
													{
														name: "Rectal Cribriform Comedo-Type Adenocarcinoma",
														count: 1,
													},
													{
														name: "Adult Liver Carcinoma",
														count: 1,
													},
													{
														name: "Gallbladder Undifferentiated Carcinoma",
														count: 1,
													},
													{
														name: "Appendix Cancer",
														count: 1,
													},
													{
														name: "Barrett Adenocarcinoma",
														count: 1,
													},
													{
														name: "Anal Canal Squamous Cell Carcinoma",
														count: 1,
													},
													{
														name: "Pancreatic Squamous Cell Carcinoma",
														count: 1,
													},
													{
														name: "Duodenal Carcinoma",
														count: 1,
													},
													{
														name: "Gastric Adenosquamous Carcinoma",
														count: 1,
													},
													{
														name: "Gastric Mucinous Adenocarcinoma",
														count: 1,
													},
													{
														name: "Rectosigmoid Adenocarcinoma",
														count: 1,
													},
													{
														name: "Pancreatic Acinar Cell Carcinoma",
														count: 1,
													},
													{
														name: "Extrahepatic Bile Duct Adenosquamous Carcinoma",
														count: 1,
													},
													{
														name: "Gastric Choriocarcinoma",
														count: 1,
													},
												],
											},
											{
												name: "Skin Cancer",
												children: [
													{
														name: "Cutaneous Melanoma",
														count: 350,
													},
													{
														name: "Cutaneous Nodular Melanoma",
														count: 16,
													},
													{
														name: "Skin Squamous Cell Carcinoma",
														count: 13,
													},
													{
														name: "Low-CSD Melanoma",
														count: 9,
													},
													{
														name: "Amelanotic Cutaneous Melanoma",
														count: 8,
													},
													{
														name: "Acral Lentiginous Melanoma",
														count: 8,
													},
													{
														name: "Skin Carcinoma",
														count: 2,
													},
													{
														name: "Stage 0 Cutaneous Melanoma AJCC v6 and v7",
														count: 2,
													},
													{
														name: "Lentigo Maligna Melanoma",
														count: 1,
													},
													{
														name: "Skin Basal Cell Carcinoma",
														count: 1,
													},
													{
														name: "Keratoacanthoma",
														count: 1,
													},
												],
											},
											{
												name: "Thoracic Cancer",
												children: [
													{
														name: "Lung Adenocarcinoma",
														count: 284,
													},
													{
														name: "Lung Squamous Cell Carcinoma",
														count: 221,
													},
													{
														name: "Lung Non-Small Cell Carcinoma",
														count: 117,
													},
													{
														name: "Lung Cancer",
														count: 27,
													},
													{
														name: "Lung Large Cell Carcinoma",
														count: 20,
													},
													{
														name: "Pleural Epithelioid Mesothelioma",
														count: 15,
													},
													{
														name: "Lung Carcinoma",
														count: 14,
													},
													{
														name: "Lung Adenosquamous Carcinoma",
														count: 12,
													},
													{
														name: "Pleural Mesothelioma",
														count: 10,
													},
													{
														name: "Pleural Biphasic Mesothelioma",
														count: 7,
													},
													{
														name: "Pleural Malignant Mesothelioma",
														count: 7,
													},
													{
														name: "Lung Pleomorphic Carcinoma",
														count: 6,
													},
													{
														name: "Pleural Sarcomatoid Mesothelioma",
														count: 5,
													},
													{
														name: "Lung Giant Cell Carcinoma",
														count: 4,
													},
													{
														name: "Thoracic Cancer",
														count: 3,
													},
													{
														name: "Lung Papillary Adenocarcinoma",
														count: 3,
													},
													{
														name: "Lung Acinar Adenocarcinoma",
														count: 2,
													},
													{
														name: "Lung Mucoepidermoid Carcinoma",
														count: 2,
													},
													{
														name: "Solid Lung Adenocarcinoma",
														count: 1,
													},
													{
														name: "Lung Colloid Adenocarcinoma",
														count: 1,
													},
													{
														name: "Lung Sarcomatoid Carcinoma",
														count: 1,
													},
													{
														name: "Lung Basaloid Squamous Cell  Carcinoma",
														count: 1,
													},
													{
														name: "Lung Adenocarcinoma In Situ",
														count: 1,
													},
													{
														name: "Bronchogenic Carcinoma",
														count: 1,
													},
												],
											},
											{
												name: "Breast Cancer",
												children: [
													{
														name: "Invasive Breast Carcinoma of No Special Type",
														count: 158,
													},
													{
														name: "Breast Carcinoma",
														count: 104,
													},
													{
														name: "Breast Cancer",
														count: 70,
													},
													{
														name: "Breast Ductal Carcinoma",
														count: 50,
													},
													{
														name: "Invasive Breast Carcinoma",
														count: 38,
													},
													{
														name: "Breast Adenocarcinoma",
														count: 13,
													},
													{
														name: "Basal-Like Breast Carcinoma",
														count: 11,
													},
													{
														name: "Luminal B Breast Carcinoma",
														count: 9,
													},
													{
														name: "Breast Metaplastic Carcinoma",
														count: 6,
													},
													{
														name: "Multifocal Breast Carcinoma",
														count: 3,
													},
													{
														name: "Breast Inflammatory Carcinoma",
														count: 3,
													},
													{
														name: "Invasive Breast Lobular Carcinoma",
														count: 3,
													},
													{
														name: "Breast Ductal Carcinoma In Situ",
														count: 2,
													},
													{
														name: "Breast Micropapillary Ductal Carcinoma In Situ",
														count: 1,
													},
													{
														name: "Triple-Negative Breast Carcinoma",
														count: 1,
													},
													{
														name: "Breast Adenocarcinoma with Spindle Cell Metaplasia",
														count: 1,
													},
													{
														name: "Breast Lobular Carcinoma",
														count: 1,
													},
													{
														name: "Breast Lobular Carcinoma In Situ",
														count: 1,
													},
													{
														name: "Breast Squamous Cell Carcinoma, Acantholytic Variant",
														count: 1,
													},
												],
											},
											{
												name: "Hematopoietic and Lymphoid System Cancer",
												children: [
													{
														name: "B Acute Lymphoblastic Leukemia",
														count: 143,
													},
													{
														name: "Acute Myeloid Leukemia",
														count: 122,
													},
													{
														name: "Diffuse Large B-Cell Lymphoma",
														count: 43,
													},
													{
														name: "Acute Lymphoblastic Leukemia",
														count: 37,
													},
													{
														name: "Plasma Cell Myeloma",
														count: 31,
													},
													{
														name: "Burkitt Lymphoma",
														count: 25,
													},
													{
														name: "Childhood T Acute Lymphoblastic Leukemia",
														count: 24,
													},
													{
														name: "T Acute Lymphoblastic Leukemia",
														count: 24,
													},
													{
														name: "Recurrent T Acute Lymphoblastic Leukemia",
														count: 24,
													},
													{
														name: "T Lymphoblastic Leukemia/Lymphoma",
														count: 19,
													},
													{
														name: "Chronic Myelogenous Leukemia, BCR-ABL1 Positive",
														count: 18,
													},
													{
														name: "Leukemia",
														count: 16,
													},
													{
														name: "Mantle Cell Lymphoma",
														count: 16,
													},
													{
														name: "Central Nervous System Lymphoma",
														count: 13,
													},
													{
														name: "Lymphoma",
														count: 12,
													},
													{
														name: "Hodgkin Lymphoma",
														count: 11,
													},
													{
														name: "Anaplastic Large Cell Lymphoma",
														count: 9,
													},
													{
														name: "B-Cell Non-Hodgkin Lymphoma",
														count: 8,
													},
													{
														name: "Adult B Acute Lymphoblastic Leukemia",
														count: 7,
													},
													{
														name: "Follicular Lymphoma",
														count: 6,
													},
													{
														name: "Chronic Lymphocytic Leukemia",
														count: 6,
													},
													{
														name: "Primary Effusion Lymphoma",
														count: 6,
													},
													{
														name: "Early T Acute Lymphoblastic Leukemia",
														count: 6,
													},
													{
														name: "Natural Killer Cell Lymphoblastic Leukemia/Lymphoma",
														count: 5,
													},
													{
														name: "Primary Cutaneous T-Cell Non-Hodgkin Lymphoma",
														count: 5,
													},
													{
														name: "Hairy Cell Leukemia",
														count: 4,
													},
													{
														name: "Acute Monocytic Leukemia",
														count: 4,
													},
													{
														name: "Angioimmunoblastic T-Cell Lymphoma",
														count: 4,
													},
													{
														name: "Erythroleukemia",
														count: 4,
													},
													{
														name: "Aggressive Non-Hodgkin Lymphoma",
														count: 4,
													},
													{
														name: "Myelodysplastic Syndrome",
														count: 4,
													},
													{
														name: "Adult Acute Monocytic Leukemia",
														count: 4,
													},
													{
														name: "Adult T-Cell Leukemia/Lymphoma",
														count: 3,
													},
													{
														name: "Childhood Acute Megakaryoblastic Leukemia",
														count: 3,
													},
													{
														name: "Myeloid Leukemia",
														count: 2,
													},
													{
														name: "Mycosis Fungoides and Sezary Syndrome",
														count: 2,
													},
													{
														name: "Acute Leukemia",
														count: 2,
													},
													{
														name: "Childhood Acute Monocytic Leukemia",
														count: 2,
													},
													{
														name: "Non-Hodgkin Lymphoma",
														count: 2,
													},
													{
														name: "Acute Megakaryoblastic Leukemia",
														count: 2,
													},
													{
														name: "T Lymphoblastic Lymphoma",
														count: 2,
													},
													{
														name: "Acute Biphenotypic Leukemia",
														count: 2,
													},
													{
														name: "Splenic Marginal Zone Lymphoma",
														count: 1,
													},
													{
														name: "Refractory Lymphoma",
														count: 1,
													},
													{
														name: "T-Cell Large Granular Lymphocyte Leukemia",
														count: 1,
													},
													{
														name: "Juvenile Myelomonocytic Leukemia",
														count: 1,
													},
													{
														name: "Chronic Eosinophilic Leukemia, Not Otherwise Specified",
														count: 1,
													},
													{
														name: "Adult Acute Promyelocytic Leukemia with PML-RARA",
														count: 1,
													},
													{
														name: "Sezary Syndrome",
														count: 1,
													},
													{
														name: "T-Cell Non-Hodgkin Lymphoma",
														count: 1,
													},
													{
														name: "Centroblastic Lymphoma",
														count: 1,
													},
													{
														name: "Mixed Phenotype Acute Leukemia",
														count: 1,
													},
													{
														name: "Blastic Plasmacytoid Dendritic Cell Neoplasm",
														count: 1,
													},
													{
														name: "Peripheral T-Cell Lymphoma, Not Otherwise Specified",
														count: 1,
													},
													{
														name: "Lymphoblastic Lymphoma",
														count: 1,
													},
													{
														name: "Childhood Acute Myeloid Leukemia with Maturation",
														count: 1,
													},
													{
														name: "B-Cell Prolymphocytic Leukemia",
														count: 1,
													},
													{
														name: "T-Cell Prolymphocytic Leukemia",
														count: 1,
													},
													{
														name: "Mature T-Cell and NK-Cell Non-Hodgkin Lymphoma",
														count: 1,
													},
													{
														name: "Marginal Zone Lymphoma",
														count: 1,
													},
													{
														name: "Primary Mediastinal (Thymic) Large B-Cell Lymphoma",
														count: 1,
													},
												],
											},
											{
												name: "Unclassified",
												children: [
													{
														name: "Melanoma of Unknown Primary",
														count: 128,
													},
													{
														name: "Melanoma",
														count: 17,
													},
													{
														name: "Wilms Tumor",
														count: 13,
													},
													{
														name: "Rhabdoid Tumor",
														count: 8,
													},
													{
														name: "Mucosal Melanoma",
														count: 6,
													},
													{
														name: "Endometrioid Adenocarcinoma",
														count: 6,
													},
													{
														name: "Amelanotic Melanoma",
														count: 5,
													},
													{
														name: "Malignant Mesothelioma",
														count: 4,
													},
													{
														name: "Adenocarcinoma",
														count: 2,
													},
													{
														name: "Recurrent Melanoma",
														count: 2,
													},
													{
														name: "Carcinoma",
														count: 1,
													},
													{
														name: "Epithelioid Mesothelioma",
														count: 1,
													},
													{
														name: "Mucinous Cystadenocarcinoma",
														count: 1,
													},
													{
														name: "Recurrent Rhabdoid Tumor",
														count: 1,
													},
													{
														name: "Breast Intracystic Papillary Carcinoma",
														count: 1,
													},
													{
														name: "Adenocarcinoma of Unknown Primary",
														count: 1,
													},
													{
														name: "Basaloid Squamous Cell Carcinoma",
														count: 1,
													},
													{
														name: "Yolk Sac Tumor",
														count: 1,
													},
													{
														name: "Papillary Serous Cystadenocarcinoma",
														count: 1,
													},
												],
											},
											{
												name: "Endocrine Cancer",
												children: [
													{
														name: "Lung Small Cell Carcinoma",
														count: 100,
													},
													{
														name: "Merkel Cell Carcinoma",
														count: 9,
													},
													{
														name: "Lung Large Cell Neuroendocrine Carcinoma",
														count: 7,
													},
													{
														name: "Neuroendocrine Carcinoma",
														count: 6,
													},
													{
														name: "Lung Carcinoid Tumor",
														count: 6,
													},
													{
														name: "Thyroid Gland Follicular Carcinoma",
														count: 6,
													},
													{
														name: "Small Cell Neuroendocrine Carcinoma",
														count: 5,
													},
													{
														name: "Lung Neuroendocrine Neoplasm",
														count: 4,
													},
													{
														name: "Thyroid Gland Papillary Carcinoma",
														count: 3,
													},
													{
														name: "Cervical Small Cell Neuroendocrine Carcinoma",
														count: 2,
													},
													{
														name: "Hereditary Thyroid Gland Medullary Carcinoma",
														count: 1,
													},
													{
														name: "Extrapulmonary Small Cell Neuroendocrine Carcinoma",
														count: 1,
													},
													{
														name: "Thyroid Gland Hurthle Cell Carcinoma",
														count: 1,
													},
													{
														name: "Bladder Neuroendocrine Carcinoma",
														count: 1,
													},
													{
														name: "Adrenal Cortex Carcinoma",
														count: 1,
													},
												],
											},
											{
												name: "Reproductive System Cancer",
												children: [
													{
														name: "High Grade Ovarian Serous Adenocarcinoma",
														count: 80,
													},
													{
														name: "Ovarian Cancer",
														count: 36,
													},
													{
														name: "Endometrial Endometrioid Adenocarcinoma",
														count: 34,
													},
													{
														name: "Ovarian Carcinoma",
														count: 30,
													},
													{
														name: "Endometrial Adenocarcinoma",
														count: 25,
													},
													{
														name: "Ovarian Serous Adenocarcinoma",
														count: 19,
													},
													{
														name: "Uterine Carcinosarcoma",
														count: 17,
													},
													{
														name: "Cervical Squamous Cell Carcinoma, Not Otherwise Specified",
														count: 14,
													},
													{
														name: "Human Papillomavirus-Related Cervical Squamous Cell Carcinoma",
														count: 12,
													},
													{
														name: "Malignant Mixed Mesodermal (Mullerian) Tumor",
														count: 9,
													},
													{
														name: "Ovarian Clear Cell Adenocarcinoma",
														count: 8,
													},
													{
														name: "Prostate Carcinoma",
														count: 8,
													},
													{
														name: "Endometrial Carcinoma",
														count: 8,
													},
													{
														name: "Cervical Adenocarcinoma",
														count: 7,
													},
													{
														name: "Ovarian Cystadenocarcinoma",
														count: 7,
													},
													{
														name: "Ovarian Adenocarcinoma",
														count: 6,
													},
													{
														name: "Cervical Cancer",
														count: 6,
													},
													{
														name: "Ovarian Endometrioid Adenocarcinoma",
														count: 6,
													},
													{
														name: "Prostate Cancer",
														count: 5,
													},
													{
														name: "Endometrial Serous Adenocarcinoma",
														count: 5,
													},
													{
														name: "Ovarian Carcinosarcoma",
														count: 5,
													},
													{
														name: "Ovarian Mucinous Adenocarcinoma",
														count: 4,
													},
													{
														name: "Gestational Choriocarcinoma",
														count: 4,
													},
													{
														name: "Ovarian Serous Cystadenocarcinoma",
														count: 4,
													},
													{
														name: "Ovarian Serous Surface Papillary Adenocarcinoma",
														count: 4,
													},
													{
														name: "Vaginal Cancer",
														count: 3,
													},
													{
														name: "Uterine Cancer",
														count: 3,
													},
													{
														name: "Testicular Cancer",
														count: 3,
													},
													{
														name: "Testicular Embryonal Carcinoma",
														count: 2,
													},
													{
														name: "Squamous Cell Carcinoma of the Penis",
														count: 2,
													},
													{
														name: "Endometrial Adenosquamous Carcinoma",
														count: 2,
													},
													{
														name: "Vulvar Squamous Cell Carcinoma",
														count: 2,
													},
													{
														name: "Prostate Adenocarcinoma",
														count: 2,
													},
													{
														name: "Uterine Corpus Carcinosarcoma",
														count: 2,
													},
													{
														name: "Vulvar Carcinoma",
														count: 1,
													},
													{
														name: "Malignant Ovarian Endometrioid Tumor",
														count: 1,
													},
													{
														name: "Ovarian Undifferentiated Carcinoma",
														count: 1,
													},
													{
														name: "Vulvar Melanoma",
														count: 1,
													},
													{
														name: "Cervical Carcinoma",
														count: 1,
													},
													{
														name: "Malignant Ovarian Granulosa Cell Tumor",
														count: 1,
													},
													{
														name: "Low Grade Ovarian Serous Adenocarcinoma",
														count: 1,
													},
													{
														name: "Cervical Carcinosarcoma",
														count: 1,
													},
													{
														name: "Ovarian Yolk Sac Tumor",
														count: 1,
													},
													{
														name: "Malignant Ovarian Brenner Tumor",
														count: 1,
													},
													{
														name: "Testicular Teratoma with Somatic-Type Malignancy",
														count: 1,
													},
													{
														name: "Childhood Malignant Testicular Germ Cell Tumor",
														count: 1,
													},
												],
											},
											{
												name: "Nervous System Cancer",
												children: [
													{
														name: "Brain Glioblastoma",
														count: 61,
													},
													{
														name: "Glioblastoma",
														count: 58,
													},
													{
														name: "Peripheral Neuroblastoma",
														count: 35,
													},
													{
														name: "Glioblastoma, Not Otherwise Specified",
														count: 32,
													},
													{
														name: "Neuroblastoma",
														count: 31,
													},
													{
														name: "Glioblastoma, IDH-Wildtype",
														count: 29,
													},
													{
														name: "Medulloblastoma",
														count: 28,
													},
													{
														name: "Brain Astrocytoma",
														count: 22,
													},
													{
														name: "Childhood Neuroblastoma",
														count: 17,
													},
													{
														name: "Central Nervous System Cancer",
														count: 13,
													},
													{
														name: "Atypical Teratoid/Rhabdoid Tumor",
														count: 11,
													},
													{
														name: "Primitive Neuroectodermal Tumor",
														count: 10,
													},
													{
														name: "Brain Stem Glioblastoma",
														count: 8,
													},
													{
														name: "Adrenal Gland Neuroblastoma",
														count: 7,
													},
													{
														name: "Ependymoma",
														count: 6,
													},
													{
														name: "Anaplastic Astrocytoma",
														count: 5,
													},
													{
														name: "Secondary Glioblastoma",
														count: 4,
													},
													{
														name: "Glioblastoma, IDH-Mutant",
														count: 3,
													},
													{
														name: "Anaplastic Oligodendroglioma, Not Otherwise Specified",
														count: 3,
													},
													{
														name: "Embryonal Tumor with Multilayered Rosettes, Not Otherwise Specified",
														count: 3,
													},
													{
														name: "Gliosarcoma",
														count: 3,
													},
													{
														name: "Anaplastic Oligodendroglioma",
														count: 2,
													},
													{
														name: "Askin Tumor",
														count: 2,
													},
													{
														name: "Malignant Brain Glioma",
														count: 2,
													},
													{
														name: "Diffuse Intrinsic Pontine Glioma",
														count: 2,
													},
													{
														name: "Pineoblastoma",
														count: 1,
													},
													{
														name: "Recurrent Malignant Glioma",
														count: 1,
													},
													{
														name: "Embryonal Tumor with Multilayered Rosettes, C19MC-Altered",
														count: 1,
													},
													{
														name: "Malignant Glioma",
														count: 1,
													},
													{
														name: "Central Nervous System Germinoma",
														count: 1,
													},
													{
														name: "Central Nervous System Embryonal Neoplasm",
														count: 1,
													},
													{
														name: "Brain Cancer",
														count: 1,
													},
													{
														name: "Childhood Ependymoma",
														count: 1,
													},
													{
														name: "Childhood Meningeal Melanoma",
														count: 1,
													},
													{
														name: "Mediastinal Neuroblastoma",
														count: 1,
													},
													{
														name: "WHO Grade III Glioma",
														count: 1,
													},
												],
											},
											{
												name: "Urinary System Cancer",
												children: [
													{
														name: "Kidney Cancer",
														count: 52,
													},
													{
														name: "Clear Cell Renal Cell Carcinoma",
														count: 52,
													},
													{
														name: "Urinary System Cancer",
														count: 36,
													},
													{
														name: "Bladder Carcinoma",
														count: 36,
													},
													{
														name: "Renal Cell Carcinoma",
														count: 32,
													},
													{
														name: "Bladder Cancer",
														count: 20,
													},
													{
														name: "Urothelial Carcinoma",
														count: 19,
													},
													{
														name: "Bladder Urothelial Carcinoma",
														count: 11,
													},
													{
														name: "Childhood Kidney Wilms Tumor",
														count: 5,
													},
													{
														name: "Papillary Renal Cell Carcinoma",
														count: 4,
													},
													{
														name: "Kidney Carcinoma",
														count: 3,
													},
													{
														name: "Bladder Papillary Urothelial Carcinoma",
														count: 3,
													},
													{
														name: "Rhabdoid Tumor of the Kidney",
														count: 2,
													},
													{
														name: "Ureter Urothelial Carcinoma",
														count: 1,
													},
													{
														name: "Renal Pelvis Carcinoma",
														count: 1,
													},
													{
														name: "Bladder Adenocarcinoma",
														count: 1,
													},
													{
														name: "Kidney Wilms Tumor",
														count: 1,
													},
													{
														name: "Bladder Squamous Cell Carcinoma",
														count: 1,
													},
												],
											},
											{
												name: "Head and Neck Cancer",
												children: [
													{
														name: "Lip and Oral Cavity Squamous Cell Carcinoma",
														count: 52,
													},
													{
														name: "Tongue Squamous Cell Carcinoma",
														count: 40,
													},
													{
														name: "Head and Neck Squamous Cell Carcinoma",
														count: 35,
													},
													{
														name: "Laryngeal Squamous Cell Carcinoma",
														count: 21,
													},
													{
														name: "Pharyngeal Squamous Cell Carcinoma",
														count: 20,
													},
													{
														name: "Oral Cavity Squamous Cell Carcinoma",
														count: 16,
													},
													{
														name: "Salivary Gland Cancer",
														count: 13,
													},
													{
														name: "Thyroid Gland Anaplastic Carcinoma",
														count: 8,
													},
													{
														name: "Buccal Mucosa Squamous Cell Carcinoma",
														count: 6,
													},
													{
														name: "Floor of Mouth Squamous Cell Carcinoma",
														count: 6,
													},
													{
														name: "Head and Neck Cancer",
														count: 6,
													},
													{
														name: "Glottic Squamous Cell Carcinoma",
														count: 4,
													},
													{
														name: "Thyroid Gland Cancer",
														count: 4,
													},
													{
														name: "Retromolar Trigone Squamous Cell Carcinoma",
														count: 4,
													},
													{
														name: "Hypopharyngeal Squamous Cell Carcinoma",
														count: 3,
													},
													{
														name: "Gingival Squamous Cell Carcinoma",
														count: 2,
													},
													{
														name: "Laryngeal Cancer",
														count: 2,
													},
													{
														name: "Thyroid Gland Squamous Cell Carcinoma",
														count: 2,
													},
													{
														name: "Hard Palate Squamous Cell Carcinoma",
														count: 2,
													},
													{
														name: "Nasopharyngeal Carcinoma",
														count: 2,
													},
													{
														name: "Tonsillar Squamous Cell Carcinoma",
														count: 2,
													},
													{
														name: "Tongue Cancer",
														count: 1,
													},
													{
														name: "Postcricoid Squamous Cell Carcinoma",
														count: 1,
													},
													{
														name: "Oral Cavity Cancer",
														count: 1,
													},
													{
														name: "Parotid Gland Mucoepidermoid Carcinoma",
														count: 1,
													},
													{
														name: "Salivary Gland Mucoepidermoid Carcinoma",
														count: 1,
													},
													{
														name: "Salivary Gland Squamous Cell Carcinoma",
														count: 1,
													},
													{
														name: "Pharyngeal Cancer",
														count: 1,
													},
													{
														name: "Supraglottic Squamous Cell Carcinoma",
														count: 1,
													},
													{
														name: "Tonsillar Cancer",
														count: 1,
													},
												],
											},
											{
												name: "Connective and Soft Tissue Cancer",
												children: [
													{
														name: "Soft Tissue Sarcoma",
														count: 47,
													},
													{
														name: "Bone Osteosarcoma",
														count: 45,
													},
													{
														name: "Osteosarcoma",
														count: 38,
													},
													{
														name: "Childhood Osteosarcoma",
														count: 37,
													},
													{
														name: "Fusion-Negative Rhabdomyosarcoma",
														count: 25,
													},
													{
														name: "Ewing Sarcoma",
														count: 19,
													},
													{
														name: "Fusion-Positive Rhabdomyosarcoma",
														count: 17,
													},
													{
														name: "Fibrosarcoma",
														count: 16,
													},
													{
														name: "Undifferentiated Pleomorphic Sarcoma",
														count: 15,
													},
													{
														name: "Uterine Corpus Leiomyosarcoma",
														count: 15,
													},
													{
														name: "Alveolar Rhabdomyosarcoma",
														count: 15,
													},
													{
														name: "Ewing Sarcoma of Bone",
														count: 13,
													},
													{
														name: "Synovial Sarcoma",
														count: 12,
													},
													{
														name: "Rhabdomyosarcoma",
														count: 11,
													},
													{
														name: "Sarcoma",
														count: 10,
													},
													{
														name: "Leiomyosarcoma",
														count: 10,
													},
													{
														name: "Liposarcoma",
														count: 8,
													},
													{
														name: "Childhood Soft Tissue Sarcoma",
														count: 6,
													},
													{
														name: "Chondrosarcoma",
														count: 6,
													},
													{
														name: "Childhood Desmoplastic Small Round Cell Tumor",
														count: 5,
													},
													{
														name: "Embryonal Rhabdomyosarcoma",
														count: 5,
													},
													{
														name: "Uterine Corpus Sarcoma",
														count: 4,
													},
													{
														name: "Gastrointestinal Stromal Tumor",
														count: 4,
													},
													{
														name: "Epithelioid Sarcoma",
														count: 4,
													},
													{
														name: "Sacral Chordoma",
														count: 3,
													},
													{
														name: "Bone Sarcoma",
														count: 3,
													},
													{
														name: "Malignancy in Giant Cell Tumor of Bone",
														count: 3,
													},
													{
														name: "Spindle Cell Sarcoma",
														count: 3,
													},
													{
														name: "Metastatic Bone Sarcoma",
														count: 3,
													},
													{
														name: "Malignant Gastric Gastrointestinal Stromal Tumor",
														count: 2,
													},
													{
														name: "Undifferentiated Round Cell Sarcoma",
														count: 2,
													},
													{
														name: "Advanced Gastrointestinal Stromal Tumor",
														count: 2,
													},
													{
														name: "Spindle Cell Rhabdomyosarcoma",
														count: 1,
													},
													{
														name: "Malignant Epithelioid Cell Type Gastrointestinal Stromal Tumor",
														count: 1,
													},
													{
														name: "Clear Cell Sarcoma of Soft Tissue",
														count: 1,
													},
													{
														name: "Clivus Chordoma",
														count: 1,
													},
													{
														name: "Childhood Epithelioid Sarcoma",
														count: 1,
													},
													{
														name: "Liver Embryonal Sarcoma",
														count: 1,
													},
													{
														name: "Childhood Rhabdomyosarcoma",
														count: 1,
													},
													{
														name: "Ovarian Leiomyosarcoma",
														count: 1,
													},
													{
														name: "Refractory Osteosarcoma",
														count: 1,
													},
													{
														name: "Sclerosing Rhabdomyosarcoma",
														count: 1,
													},
													{
														name: "Childhood Fibrosarcoma",
														count: 1,
													},
													{
														name: "Uterine Corpus Myxoid Leiomyosarcoma",
														count: 1,
													},
													{
														name: "Childhood Synovial Sarcoma",
														count: 1,
													},
													{
														name: "Kidney Ewing Sarcoma",
														count: 1,
													},
													{
														name: "Endometrioid Stromal Sarcoma",
														count: 1,
													},
													{
														name: "Childhood Gastrointestinal Stromal Tumor",
														count: 1,
													},
													{
														name: "Primary Central Chondrosarcoma",
														count: 1,
													},
													{
														name: "Vulvar Leiomyosarcoma",
														count: 1,
													},
													{
														name: "Small Cell Sarcoma",
														count: 1,
													},
													{
														name: "Thyroid Gland Sarcoma",
														count: 1,
													},
													{
														name: "Childhood Liposarcoma",
														count: 1,
													},
												],
											},
											{
												name: "Eye Cancer",
												children: [
													{
														name: "Childhood Intraocular Retinoblastoma",
														count: 38,
													},
													{
														name: "Uveal Melanoma",
														count: 5,
													},
													{
														name: "Retinoblastoma",
														count: 2,
													},
												],
											},
											{
												name: "Peritoneal and Retroperitoneal Cancer",
												children: [
													{
														name: "Primary Peritoneal Carcinoma",
														count: 1,
													},
												],
											},
										],
									}}
								/>
							</div>
						</div>
						<div className="col-12 col-md-6">
							<div className="text-center">
								<h3>Models by available data</h3>
							</div>
							<div style={{ height: "600px" }}>
								<DonutChart
									keyId="dataset_availability"
									data={[
										{
											dataset_availability: "copy number alteration",
											count: 2484,
										},
										{
											dataset_availability: "cytogenetics",
											count: 151,
										},
										{
											dataset_availability: "dosing studies",
											count: 570,
										},
										{
											dataset_availability: "expression",
											count: 2230,
										},
										{
											dataset_availability: "mutation",
											count: 3761,
										},
										{
											dataset_availability: "patient treatment",
											count: 675,
										},
										{
											dataset_availability: "publication",
											count: 1186,
										},
									]}
								/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12 col-md-6">
							<div className="text-center">
								<h3>Most mutated genes</h3>
							</div>
							<div style={{ height: "600px" }}>
								<BarChart
									chartTitle="Models by top mutated gene"
									onBarClick={(category) => {
										return;
									}}
									data={[
										{
											mutated_gene: "TP53",
											count: 2260,
										},
										{
											mutated_gene: "TTN",
											count: 1517,
										},
										{
											mutated_gene: "MUC16",
											count: 1346,
										},
										{
											mutated_gene: "KMT2C",
											count: 1321,
										},
										{
											mutated_gene: "MUC4",
											count: 1234,
										},
										{
											mutated_gene: "APC",
											count: 1111,
										},
										{
											mutated_gene: "MUC3A",
											count: 987,
										},
										{
											mutated_gene: "KRAS",
											count: 886,
										},
										{
											mutated_gene: "MUC17",
											count: 865,
										},
										{
											mutated_gene: "PABPC1",
											count: 856,
										},
										{
											mutated_gene: "GPRIN2",
											count: 816,
										},
										{
											mutated_gene: "FCGBP",
											count: 778,
										},
										{
											mutated_gene: "FLG",
											count: 778,
										},
										{
											mutated_gene: "USH2A",
											count: 777,
										},
										{
											mutated_gene: "MUC5B",
											count: 774,
										},
									]}
									indexKey="mutated_gene"
								/>
							</div>
						</div>
						<div className="col-12 col-md-6">
							<div className="text-center">
								<h3>Models by tumour type</h3>
							</div>
							<div style={{ height: "600px" }}>
								<DonutChart
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
						<div className="col-12 col-md-6">
							<div className="text-center">
								<h3>Models by age</h3>
							</div>
							<div style={{ height: "600px" }}>
								<DonutChart
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
						<div className="col-12 col-md-6">
							<div className="text-center">
								<h3>Most used drugs</h3>
							</div>
							<div style={{ height: "600px" }}>
								<BarChart
									chartTitle="Models by top mutated gene"
									onBarClick={(category) => {
										return;
									}}
									rotateTicks={true}
									data={[
										{
											treatment: "fluorouracil",
											count: 246,
										},
										{
											treatment: "oxaliplatin",
											count: 208,
										},
										{
											treatment: "leucovorin calcium",
											count: 184,
										},
										{
											treatment: "radiation therapy",
											count: 159,
										},
										{
											treatment: "cisplatin",
											count: 122,
										},
										{
											treatment: "cyclophosphamide",
											count: 113,
										},
										{
											treatment: "gemcitabine",
											count: 110,
										},
										{
											treatment: "irinotecan",
											count: 109,
										},
										{
											treatment: "doxorubicin",
											count: 99,
										},
										{
											treatment: "bevacizumab",
											count: 98,
										},
										{
											treatment: "paclitaxel",
											count: 97,
										},
										{
											treatment: "leucovorin",
											count: 96,
										},
										{
											treatment: "nab-paclitaxel",
											count: 93,
										},
										{
											treatment: "capecitabine",
											count: 81,
										},
										{
											treatment: "carboplatin",
											count: 74,
										},
									]}
									indexKey="treatment"
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
