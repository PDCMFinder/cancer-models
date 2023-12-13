import React, { useEffect, useState, useRef } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Button from "../../../../components/Button/Button";
import Link from "next/link";
import ShowHide from "../../../../components/ShowHide/ShowHide";
import breakPoints from "../../../../utils/breakpoints";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";
import styles from "./Model.module.scss";
import Card from "../../../../components/Card/Card";
import MolecularDataTable from "../../../../components/MolecularDataTable/MolecularDataTable";
import {
	getModelPubmedIds,
	getMolecularDataDownload,
	getPublicationData,
} from "../../../../apis/ModelDetails.api";
import CloseIcon from "../../../../components/CloseIcon/CloseIcon";
import Tooltip from "../../../../components/Tooltip/Tooltip";
import QualityBadge from "../../../../components/QualityBadge/QualityBadge";
import { useQueries, useQuery } from "react-query";
import Head from "next/head";
import { getAllModelData } from "../../../../apis/ModelDetails.api";
import { hj_event } from "../../../../utils/hotjar";
import dynamic from "next/dynamic";
import Loader from "../../../../components/Loader/Loader";
import InputAndLabel from "../../../../components/Input/InputAndLabel";
import JSZip from "jszip";
import FileSaver from "file-saver";

const DynamicModal = dynamic(
	() => import("../../../../components/Modal/Modal"),
	{
		loading: () => <Loader />,
	}
);

interface IModelDetailsProps {
	metadata: Metadata;
	extLinks: ExtLinks;
	molecularData: IMolecularData[];
	drugDosing: any[];
	patientTreatment: PatientTreatment[];
	qualityData: QualityData[];
	className: string;
	modelId: string;
	providerId: string;
	engraftments?: IEngraftment[];
	modelImages: IModelImage[];
}

export interface IModelImage {
	url: string;
	description: string;
	sampleType: string;
	passage: string;
	magnification: string;
	staining: string;
}

export interface IMolecularData {
	modelId: string;
	dataSource: string;
	source: string;
	sampleId: string;
	xenograftPassage: string;
	rawDataUrl: any;
	dataType: string;
	platformName: string;
	dataExists: string;
	dataRestricted: string;
	molecularCharacterizationId: number;
	externalDbLinks: ExternalDbLinks[];
	[key: string]: any;
}

interface PatientTreatment {
	treatmentDose: string;
	treatmentName: string;
	treatmentResponse: string;
}

interface ExternalDbLinks {
	column: string;
	link: string;
	resource: string;
}

export interface QualityData {
	id: number;
	description: string;
	passagesTested: string;
	validationTechnique: string;
	validationHostStrainNomenclature: string;
	modelId: number;
}

interface Metadata {
	histology: string;
	providerName: string;
	cancerSystem: string;
	modelType: string;
	patientSex: string;
	patientAge: string;
	patientEthnicity: string;
	modelId: string;
	providerId: string;
	tumourType: string;
	cancerGrade: string;
	cancerStage: string;
	primarySite: string;
	collectionSite: string;
	licenseName: string;
	licenseUrl: string;
	score: number;
	pdcmModelId: number;
}

export interface ExtLinks {
	contactLink?: string;
	sourceDatabaseUrl?: string;
}

export interface IPublication {
	pmid: string;
	doi: string;
	pubYear: string;
	title: string;
	authorString: string;
	journalTitle: string;
}

export interface IEngraftment {
	passageNumber: string;
	hostStrain: string;
	engraftmentSite: string;
	engraftmentType: string;
	engraftmentSampleType: string;
	engraftmentSampleState: string;
	hostStrainNomenclature: string;
}

export interface TypesMap {
	expression_molecular_data: string;
	cna_molecular_data: string;
	mutation_measurement_data: string;
	biomarker_molecular_data: string;
}

interface IDataFileConfig {
	data: IMolecularData[];
	filename: string;
}

