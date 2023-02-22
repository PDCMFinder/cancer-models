import { GetStaticProps, GetStaticPaths } from "next";
import getModelDetails from "../../../../utils/getModelDetails";
import Button from "../../../../components/Button/Button";
import Link from "next/link";
import ShowHide from "../../../../components/ShowHide/ShowHide";
import breakPoints from "../../../../utils/breakpoints";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";
import styles from "./Model.module.scss";
import Card from "../../../../components/Card/Card";

interface IModelDetailsProps {
	metadata: Metadata;
	extLinks: ExtLinks;
	molecularData: MolecularData[];
	molecularDataRestrictions: any[];
	drugDosing: any[];
	patientTreatment: string[];
	qualityData: QualityData[];
	publications: Publication[];
	className: string;
	modelId: string;
	providerId: string;
	engraftments?: Engraftment[];
}

export interface MolecularData {
	id: number;
	patientSampleId: string;
	patientModelId: string;
	xenograftSampleId: string;
	cellSampleId: string;
	xenograftModelId: string;
	xenograftPassage: string;
	rawDataUrl: string;
	dataType: string;
	platformId: string;
	platformName: string;
	dataAvailability: "TRUE" | "FALSE";
	dataSource: string;
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
}

interface ExtLinks {
	contactLink: string;
	sourceDatabaseUrl: string;
}

interface Publication {
	pmid: string;
	doi: string;
	pubYear: string;
	title: string;
	authorString: string;
	journalTitle: string;
}

interface FullTextIdList {
	fullTextId: string;
}

interface TmAccessionTypeList {
	accessionType: string;
}

interface Engraftment {
	passageNumber: string;
	hostStrain: string;
	engraftmentSite: string;
	engraftmentType: string;
	engraftmentSampleType: string;
	engraftmentSampleState: string;
	hostStrainNomenclature: string;
}

