import type { NextPage } from "next";
import { useRouter } from "next/router";
import { getAllModelData } from "../apis/ModelDetails.api";
import { useQueries } from "react-query";
import Head from "next/head";
import Loader from "../components/Loader/Loader";
import QualityBadge from "../components/QualityBadge/QualityBadge";
import {
	IEngraftment,
	IMolecularData,
	QualityData,
} from "./data/models/[providerId]/[modelId]";
import styles from "./oldCompare.module.scss";
import Tooltip from "../components/Tooltip/Tooltip";
import Button from "../components/Button/Button";

// const dataStructure = {
// 	"Patient / tumour metadata": {
// 		// row value label
// 		"Patient sex": "metadata.patientSex",

// 		"Patient age": "metadata.patientAge",

// 		"Patient ethnicity": "metadata.patientEthnicity",

// 		"Tumour type": "metadata.tumourType",

// 		"Cancer grade": "metadata.cancerGrade",

// 		"Cancer stage": "metadata.cancerStage",

// 		"Primary site": "metadata.primarySite",

// 		"Collection site": "metadata.collectionSite",
// 	},
// 	// "PDX model engraftment": {
// 	// 	tableRows: {
// 	// 		// row value label
// 	// 		hostStrain: {
// 	// 			rowLabel: "Host strain",
// 	// 		},
// 	// 		site: {
// 	// 			rowLabel: "Site",
// 	// 		},
// 	// 		type: {
// 	// 			rowLabel: "Type",
// 	// 		},
// 	// 		passage: {
// 	// 			rowLabel: "passage",
// 	// 		},
// 	// 	},
// 	// },
// 	// "Model quality control": {
// 	// 	tableRows: {
// 	// 		// row value label
// 	// 		technique: {
// 	// 			rowLabel: "Technique",
// 	// 		},
// 	// 		passage: {
// 	// 			rowLabel: "Passage",
// 	// 		},
// 	// 	},
// 	// },
// 	// "Available data": {
// 	// 	usesChecks: true,
// 	// 	tableRows: {
// 	// 		// row value label
// 	// 		mutation: {
// 	// 			rowLabel: "Mutation",
// 	// 		},
// 	// 		expression: {
// 	// 			rowLabel: "Expression",
// 	// 		},
// 	// 		CNA: {
// 	// 			rowLabel: "CNA",
// 	// 		},
// 	// 		cytogenetics: {
// 	// 			rowLabel: "Cytogenetics",
// 	// 		},
// 	// 		patientTreatment: {
// 	// 			rowLabel: "Patient treatment",
// 	// 		},
// 	// 		drugDosing: {
// 	// 			rowLabel: "Drug dosing",
// 	// 		},
// 	// 	},
// 	// },
// };

