import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQueries } from "react-query";
import { getAllModelData } from "../apis/ModelDetails.api";
import Button from "../components/Button/Button";
import FloatingButton from "../components/FloatingWidget/FloatingButton";
import ModelTypeIcon from "../components/Icons/ModelTypeIcon";
import Loader from "../components/Loader/Loader";
import ModelNotAvailable from "../components/ModelNotAvailable/ModelNotAvailable";
import QualityBadge from "../components/QualityBadge/QualityBadge";
import ShowHide from "../components/ShowHide/ShowHide";
import Tooltip from "../components/Tooltip/Tooltip";
import useWindowDimensions from "../hooks/useWindowDimensions";
import {
	Engraftment,
	MolecularData,
	QualityData
} from "../types/ModelData.model";
import breakPoints from "../utils/breakpoints";
import { compareTourSteps } from "../utils/tourSteps";
import styles from "./compare.module.scss";

const Compare: NextPage = () => {
	const CHECKMARK_STRING = "✔",
		PDX_STRING = "PDX";
	const { windowWidth = 0 } = useWindowDimensions();
	const bpLarge = breakPoints.large;
	const router = useRouter();
	const [modelsToCompare, setModelsToCompare] = useState<string[]>([]);

	const driverObj = driver({
		showProgress: true,
		prevBtnText: "← Prev",
		steps: compareTourSteps,
		onHighlightStarted: (el, step) => {
			if (!el && !driverObj.isLastStep()) {
				if (step.popover) {
					step.popover.description =
						"<b>(Not available for current models)</b> <br/>" +
						step.popover?.description;
				}
			}
		},
		onDestroyed: () => {
			window.scrollTo(0, 0);
		}
	});

	const allModelsData = useQueries(
		modelsToCompare.map((model: string) => {
			return {
				queryKey: ["model-data", model],
				queryFn: () => getAllModelData(model)
			};
		})
	);
	let allModelDataIsLoaded = allModelsData.every(
		(data) => data.data !== undefined
	);

	// Set models from URL, limit models to at least 2
	useEffect(() => {
		const urlModelIds = router.asPath?.split("=")[1].split("+");
		if (urlModelIds.length < 2) {
			alert("You need at least 2 models to compare");
			router.replace({
				pathname: "/search"
			});
		}
		setModelsToCompare(urlModelIds);
	}, []);

	// Update URL when a model is removed
	useEffect(() => {
		router.push(
			{
				pathname: "/compare",
				query: {
					models: modelsToCompare.join(" ")
				}
			},
			undefined,
			{ shallow: true }
		);
	}, [modelsToCompare]);

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
				<>
					<section>
						<div className="container">
							<div
								className="row bg-white position-sticky top-0 pt-2 pb-3"
								id="tour_modelsToCompare"
							>
								{/* fake offset to reduce nesting a bit */}
								<div className="col-3"></div>
								{allModelsData.map(({ data }) => {
									const metadata = data?.metadata;

									return metadata ? (
										<div className="col" key={metadata.modelId}>
											{/* quality badge always at baseline */}
											<div className="d-flex flex-column h-100 justify-content-between">
												<div className="mb-1">
													<sub>
														<Button
															color="dark"
															priority="secondary"
															className="text-underline m-0 mb-1"
															style={{ padding: ".2rem .3rem" }}
															onClick={() => {
																if (modelsToCompare.length > 2) {
																	setModelsToCompare((prevModels) =>
																		prevModels.filter(
																			(prevModel) =>
																				prevModel !== metadata.modelId
																		)
																	);
																} else {
																	alert(
																		"Can't remove model, you need at least 2 models to compare"
																	);
																}
															}}
														>
															X
														</Button>
													</sub>
													<h1 className="h3 m-0">
														<Link
															href={`/data/models/${metadata.providerId}/${data?.metadata.modelId}`}
															className="text-primary-primary"
														>
															{metadata.modelId}
														</Link>
													</h1>
													<h2 className="p mt-0 mb-1">{metadata.histology}</h2>
													<ModelTypeIcon
														modelType={metadata.modelType}
														size="1.5em"
													/>
													{!metadata.modelAvailable && <ModelNotAvailable />}
												</div>
												<QualityBadge
													className="w-50"
													score={metadata.score}
													style={{ width: "10em" }}
													containerClassName="text-muted"
												/>
											</div>
										</div>
									) : null;
								})}
							</div>
							<div
								className={`row ${styles.Compare_table}`}
								id="tour_compare-metadata"
							>
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
											return data ? (
												<div
													className="col"
													key={
														data.metadata.modelId + data?.metadata.patientSex
													}
												>
													<p className="text-capitalize">
														{data.metadata.patientSex}
													</p>
												</div>
											) : null;
										})}
									</div>
									<div className={`row ${styles.Compare_row}`}>
										<div className="col-3">
											<p className="text-uppercase">
												<b>Patient age</b>
											</p>
										</div>
										{allModelsData.map(({ data }) => {
											const metadata = data?.metadata;

											return metadata ? (
												<div
													className="col"
													key={metadata.modelId + metadata.patientAge}
												>
													<p>{metadata.patientAge}</p>
												</div>
											) : null;
										})}
									</div>
									<div className={`row ${styles.Compare_row}`}>
										<div className="col-3">
											<p className="text-uppercase">
												<b>Patient ethnicity</b>
											</p>
										</div>
										{allModelsData.map(({ data }) => {
											const metadata = data?.metadata;

											return metadata ? (
												<div
													className="col"
													key={metadata.modelId + metadata.patientEthnicity}
												>
													<p>{metadata.patientEthnicity}</p>
												</div>
											) : null;
										})}
									</div>
									<div className={`row ${styles.Compare_row}`}>
										<div className="col-3">
											<p className="text-uppercase">
												<b>Tumour type</b>
											</p>
										</div>
										{allModelsData.map(({ data }) => {
											const metadata = data?.metadata;

											return metadata ? (
												<div
													className="col"
													key={metadata.modelId + metadata.tumourType}
												>
													<p>{metadata.tumourType}</p>
												</div>
											) : null;
										})}
									</div>
									<div className={`row ${styles.Compare_row}`}>
										<div className="col-3">
											<p className="text-uppercase">
												<b>Cancer grade</b>
											</p>
										</div>
										{allModelsData.map(({ data }) => {
											const metadata = data?.metadata;

											return metadata ? (
												<div
													className="col"
													key={metadata.modelId + metadata.cancerGrade}
												>
													<p>{metadata.cancerGrade}</p>
												</div>
											) : null;
										})}
									</div>
									<div className={`row ${styles.Compare_row}`}>
										<div className="col-3">
											<p className="text-uppercase">
												<b>Cancer stage</b>
											</p>
										</div>
										{allModelsData.map(({ data }) => {
											const metadata = data?.metadata;

											return metadata ? (
												<div
													className="col"
													key={metadata.modelId + metadata.cancerStage}
												>
													<p>{metadata.cancerStage}</p>
												</div>
											) : null;
										})}
									</div>
									<div className={`row ${styles.Compare_row}`}>
										<div className="col-3">
											<p className="text-uppercase">
												<b>Primary site</b>
											</p>
										</div>
										{allModelsData.map(({ data }) => {
											const metadata = data?.metadata;

											return metadata ? (
												<div
													className="col"
													key={metadata.modelId + metadata.primarySite}
												>
													<p className="text-capitalize">
														{metadata.primarySite}
													</p>
												</div>
											) : null;
										})}
									</div>
									<div className={`row ${styles.Compare_row}`}>
										<div className="col-3">
											<p className="text-uppercase">
												<b>Collection site</b>
											</p>
										</div>
										{allModelsData.map(({ data }) => {
											const metadata = data?.metadata;

											return metadata ? (
												<div
													className="col"
													key={metadata.modelId + metadata.collectionSite}
												>
													<p className="text-capitalize">
														{metadata.collectionSite}
													</p>
												</div>
											) : null;
										})}
									</div>
								</div>
							</div>
							{allModelsData.some(
								({ data }) =>
									(data?.engraftments ?? []).length > 0 &&
									data?.metadata?.modelType === PDX_STRING
							) ? (
								<div
									className={`row ${styles.Compare_table}`}
									id="tour_compare-engraftment"
								>
									<div className={`col-12 ${styles.Compare_table_title}`}>
										<h3>PDX Model Engraftment</h3>
									</div>
									<div className="col-12">
										<div className={`row ${styles.Compare_row}`}>
											{/* fake offset to reduce nesting a bit */}
											<div className="col-3"></div>
											{allModelsData.map(({ data }) => {
												return (
													<div
														className="col"
														key={data?.metadata.modelId + "derivation"}
													>
														{data?.engraftments.map(
															(engraftment: Engraftment) => {
																const hostStrainNomenclatures =
																	engraftment.hostStrainNomenclature
																		.split(" ")
																		.map((h) => {
																			const regExp =
																				/(.*)<sup>(.*)<\/sup>(.*)/gm;
																			const matches = regExp.exec(h) || [];
																			const strainPrefix = matches[1] || "";
																			const strainSup = matches[2] || "";
																			const strainSuffix = matches[3] || "";

																			return {
																				strainPrefix,
																				strainSup,
																				strainSuffix
																			};
																		});

																return (
																	<div
																		className="mb-2"
																		key={
																			data?.metadata.modelId +
																			engraftment.engraftmentSite
																		}
																	>
																		<div className="mb-2">
																			<p className="text-uppercase">
																				<b>Host strain name</b>
																			</p>
																			<Tooltip
																				content={hostStrainNomenclatures.map(
																					({
																						strainPrefix,
																						strainSup,
																						strainSuffix
																					}: {
																						strainPrefix: string;
																						strainSup: string;
																						strainSuffix: string;
																					}) => (
																						<span
																							className="text-small"
																							key={
																								strainPrefix +
																								strainSup +
																								strainSuffix
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
																		<div>
																			<p className="text-uppercase">
																				<b>Site</b>
																			</p>
																			<p>{engraftment.engraftmentSite}</p>
																		</div>
																	</div>
																);
															}
														)}
													</div>
												);
											})}
										</div>
									</div>
								</div>
							) : null}
							{allModelsData.some(
								({ data }) =>
									data?.metadata?.modelType !== PDX_STRING &&
									data?.cellModelData?.id
							) ? (
								<div
									className={`row ${styles.Compare_table}`}
									id="tour_compare-derivation"
								>
									<div className={`col-12 ${styles.Compare_table_title}`}>
										<h3>Model Derivation</h3>
									</div>
									<div className="col-12">
										<div className={`row ${styles.Compare_row}`}>
											{/* fake offset to reduce nesting a bit */}
											<div className="col-3"></div>
											{allModelsData.map(({ data }) => {
												const dataToShowObj = {
													"Growth Properties":
														data?.cellModelData.growthProperties,
													"Grown Media": data?.cellModelData.growthMedia,
													"Plate Coating": data?.cellModelData.plateCoating,
													Supplements: data?.cellModelData.supplements,
													Contaminated: data?.cellModelData.contaminated,
													"Contamination Details":
														data?.cellModelData.contaminationDetails
												};

												const columnValues: JSX.Element[] = [];

												Object.entries(dataToShowObj).forEach(
													([key, value]) => {
														columnValues.push(
															<div className="mb-2">
																<p className="text-uppercase">
																	<b>{key}</b>
																</p>
																<p>{value ?? "Not provided"}</p>
															</div>
														);
													}
												);

												return (
													<div
														className="col"
														key={data?.metadata.modelId + "derivation"}
													>
														{data?.cellModelData.id && (
															<div
																className="mb-2"
																key={data?.metadata.modelId}
															>
																{columnValues}
															</div>
														)}
													</div>
												);
											})}
										</div>
									</div>
								</div>
							) : null}
							{allModelsData.some(
								({ data }) => (data?.qualityData ?? []).length > 0
							) ? (
								<div
									className={`row ${styles.Compare_table}`}
									id="tour_compare-qualityControl"
								>
									<div className={`col-12 ${styles.Compare_table_title}`}>
										<h3>Model quality control</h3>
									</div>
									<div className="col-12">
										<div className={`row ${styles.Compare_row}`}>
											{/* fake offset to reduce some nesting */}
											<div className="col-3"></div>
											{allModelsData.map(({ data }) => {
												return (
													<div
														className="col"
														key={
															(data?.metadata.modelId ?? "") +
															(data?.qualityData[0]?.validationTechnique ||
																"") +
															(data?.qualityData[0]?.passagesTested || "")
														}
													>
														{data?.qualityData.map(
															(qData: QualityData, idx: number) => {
																const dataToShowObj = {
																	Technique: qData.validationTechnique,
																	Passage: qData.passagesTested,
																	"Morphological features":
																		qData.morphologicalFeatures,
																	"Model purity": qData.modelPurity
																};

																const columnValues: JSX.Element[] = [];

																Object.entries(dataToShowObj).forEach(
																	([key, value]) => {
																		columnValues.push(
																			<div className="mb-2" key={key + value}>
																				<p className="text-uppercase">
																					<b>{key}</b>
																				</p>
																				<p>{value ?? "Not provided"}</p>
																			</div>
																		);
																	}
																);

																const isLast =
																	idx === data?.qualityData.length - 1;

																return (
																	<div
																		className="mb-2"
																		key={
																			data?.metadata.modelId +
																			qData.validationTechnique +
																			qData.passagesTested
																		}
																	>
																		{columnValues}
																		{!isLast && (
																			<hr
																				className={`ml-0 bg-primary-tertiary ${styles["Compare_row-divider"]}`}
																			/>
																		)}
																	</div>
																);
															}
														)}
													</div>
												);
											})}
										</div>
									</div>
								</div>
							) : null}
							<div
								className={`row ${styles.Compare_table}`}
								id="tour_compare-availableData"
							>
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
											<div
												className="col"
												key={data?.metadata.modelId + "mutationData"}
											>
												<p>
													{data?.molecularData.some(
														(mData: MolecularData) =>
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
											<div
												className="col"
												key={data?.metadata.modelId + "expressionData"}
											>
												<p>
													{data?.molecularData.some(
														(mData: MolecularData) =>
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
											<div
												className="col"
												key={data?.metadata.modelId + "cnaData"}
											>
												<p>
													{data?.molecularData.some(
														(mData: MolecularData) =>
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
												<b>Biomarker</b>
											</p>
										</div>
										{allModelsData.map(({ data }) => (
											<div
												className="col"
												key={data?.metadata.modelId + "biomarkerData"}
											>
												<p>
													{data?.molecularData.some(
														(mData: MolecularData) =>
															mData.dataType === "bio markers"
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
											<div
												className="col"
												key={data?.metadata.modelId + "treatmentData"}
											>
												<p>
													{(data?.patientTreatment ?? []).length > 0
														? CHECKMARK_STRING
														: ""}
												</p>
											</div>
										))}
									</div>
									<div className={`row ${styles.Compare_row}`}>
										<div className="col-3">
											<p className="text-uppercase">
												<b>Immune markers</b>
											</p>
										</div>
										{allModelsData.map(({ data }) => (
											<div
												className="col"
												key={data?.metadata.modelId + "immuneMarkers"}
											>
												<p>
													{data?.immuneMarkers && data?.immuneMarkers.length > 0
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
											<div
												className="col"
												key={data?.metadata.modelId + "dosingData"}
											>
												<p>
													{(data?.drugDosing ?? []).length > 0
														? CHECKMARK_STRING
														: ""}
												</p>
											</div>
										))}
									</div>
								</div>
							</div>
							<div className="row" id="tour_compare-buttons">
								<div className="col-3"></div>
								{allModelsData.map(({ data }) => {
									const metadata = data?.metadata;
									return metadata ? (
										<div
											className="col"
											key={metadata.modelId + "viewModelButton"}
										>
											<Button
												color="dark"
												priority="primary"
												htmlTag="a"
												href={`/data/models/${metadata.providerId}/${metadata.modelId}`}
											>
												View model
											</Button>
										</div>
									) : null;
								})}
							</div>
						</div>
					</section>
					<ShowHide showOver={bpLarge} windowWidth={windowWidth || 0}>
						<FloatingButton
							onClick={driverObj.drive}
							priority="secondary"
							color="dark"
						>
							<p className="mb-0 lh-1">Take page tour</p>
						</FloatingButton>
					</ShowHide>
				</>
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