const ModelDetails = ({
	metadata,
	extLinks,
	molecularData,
	molecularDataRestrictions,
	drugDosing,
	patientTreatment,
	qualityData,
	publications,
	engraftments,
}: IModelDetailsProps) => {
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
	const typesMap = {
		expression_molecular_data: "expression",
		cna_molecular_data: "copy number alteration",
		mutation_measurement_data: "mutation",
		cytogenetics_molecular_data: "cytogenetics",
	};
	const restrictedTypes = molecularDataRestrictions.map(
		(d) => typesMap[d.molecularDataTable]
	);

	return (
		<>
			<header className="bg-primary-primary text-white py-5">
				<div className="container">
					<div className="row align-center py-5 pb-lg-0 text-capitalize">
						<div className="col-12 col-md-6 col-lg-6 col-xl-6 offset-xl-2 col-xxx-4 offset-xxx-2 mb-5 mb-md-0">
							<h2
								className={`m-0 text-family-secondary ${styles.ModelDetails_histology}`}
							>
								{metadata.histology} - {metadata.modelType}
							</h2>
							<h1 className="m-0">{metadata.modelId}</h1>
						</div>
						<div className="col-12 col-md-6 col-lg-5 offset-lg-1 col-xl-5 offset-xl-5 col-xxx-3 offset-xxx-1 text-right">
							<p className="mb-1">Provided by</p>
							<h3 className="my-0 mb-3 mb-lg-0">{metadata.providerName}</h3>
							<div className="d-flex flex-column d-lg-block">
								<Link
									className="text-white mr-lg-3 mr-xl-0"
									href={extLinks.sourceDatabaseUrl}
								>
									View data at {metadata.providerId || "provider"}
								</Link>
								<Button
									priority="secondary"
									color="white"
									htmlTag="a"
									href={extLinks.contactLink}
									className="mb-0 ml-lg-3 align-self-end"
								>
									<>Contact {metadata.providerId ?? "provider"}</>
								</Button>
							</div>
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
											<Link href="#metadata" className="text-primary-primary">
												Patient/Tumour Metadata
											</Link>
										</li>
										<li className="mb-2">
											{metadata.modelType === "xenograft" &&
											engraftments?.length ? (
												<Link
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
											{publications.length ? (
												<Link
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
													: data.value ?? "N/A";

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
							</div>
							{engraftments?.length && engraftments?.length > 0 && (
								<div id="engraftments" className="row mb-5 pt-3">
									<div className="col-12 mb-1">
										<h2 className="mt-0">PDX model engraftment</h2>
										<div
											className={`overflow-scroll ${styles.ModelDetails_tableContainer}`}
										>
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
															<tr key={engraftment.hostStrainNomenclature}>
																<td className="text-uppercase white-space-nowrap">
																	{/* {hostStrainNomenclatures.map((h) => (
																<span
																	key={
																		h.strainPrefix +
																		h.strainSup +
																		h.strainSuffix
																	}
																>
																	{h.strainPrefix}
																	<sup>{h.strainSup}</sup>
																	{h.strainSuffix}{" "}
																</span>
															))} */}
																	{engraftment.hostStrain}
																</td>
																<td>{engraftment.engraftmentSite ?? "N/A"}</td>
																<td>{engraftment.engraftmentType ?? "N/A"}</td>
																<td>
																	{engraftment.engraftmentSampleType ?? "N/A"}
																</td>
																<td>
																	{engraftment.engraftmentSampleState ?? "N/A"}
																</td>
																<td>{engraftment.passageNumber ?? "N/A"}</td>
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
										<div
											className={`overflow-scroll ${styles.ModelDetails_tableContainer}`}
										>
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
													{qualityData.map((qualityCheck) => (
														<tr key={qualityCheck.validationTechnique}>
															<td>{qualityCheck.validationTechnique}</td>
															<td>{qualityCheck.description}</td>
															<td>{qualityCheck.passagesTested}</td>
														</tr>
													))}
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
										<div
											className={`overflow-scroll ${styles.ModelDetails_tableContainer}`}
										>
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
															const sampleId =
																data.xenograftSampleId ||
																data.patientSampleId ||
																data.cellSampleId;
															const sampleType = data.xenograftSampleId
																? "Engrafted Tumour"
																: "Patient Tumour";

															return (
																<tr key={data.id}>
																	<td>{sampleId}</td>
																	<td>{sampleType}</td>
																	<td>{data.xenograftPassage || "N/A"}</td>
																	<td className="text-capitalize">
																		{data.dataType}
																	</td>
																	<td>
																		{!restrictedTypes.includes(data.dataType) &&
																		data.dataAvailability === "TRUE" ? (
																			<>
																				<button className="text-left link-text mr-3 mr-md-0 mb-md-1">
																					VIEW DATA
																				</button>
																				<button className="text-left link-text">
																					DOWNLOAD DATA
																				</button>
																			</>
																		) : (
																			<Link
																				href={extLinks.contactLink || ""}
																				target="_blank"
																				rel="noreferrer noopener"
																			>
																				REQUEST DATA
																			</Link>
																		)}
																	</td>
																	<td>{data.platformName}</td>
																	<td>
																		{data.rawDataUrl ? (
																			<a
																				href={data.rawDataUrl.split(",")[1]}
																				target="_blank"
																			>
																				{data.rawDataUrl.split(",")[0]}
																			</a>
																		) : (
																			"Not available"
																		)}
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
										<div
											className={`overflow-scroll ${styles.ModelDetails_tableContainer}`}
										>
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
													{drugDosing.map((treatment) => (
														<tr key={treatment.treatmentName}>
															<td>{treatment.treatmentName}</td>
															<td>{treatment.treatmentDose}</td>
															<td>{treatment.treatmentResponse}</td>
														</tr>
													))}
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
										<div
											className={`overflow-scroll ${styles.ModelDetails_tableContainer}`}
										>
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
													{patientTreatment.map((treatment) => (
														<tr key={treatment.treatmentName}>
															<td className="white-space-unset">
																{treatment.treatmentName}
															</td>
															<td>{treatment.treatmentDose}</td>
															<td>{treatment.treatmentResponse}</td>
														</tr>
													))}
												</tbody>
											</table>
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
													<h3>{publication.title.replace(/<[^>]+>/g, " ")}</h3>
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
																>
																	View at EuropePMC
																</Link>
															</li>
														)}
														{publication.doi && (
															<li className="mr-md-3">
																<Link
																	href={`https://doi.org/${publication.doi}`}
																>
																	DOI:{publication.doi}
																</Link>
															</li>
														)}
														{publication.pmid && (
															<li>
																<Link
																	href={`https://pubmed.ncbi.nlm.nih.gov/${publication.pmid}`}
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
		</>
	);
};

export default ModelDetails;

export const getStaticPaths: GetStaticPaths = async () => {
	const getAllParamOptions = async () => {
		let response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/search_index?select=external_model_id,data_source`
		);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		// new object with common key names and param structure
		return response.json().then((d) =>
			d.map((pair: { data_source: string; external_model_id: string }) => {
				return {
					params: {
						providerId: pair["data_source"],
						modelId: pair["external_model_id"],
					},
				};
			})
		);
	};

	return {
		paths: await getAllParamOptions(),
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	// try {
	const {
		metadata,
		extLinks,
		molecularData,
		molecularDataRestrictions,
		engraftments,
		drugDosing,
		patientTreatment,
		qualityData,
		publications,
	} = await getModelDetails(
		params!.modelId as string,
		params!.providerId as string
	);

	return {
		props: {
			metadata,
			extLinks,
			molecularData,
			molecularDataRestrictions,
			engraftments: JSON.parse(JSON.stringify(engraftments)),
			drugDosing,
			patientTreatment,
			qualityData,
			publications,
		},
	};
	// if (
	// 	!{
	// 		metadata,
	// 		extLinks,
	// 		molecularData,
	// 		molecularDataRestrictions,
	// 		engraftments,
	// 		drugDosing,
	// 		patientTreatment,
	// 		qualityData,
	// 		publications,
	// 	}
	// ) {
	// 	return { notFound: true };
	// }
	// return {
	// 	props: {
	// 		metadata,
	// 		extLinks,
	// 		molecularData,
	// 		molecularDataRestrictions,
	// 		engraftments,
	// 		drugDosing,
	// 		patientTreatment,
	// 		qualityData,
	// 		publications,
	// 	},
	// };
	// } catch {
	// 	return { notFound: true };
	// }
};