const Compare: NextPage = () => {
	const CHECKMARK_STRING = "✔";
	const { query } = useRouter();
	const modelsToCompare: string[] =
		typeof query.models === "string" ? query.models.split(" ") : [];

	const allModelsData = useQueries(
		modelsToCompare.map((model: string) => {
			return {
				queryKey: ["model-data", model],
				queryFn: () => getAllModelData(model),
			};
		})
	);
	let allModelDataIsLoaded = allModelsData.every(
		(data) => data.data !== undefined
	);

	// const dataTables = () => {
	// 	let tables = [];
	// 	for (let [tableKey, tableValue] of Object.entries(dataStructure)) {
	// 		tables.push(
	// 			<div className="row">
	// 				<div className="col-12">
	// 					<h3>{tableKey}</h3>
	// 				</div>
	// 				<div className="col-12">
	// 					{Object.entries(tableValue).map((rowValue) => {
	// 						return (
	// 							<div className="row">
	// 								<div className="col-3">
	// 									<p className="text-uppercase">
	// 										<b>{rowValue[0]}</b>
	// 									</p>
	// 								</div>
	// 								{allModelsData.map((modelData) => {
	// 									if (modelData.data) {
	// 										let value = modelData.data[rowValue[1]];
	// 										if (rowValue[1].includes(".")) {
	// 											let keys = rowValue[1].split(".");
	// 											value = keys.reduce((a, c) => a[c], modelData.data);
	// 										}

	// 										return (
	// 											<div className="col">
	// 												<p>{value}</p>
	// 											</div>
	// 										);
	// 									}
	// 								})}
	// 							</div>
	// 						);
	// 					})}
	// 				</div>
	// 			</div>
	// 		);
	// 	}

	// 	return tables;
	// };

	return (
		<>
			<Head>
				<title>{`CancerModels.Org - Comparing ${modelsToCompare.join(
					", "
				)}`}</title>
			</Head>
			<header className="bg-primary-primary text-white mb-5 py-5">
				<div className="container">
					<div className="row py-5">
						<div className="col-12">
							<h1 className="m-0">Compare models</h1>
						</div>
					</div>
				</div>
			</header>
			{allModelDataIsLoaded ? (
				<section>
					<div className="container">
						<div className="row bg-white position-sticky top-0 py-2">
							{/* fake offset to reduce nesting a bit */}
							<div className="col-3"></div>
							{allModelsData.map((model) => (
								<div className="col">
									<h1 className="h2 m-0">{model.data?.metadata.modelId}</h1>
									<h2 className="p mt-0">{model.data?.metadata.histology}</h2>
									<QualityBadge
										className="w-50"
										score={model.data?.metadata.score}
									/>
								</div>
							))}
						</div>
						<div className={`row ${styles.Compare_table}`}>
							<div className={`col-12 ${styles.Compare_table_title}`}>
								<h3>Patient / tumour metadata</h3>
							</div>
							<div className="col-12">
								<div className={`row ${styles.Compare_row}`}>
									<div className="col-3">
										<p className="text-uppercase">
											<b>Patient sex</b>
										</p>
									</div>
									{allModelsData.map(({ data }) => {
										return (
											<div className="col">
												<p className="text-capitalize">
													{data?.metadata.patientSex}
												</p>
											</div>
										);
									})}
								</div>
								<div className={`row ${styles.Compare_row}`}>
									<div className="col-3">
										<p className="text-uppercase">
											<b>Patient age</b>
										</p>
									</div>
									{allModelsData.map(({ data }) => {
										return (
											<div className="col">
												<p>{data?.metadata.patientAge}</p>
											</div>
										);
									})}
								</div>
								<div className={`row ${styles.Compare_row}`}>
									<div className="col-3">
										<p className="text-uppercase">
											<b>Patient ethnicity</b>
										</p>
									</div>
									{allModelsData.map(({ data }) => {
										return (
											<div className="col">
												<p>{data?.metadata.patientEthnicity}</p>
											</div>
										);
									})}
								</div>
								<div className={`row ${styles.Compare_row}`}>
									<div className="col-3">
										<p className="text-uppercase">
											<b>Tumour type</b>
										</p>
									</div>
									{allModelsData.map(({ data }) => {
										return (
											<div className="col">
												<p>{data?.metadata.tumourType}</p>
											</div>
										);
									})}
								</div>
								<div className={`row ${styles.Compare_row}`}>
									<div className="col-3">
										<p className="text-uppercase">
											<b>Cancer grade</b>
										</p>
									</div>
									{allModelsData.map(({ data }) => {
										return (
											<div className="col">
												<p>{data?.metadata.cancerGrade}</p>
											</div>
										);
									})}
								</div>
								<div className={`row ${styles.Compare_row}`}>
									<div className="col-3">
										<p className="text-uppercase">
											<b>Cancer stage</b>
										</p>
									</div>
									{allModelsData.map(({ data }) => {
										return (
											<div className="col">
												<p>{data?.metadata.cancerStage}</p>
											</div>
										);
									})}
								</div>
								<div className={`row ${styles.Compare_row}`}>
									<div className="col-3">
										<p className="text-uppercase">
											<b>Primary site</b>
										</p>
									</div>
									{allModelsData.map(({ data }) => {
										return (
											<div className="col">
												<p className="text-capitalize">
													{data?.metadata.primarySite}
												</p>
											</div>
										);
									})}
								</div>
								<div className={`row ${styles.Compare_row}`}>
									<div className="col-3">
										<p className="text-uppercase">
											<b>Collection site</b>
										</p>
									</div>
									{allModelsData.map(({ data }) => {
										return (
											<div className="col">
												<p className="text-capitalize">
													{data?.metadata.collectionSite}
												</p>
											</div>
										);
									})}
								</div>
							</div>
						</div>
						<div className={`row ${styles.Compare_table}`}>
							<div className={`col-12 ${styles.Compare_table_title}`}>
								<h3>PDX Model Engraftment</h3>
							</div>
							<div className="col-12">
								<div className={`row ${styles.Compare_row}`}>
									<div className="col-3">
										<p className="text-uppercase">
											<b>Host strain name</b>
										</p>
									</div>
									{allModelsData.map(({ data }) => {
										return data?.engraftments.map(
											(engraftment: IEngraftment) => {
												const hostStrainNomenclatures =
													engraftment.hostStrainNomenclature
														.split(" ")
														.map((h) => {
															const regExp = /(.*)<sup>(.*)<\/sup>(.*)/gm;
															const matches = regExp.exec(h) || [];
															const strainPrefix = matches[1] || "";
															const strainSup = matches[2] || "";
															const strainSuffix = matches[3] || "";

															return {
																strainPrefix,
																strainSup,
																strainSuffix,
															};
														});
												return (
													<div className="col">
														<Tooltip
															content={hostStrainNomenclatures.map(
																({
																	strainPrefix,
																	strainSup,
																	strainSuffix,
																}: {
																	strainPrefix: string;
																	strainSup: string;
																	strainSuffix: string;
																}) => (
																	<span
																		className="text-small"
																		key={
																			strainPrefix + strainSup + strainSuffix
																		}
																	>
																		{strainPrefix}
																		<sup>{strainSup}</sup>
																		{strainSuffix}{" "}
																	</span>
																)
															)}
														>
															<p className="d-inline text-uppercase">
																{engraftment.hostStrain}
															</p>
														</Tooltip>
													</div>
												);
											}
										);
									})}
								</div>
								<div className={`row ${styles.Compare_row}`}>
									<div className="col-3">
										<p className="text-uppercase">
											<b>Site</b>
										</p>
									</div>
									{allModelsData.map(({ data }) => {
										return data?.engraftments.map(
											(engraftment: IEngraftment) => {
												return (
													<div className="col">
														<p>{engraftment.engraftmentSite}</p>
													</div>
												);
											}
										);
									})}
								</div>
							</div>
						</div>
						<div className={`row ${styles.Compare_table}`}>
							<div className={`col-12 ${styles.Compare_table_title}`}>
								<h3>Model quality control</h3>
							</div>
							<div className="col-12">
								<div className={`row ${styles.Compare_row}`}>
									<div className="col-3">
										<p className="text-uppercase">
											<b>Technique</b>
										</p>
									</div>
									{allModelsData.map(({ data }) => {
										return data?.qualityData.map((qData: QualityData) => {
											return (
												<div className="col">
													<p>{qData.validationTechnique}</p>
												</div>
											);
										});
									})}
								</div>
								<div className={`row ${styles.Compare_row}`}>
									<div className="col-3">
										<p className="text-uppercase">
											<b>Passage</b>
										</p>
									</div>
									{allModelsData.map(({ data }) => {
										return data?.qualityData.map((qData: QualityData) => {
											return (
												<div className="col">
													<p>{qData.passagesTested}</p>
												</div>
											);
										});
									})}
								</div>
							</div>
						</div>
						<div className={`row ${styles.Compare_table}`}>
							<div className={`col-12 ${styles.Compare_table_title}`}>
								<h3>Available data</h3>
							</div>
							<div className="col-12">
								<div className={`row ${styles.Compare_row}`}>
									<div className="col-3">
										<p className="text-uppercase">
											<b>Mutation</b>
										</p>
									</div>
									{allModelsData.map(({ data }) => (
										<div className="col">
											<p>
												{data?.molecularData.some(
													(mData: IMolecularData) =>
														mData.dataType === "mutation"
												)
													? CHECKMARK_STRING
													: ""}
											</p>
										</div>
									))}
								</div>
								<div className={`row ${styles.Compare_row}`}>
									<div className="col-3">
										<p className="text-uppercase">
											<b>Expression</b>
										</p>
									</div>
									{allModelsData.map(({ data }) => (
										<div className="col">
											<p>
												{data?.molecularData.some(
													(mData: IMolecularData) =>
														mData.dataType === "expression"
												)
													? CHECKMARK_STRING
													: ""}
											</p>
										</div>
									))}
								</div>
								<div className={`row ${styles.Compare_row}`}>
									<div className="col-3">
										<p className="text-uppercase">
											<b>CNA</b>
										</p>
									</div>
									{allModelsData.map(({ data }) => (
										<div className="col">
											<p>
												{data?.molecularData.some(
													(mData: IMolecularData) =>
														mData.dataType === "copy number alteration"
												)
													? CHECKMARK_STRING
													: ""}
											</p>
										</div>
									))}
								</div>
								<div className={`row ${styles.Compare_row}`}>
									<div className="col-3">
										<p className="text-uppercase">
											<b>Cytogenetics</b>
										</p>
									</div>
									{allModelsData.map(({ data }) => (
										<div className="col">
											<p>
												{data?.molecularData.some(
													(mData: IMolecularData) =>
														mData.dataType === "cytogenetics"
												)
													? CHECKMARK_STRING
													: ""}
											</p>
										</div>
									))}
								</div>
								<div className={`row ${styles.Compare_row}`}>
									<div className="col-3">
										<p className="text-uppercase">
											<b>Patient treatment</b>
										</p>
									</div>
									{allModelsData.map(({ data }) => (
										<div className="col">
											<p>
												{data?.patientTreatment.length > 0
													? CHECKMARK_STRING
													: ""}
											</p>
										</div>
									))}
								</div>
								<div className={`row ${styles.Compare_row}`}>
									<div className="col-3">
										<p className="text-uppercase">
											<b>Drug dosing</b>
										</p>
									</div>
									{allModelsData.map(({ data }) => (
										<div className="col">
											<p>
												{data?.drugDosing.length > 0 ? CHECKMARK_STRING : ""}
											</p>
										</div>
									))}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-3"></div>
							{allModelsData.map(({ data }) => (
								<div className="col">
									<Button
										color="dark"
										priority="primary"
										htmlTag="a"
										href={`/data/models/${data?.metadata.providerId}/${data?.metadata.modelId}`}
									>
										View model
									</Button>
								</div>
							))}
						</div>
					</div>
				</section>
			) : (
				<>
					<h1 className="text-center">Comparing...</h1>
					<Loader style={{ marginBottom: "50px" }} />
				</>
			)}
		</>
	);
};

export default Compare;