const ModelDetails = ({
	metadata,
	extLinks,
	molecularData,
	drugDosing,
	patientTreatment,
	qualityData,
	engraftments,
	modelImages,
}: IModelDetailsProps) => {
	const NA_STRING = "N/A";
	const [dataToDownload, setDataToDownload] = useState<IDataFileConfig[]>([]);
	const [selectedMolecularViewData, setSelectedMolecularViewData] =
		useState<IMolecularData>();

	const { windowWidth } = useWindowDimensions();
	const bpLarge = breakPoints.large;
	const metadataDataArr = [
		{ label: "Patient Sex", value: metadata.patientSex },
		{ label: "Patient Age", value: metadata.patientAge },
		{ label: "Patient Ethnicity", value: metadata.patientEthnicity },
		{ label: "Tumour Type", value: metadata.tumourType },
		{ label: "Cancer Grade", value: metadata.cancerGrade },
		{ label: "Cancer Stage", value: metadata.cancerStage },
		{ label: "Primary Site", value: metadata.primarySite },
		{ label: "Collection Site", value: metadata.collectionSite },
	];
	// New metadata object without the "score" property to use in metadata file download; take out modelId to rearrange
	const { score: _, modelId: metadataModelId, ...metadataFileData } = metadata;

	const pubmedIdsQuery = useQuery(
		[
			"pubmed-ids-data",
			{ modelId: metadata.modelId, providerId: metadata.providerId },
		],
		() => getModelPubmedIds(metadata.modelId, metadata.providerId)
	);

	const pubmedIds = pubmedIdsQuery.data || [];

	const publicationsQuery = useQueries<IPublication[]>(
		pubmedIds.map((p: string) => {
			return {
				queryKey: ["publication-data", p],
				queryFn: () => getPublicationData(p),
			};
		})
	);

	const publications: IPublication[] = publicationsQuery
		.map((q) => q.data as IPublication)
		.filter((d) => d !== undefined);

	const createMetadataFile = (download: boolean = false) => {
		const filename = "CancerModelsOrg_ModelID-metadata.tsv";
		const tsvData =
			Object.keys({
				modelId: metadataModelId,
				...metadataFileData,
				pdxModelPublications: pubmedIds,
			}).join("\t") +
			"\n" +
			Object.values({
				modelId: metadataModelId,
				...metadataFileData,
				pdxModelPublications: pubmedIds,
			}).join("\t");

		const blob = new Blob([tsvData], { type: "text/tsv" });

		if (download) FileSaver.saveAs(blob, filename);

		return { blob, filename };
	};

	const toggleFromDownload = (data: IMolecularData) => {
		const filename: string = `CancerModelsOrg_${metadata.modelId}_${
			data.dataType.split(" ").join("-") ?? ""
		}_${data.sampleId ?? ""}_${
			data.platformName.split(" ").join("-") ?? ""
		}.tsv`; // if it changes, update in checkbox checked state

		if (dataToDownload.some((el) => el.filename === filename)) {
			setDataToDownload((prev) =>
				prev.filter((el) => el.filename !== filename)
			);
		} else {
			getMolecularDataDownload(data).then((d) => {
				setDataToDownload((prev) => [
					...prev,
					{
						data: d,
						filename,
					},
				]);
			});
		}
	};

	const downloadData = async (data?: IMolecularData) => {
		// Create new zip
		let zip = new JSZip();

		// Create metadata file
		const { blob: metadataBlob, filename: metadataFileName } =
			createMetadataFile();
		// Add metadata file to zip
		zip.file(metadataFileName, metadataBlob);

		// If we pass some data, that means we just want to download that single data file
		if (data) {
			const molecularData = await getMolecularDataDownload(data);

			// Extract headers
			const headers = Object.keys(molecularData[0]);

			// Convert object values to array of arrays
			const values = molecularData.map((obj: { [key: string]: any }) =>
				headers.map((header) => obj[header])
			);

			// Join headers and values using tab characters
			const tsv = [headers.join("\t")]
				.concat(values.map((row: string[]) => row.join("\t")))
				.join("\n");

			zip.file(
				`CancerModelsOrg_${metadata.modelId}_${
					data.dataType.split(" ").join("-") ?? ""
				}_${data.sampleId ?? ""}_${
					data.platformName.split(" ").join("-") ?? ""
				}.tsv`,
				tsv
			);
		} else {
			// Create files and add to zip for each data added
			dataToDownload.forEach((data) => {
				// Extract headers
				const headers = Object.keys(data.data[0]);

				// Convert object values to array of arrays
				const values = data.data.map((obj) =>
					headers.map((header) => obj[header])
				);

				// Join headers and values using tab characters
				const tsv = [headers.join("\t")]
					.concat(values.map((row) => row.join("\t")))
					.join("\n");

				// Create file inside zip
				zip.file(data.filename, tsv);
			});
		}

		zip.generateAsync({ type: "blob" }).then(function (content) {
			// Save file to users computer
			FileSaver.saveAs(content, `CancerModelsOrg_${metadata.modelId}-data.zip`);
		});
	};

	return (
		<>
			{/* page metadata */}
			<Head>
				<title>
					{`CancerModels.Org - ${metadata.modelId} - ${metadata.histology} - ${metadata.modelType}`}
				</title>
			</Head>

			<header className="bg-primary-primary text-white py-5">
				<div className="container">
					<div className="row align-center py-5 pb-lg-0 text-capitalize">
						<div className="col-12 col-md-10 col-lg-6 col-xl-6 col-xxx-4 offset-md-1 offset-xl-2 offset-xxx-2 mb-5">
							<h2
								className={`m-0 text-family-secondary ${styles.ModelDetails_histology}`}
							>
								{metadata.histology} - {metadata.modelType}
							</h2>
							<h1 className="m-0 mb-2">{metadata.modelId}</h1>
							{metadata.score > 0 && (
								<QualityBadge
									score={metadata.score}
									containerClassName="text-white"
									className="w-50"
								/>
							)}
						</div>
						<div className="col-12 col-md-10 col-lg-5 col-xxx-3 col-xl-5 offset-lg-1 offset-xl-5 offset-xxx-1 offset-md-1 text-right">
							<p className="mb-1">Provided by</p>
							<h3 className="my-0 mb-3 mb-lg-0">
								<Link
									className="text-white text-noDecoration"
									href={`/about/providers/${metadata.providerId.toLowerCase()}`}
								>
									{metadata.providerName}
								</Link>
							</h3>
							<div className="d-flex flex-column d-lg-block">
								{extLinks.sourceDatabaseUrl && (
									<Link
										className="text-white mr-lg-3 mr-xl-0"
										href={extLinks.sourceDatabaseUrl}
										target="_blank"
										rel="noopener noreferrer"
										onClick={() =>
											hj_event(`click_providerViewData-${metadata.providerId}`)
										}
									>
										View data at {metadata.providerId || "provider"}
									</Link>
								)}
								<Button
									priority="secondary"
									color="white"
									htmlTag="a"
									href={extLinks.contactLink}
									className="mb-0 ml-lg-3 align-self-end"
									onClick={() =>
										hj_event(`click_providerContact-${metadata.providerId}`)
									}
								>
									<>Contact {metadata.providerId || "provider"}</>
								</Button>
							</div>
							{metadata.licenseName && metadata.licenseUrl ? (
								<div className="mt-5">
									<p className="mb-0">
										License:{" "}
										<Link
											className="text-white"
											target="_blank"
											rel="noopener noreferrer"
											href={metadata.licenseUrl}
										>
											{metadata.licenseName}
										</Link>
									</p>
								</div>
							) : null}
						</div>
					</div>
				</div>
			</header>
			<section>
				<div className="container">
					<div className="row">
						<ShowHide showOver={bpLarge} windowWidth={windowWidth || 0}>
							<aside className="col-12 col-lg-2">
								<div className="pt-5 sticky top-0">
									<p className="h4">Data available</p>
									<ul className="ul-noStyle">
										<li className="mb-2">
											<Link
												replace
												href="#metadata"
												className="text-primary-primary"
											>
												Patient/Tumour Metadata
											</Link>
										</li>
										<li className="mb-2">
											{metadata.modelType === "PDX" && engraftments?.length ? (
												<Link
													replace
													href="#engraftments"
													className="text-primary-primary"
												>
													PDX model engraftment
												</Link>
											) : (
												"PDX model engraftment"
											)}
										</li>
										<li className="mb-2">
											{qualityData.length ? (
												<Link
													replace
													href="#quality-control"
													className="text-primary-primary"
												>
													Quality control
												</Link>
											) : (
												"Quality control"
											)}
										</li>
										<li className="mb-2">
											{molecularData.length ? (
												<Link
													replace
													href="#molecular-data"
													className="text-primary-primary"
												>
													Molecular data
												</Link>
											) : (
												"Molecular data"
											)}
										</li>
										<li className="mb-2">
											{drugDosing.length ? (
												<Link
													replace
													href="#dosing-studies"
													className="text-primary-primary"
												>
													Dosing studies
												</Link>
											) : (
												"Dosing studies"
											)}
										</li>
										<li className="mb-2">
											{patientTreatment.length ? (
												<Link
													replace
													href="#patient-treatment"
													className="text-primary-primary"
												>
													Patient treatment
												</Link>
											) : (
												"Patient treatment"
											)}
										</li>
										<li className="mb-2">
											{modelImages.length ? (
												<Link
													replace
													href="#histology-images"
													className="text-primary-primary"
												>
													Histology images
												</Link>
											) : (
												"Histology images"
											)}
										</li>
										<li className="mb-2">
											{publications.length ? (
												<Link
													replace
													href="#publications"
													className="text-primary-primary"
												>
													Publications
												</Link>
											) : (
												"Publications"
											)}
										</li>
									</ul>
								</div>
							</aside>
						</ShowHide>
						<div className="col-12 col-lg-10">
							<div id="metadata" className="row mb-3 pt-3">
								<div className="col-12">
									<h2 className="mt-0">Patient / Tumour Metadata</h2>
									<ul className="row ul-noStyle">
										{metadataDataArr.map((data) => {
											data.value =
												typeof data.value === "string"
													? data.value.replace("/", " / ")
													: data.value ?? NA_STRING;

											return (
												<li
													key={data.label}
													className={`mb-2 text-capitalize col-6 col-lg-3 ${styles.ModelDetails_metadata}`}
												>
													<span>{data.label}</span>
													<br />
													{data.value}
												</li>
											);
										})}
									</ul>
								</div>
								<div className="col-12">
									<Button
										color="dark"
										priority="secondary"
										onClick={() => createMetadataFile(true)}
										className="mt-0"
									>
										Download model metadata
									</Button>
								</div>
							</div>
							{engraftments && engraftments?.length > 0 && (
								<div id="engraftments" className="row mb-5 pt-3">
									<div className="col-12 mb-1">
										<h2 className="mt-0">PDX model engraftment</h2>
										<div className="overflow-auto showScrollbar-vertical">
											<table>
												<caption>PDX model engraftment</caption>
												<thead>
													<tr>
														<th>HOST STRAIN NAME</th>
														<th>SITE</th>
														<th>TYPE</th>
														<th>MATERIAL</th>
														<th>MATERIAL STATUS</th>
														<th>PASSAGE</th>
													</tr>
												</thead>
												<tbody>
													{engraftments?.map((engraftment) => {
														const hostStrainNomenclatures =
															engraftment.hostStrainNomenclature
																.split(" ")
																.map((h) => {
																	const regExp = /(.*)<sup>(.*)<\/sup>(.*)/gm,
																		matches = regExp.exec(h) || [],
																		strainPrefix = matches[1] || "",
																		strainSup = matches[2] || "",
																		strainSuffix = matches[3] || "";

																	return {
																		strainPrefix,
																		strainSup,
																		strainSuffix,
																	};
																});

														return (
															<tr key={engraftment.hostStrainNomenclature}>
																<td className="white-space-nowrap">
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
																		<span className="text-uppercase">
																			{engraftment.hostStrain}
																		</span>
																	</Tooltip>
																</td>
																<td>
																	{engraftment.engraftmentSite ?? NA_STRING}
																</td>
																<td>
																	{engraftment.engraftmentType ?? NA_STRING}
																</td>
																<td>
																	{engraftment.engraftmentSampleType ??
																		NA_STRING}
																</td>
																<td>
																	{engraftment.engraftmentSampleState ??
																		NA_STRING}
																</td>
																<td>
																	{engraftment.passageNumber ?? NA_STRING}
																</td>
															</tr>
														);
													})}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							)}
							{qualityData.length > 0 && (
								<div id="quality-control" className="row mb-5 pt-3">
									<div className="col-12 mb-1">
										<h2 className="mt-0">Model quality control</h2>
										<div className="overflow-auto showScrollbar-vertical">
											<table>
												<caption>Model quality control</caption>
												<thead>
													<tr>
														<th>TECHNIQUE</th>
														<th>DESCRIPTION</th>
														<th>PASSAGE</th>
													</tr>
												</thead>
												<tbody>
													{qualityData.map(
														({
															validationTechnique,
															description,
															passagesTested,
														}: {
															validationTechnique: string;
															description: string;
															passagesTested: string;
														}) => (
															<tr key={validationTechnique}>
																<td>{validationTechnique}</td>
																<td>{description}</td>
																<td>{passagesTested}</td>
															</tr>
														)
													)}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							)}
							{molecularData.length > 0 && (
								<div id="molecular-data" className="row mb-5 pt-3">
									<div className="col-12 mb-1">
										<h2 className="mt-0">Molecular data</h2>
										<div className="overflow-auto showScrollbar-vertical">
											<table>
												<caption>Molecular data</caption>
												<thead>
													<tr>
														<th>SAMPLE ID</th>
														<th>SAMPLE TYPE</th>
														<th>ENGRAFTED TUMOUR PASSAGE</th>
														<th>DATA TYPE</th>
														<th>DATA AVAILABLE</th>
														<th>PLATFORM USED</th>
														<th>RAW DATA</th>
													</tr>
												</thead>
												<tbody>
													{molecularData &&
														molecularData.map((data) => {
															let sampleType,
																rawDataExternalLinks: ExternalDbLinks[] = [],
																dataAvailableContent: JSX.Element;

															switch (data.source) {
																case "xenograft":
																	sampleType = "Engrafted Tumour";
																	break;
																case "patient":
																	sampleType = "Patient Tumour";
																	break;
																default:
																	sampleType = "Tumour Cells";
															}

															const hasExternalDbLinks =
																data.externalDbLinks?.length > 0;
															if (hasExternalDbLinks) {
																data.externalDbLinks
																	?.filter(
																		(data) => data.column === "raw_data_url"
																	)
																	.forEach((obj) =>
																		rawDataExternalLinks.push(obj)
																	);
															}

															if (data.dataExists === "TRUE") {
																if (data.dataRestricted === "TRUE") {
																	dataAvailableContent = (
																		<Link
																			href={extLinks.contactLink || ""}
																			target="_blank"
																			rel="noreferrer noopener"
																			onClick={() =>
																				hj_event("click_requestData")
																			}
																		>
																			REQUEST DATA
																		</Link>
																	);
																} else {
																	dataAvailableContent = (
																		<>
																			<Button
																				color="dark"
																				priority="secondary"
																				className="text-left link-text mt-0 mr-3 mr-md-0 mb-md-1 mr-xxx-3 p-0 text-link"
																				onClick={() => {
																					setSelectedMolecularViewData(data);
																					hj_event("click_viewData");
																				}}
																			>
																				VIEW DATA
																			</Button>
																			<Button
																				color="dark"
																				priority="secondary"
																				className="text-left link-text mt-0 m-0 mr-3 mr-md-0 mb-md-1 mr-xxx-3 p-0 text-link"
																				onClick={() => {
																					downloadData(data);
																					hj_event("click_downloadData");
																				}}
																			>
																				DOWNLOAD DATA
																			</Button>
																			<InputAndLabel
																				label="Add to batch download"
																				name={`add-to-download-${data.sampleId}-${data.dataType}-${data.platformName}`}
																				type="checkbox"
																				forId={`add-to-download-id-${data.sampleId}-${data.dataType}-${data.platformName}`}
																				checked={dataToDownload.some(
																					(batchData) =>
																						batchData.filename ===
																						`CancerModelsOrg_${
																							metadata.modelId
																						}_${
																							data.dataType
																								.split(" ")
																								.join("-") ?? ""
																						}_${data.sampleId ?? ""}_${
																							data.platformName
																								.split(" ")
																								.join("-") ?? ""
																						}.tsv` // if this changes, update in toggleFromDownload
																				)}
																				onChange={() =>
																					toggleFromDownload(data)
																				}
																				className="text-smaller mt-1"
																			/>
																		</>
																	);
																}
															} else {
																dataAvailableContent = (
																	<Tooltip
																		content={
																			<>
																				<p className={`text-small my-0`}>
																					Available on next release
																				</p>
																			</>
																		}
																	>
																		Pending
																	</Tooltip>
																);
															}

															return (
																<tr key={data.molecularCharacterizationId}>
																	<td className="white-space-nowrap">
																		{data.sampleId}
																	</td>
																	<td>{sampleType}</td>
																	<td>{data.xenograftPassage || NA_STRING}</td>
																	<td className="text-capitalize">
																		{data.dataType}
																	</td>
																	<td>{dataAvailableContent}</td>
																	<td>{data.platformName}</td>
																	<td>
																		{hasExternalDbLinks
																			? rawDataExternalLinks?.map(
																					(externalResource) => (
																						<React.Fragment
																							key={externalResource.resource}
																						>
																							<Link
																								href={externalResource.link}
																								target="_blank"
																								rel="noopener noreferrer"
																							>
																								{externalResource.resource}
																							</Link>
																							<br />
																						</React.Fragment>
																					)
																			  )
																			: "Not available"}
																	</td>
																</tr>
															);
														})}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							)}
							{drugDosing.length > 0 && (
								<div id="dosing-studies" className="row mb-5 pt-3">
									<div className="col-12 mb-1">
										<h2 className="mt-0">Dosing studies</h2>
										<div className="overflow-auto showScrollbar-vertical">
											<table>
												<caption>Dosing studies</caption>
												<thead>
													<tr>
														<th>DRUG</th>
														<th>DOSE</th>
														<th>RESPONSE</th>
													</tr>
												</thead>
												<tbody>
													{drugDosing.map(
														({
															treatmentName: name,
															treatmentDose: dose,
															treatmentResponse: response,
														}) => (
															<tr key={name + dose}>
																<td>{name}</td>
																<td>{dose}</td>
																<td>{response}</td>
															</tr>
														)
													)}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							)}
							{patientTreatment.length > 0 && (
								<div id="patient-treatment" className="row mb-5 pt-3">
									<div className="col-12 mb-1">
										<h2 className="mt-0">Patient treatment</h2>
										<div className="overflow-auto showScrollbar-vertical">
											<table>
												<caption>Patient treatment</caption>
												<thead>
													<tr>
														<th>TREATMENT</th>
														<th>DOSE</th>
														<th>RESPONSE</th>
													</tr>
												</thead>
												<tbody>
													{patientTreatment.map(
														({
															treatmentName: name,
															treatmentDose: dose,
															treatmentResponse: response,
														}) => (
															<tr key={name}>
																<td className="white-space-unset">{name}</td>
																<td className="text-capitalize">{dose}</td>
																<td>{response}</td>
															</tr>
														)
													)}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							)}
							{modelImages.length > 0 && (
								<div id="histology-images" className="row mb-5 pt-3">
									<div className="col-12 mb-1">
										<h2 className="mt-0">Histology images</h2>
									</div>
									<div className="col-12">
										<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-gap-3">
											{modelImages.map(({ url, description }) => (
												<div key={url} className="col">
													<div className="ar-16-9 overflow-hidden mb-1">
														<Link href={url} target="_blank" rel="noopener">
															{/* Image component isnt working for external source */}
															<img
																src={url}
																alt={description}
																width={500}
																height={300}
																className="mb-1 h-auto w-100 object-fit-cover"
															/>
														</Link>
													</div>
													<p className="text-small mb-0">{description}</p>
												</div>
											))}
										</div>
									</div>
								</div>
							)}
							{publications.length > 0 && (
								<div id="publications" className="row mb-5 pt-3">
									<div className="col-12">
										<h2 className="mt-0">Publications</h2>
										{publications?.map((publication, idx) => {
											const needsSeparator =
												publications.length > 1 &&
												idx !== publications.length - 1;

											return (
												<div key={publication.pmid}>
													{publication.title && (
														<h3>
															{publication.title.replace(/<[^>]+>/g, " ")}
														</h3>
													)}
													<p className="text-muted text-small">
														{publication.authorString}
													</p>
													<p className="mb-3 text-small">
														{publication.journalTitle} - {publication.pubYear}
													</p>
													<ul className="ul-noStyle text-small d-md-flex">
														{publication.pmid && (
															<li className="mr-md-3">
																<Link
																	href={`https://europepmc.org/article/MED/${publication.pmid}`}
																	target="_blank"
																	rel="noreferrer noopener"
																>
																	View at EuropePMC
																</Link>
															</li>
														)}
														{publication.doi && (
															<li className="mr-md-3">
																<Link
																	href={`https://doi.org/${publication.doi}`}
																	target="_blank"
																	rel="noreferrer noopener"
																>
																	DOI:{publication.doi}
																</Link>
															</li>
														)}
														{publication.pmid && (
															<li>
																<Link
																	href={`https://pubmed.ncbi.nlm.nih.gov/${publication.pmid}`}
																	target="_blank"
																	rel="noreferrer noopener"
																>
																	PubMed
																</Link>
															</li>
														)}
													</ul>
													{needsSeparator && (
														<hr style={{ backgroundColor: "#d2d2d2" }} />
													)}
												</div>
											);
										})}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</section>

			{/* floating card */}
			{dataToDownload[0] ? (
				<div className="row position-sticky bottom-0 mt-5">
					<div className="col-10 offset-1">
						<Card
							className="bg-primary-quaternary mb-2"
							contentClassName="py-2"
						>
							<div className="d-flex align-center justify-content-between">
								<p className="m-0">
									<b>Download selected data: </b>
									{dataToDownload.map((data, idx) => {
										const cleanFilename = data.filename
												.split("_")
												.slice(2)
												.join("_")
												.split(".")[0],
											clearX = (
												<sup>
													<Button
														color="dark"
														priority="secondary"
														className="text-underline m-0 ml-1"
														style={{ padding: ".2rem .3rem" }}
														onClick={() =>
															setDataToDownload((prev) =>
																prev.filter(
																	(el) => el.filename !== data.filename
																)
															)
														}
													>
														X
													</Button>
												</sup>
											);

										if (idx === 0) {
											return (
												<React.Fragment key={cleanFilename}>
													{cleanFilename}
													{clearX}
												</React.Fragment>
											);
										}

										return (
											<React.Fragment key={cleanFilename}>
												{" "}
												<span className="text-primary-tertiary">+</span>{" "}
												{cleanFilename}
												{clearX}
											</React.Fragment>
										);
									})}
								</p>
								<div className="d-flex">
									<Button
										color="dark"
										priority="primary"
										className="my-1 py-1"
										onClick={() => downloadData()}
									>
										Download
									</Button>
									<Button
										color="dark"
										priority="secondary"
										className="my-1 ml-1 py-1"
										onClick={() => setDataToDownload([])}
									>
										Clear
									</Button>
								</div>
							</div>
						</Card>
					</div>
				</div>
			) : null}
			{/* data modal */}
			{selectedMolecularViewData && (
				<DynamicModal
					verticalAlign="top"
					modalWidth="100"
					handleClose={() => setSelectedMolecularViewData(undefined)}
				>
					<Card
						className="bg-white"
						contentClassName="py-3"
						header={
							<header className="d-flex justify-content-between">
								<h3 className="m-0">
									{selectedMolecularViewData.platformName} data
								</h3>
								<CloseIcon
									color="dark"
									onClick={() => setSelectedMolecularViewData(undefined)}
								/>
							</header>
						}
					>
						<MolecularDataTable
							data={selectedMolecularViewData}
							handleDownload={() => downloadData(selectedMolecularViewData)}
						/>
					</Card>
				</DynamicModal>
			)}
		</>
	);
};

export default ModelDetails;

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: "blocking",
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const {
		metadata,
		extLinks,
		molecularData,
		engraftments,
		drugDosing,
		patientTreatment,
		qualityData,
		modelImages,
	} = await getAllModelData(
		params!.modelId as string,
		params!.providerId as string
	);

	return {
		props: {
			metadata,
			extLinks,
			molecularData,
			engraftments: JSON.parse(JSON.stringify(engraftments)),
			drugDosing,
			patientTreatment,
			qualityData,
			modelImages,
		},
		revalidate: 600,
	};
};
