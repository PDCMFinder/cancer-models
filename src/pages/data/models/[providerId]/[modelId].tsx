import { GetStaticProps, GetStaticPaths } from "next";
import getModelDetails from "../../../../utils/getModelDetails";
import Button from "../../../../components/Button/Button";
import Link from "next/link";
import ShowHide from "../../../../components/ShowHide/ShowHide";
import breakPoints from "../../../../utils/breakpoints";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";
import styles from "./Model.module.scss";

interface IModelDetailsProps {
	metadata: Metadata;
	extLinks: ExtLinks;
	molecularData: string[];
	molecularDataRestrictions: any[];
	drugDosing: any[];
	patientTreatment: string[];
	qualityData: string[];
	allPublications: Publication[];
	className: string;
	modelId: string;
	providerId: string;
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
	engraftments: any;
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
	id: string;
	source: string;
	pmid: string;
	pmcid: string;
	fullTextIdList: FullTextIdList;
	doi: string;
	title: string;
	authorString: string;
	journalTitle: string;
	issue: string;
	journalVolume: string;
	pubYear: string;
	journalIssn: string;
	pageInfo: string;
	pubType: string;
	isOpenAccess: string;
	inEPMC: string;
	inPMC: string;
	hasPDF: string;
	hasBook: string;
	hasSuppl: string;
	citedByCount: number;
	hasReferences: string;
	hasTextMinedTerms: string;
	hasDbCrossReferences: string;
	hasLabsLinks: string;
	hasTMAccessionNumbers: string;
	tmAccessionTypeList: TmAccessionTypeList;
	firstIndexDate: string;
	firstPublicationDate: string;
}

interface FullTextIdList {
	fullTextId: string;
}

interface TmAccessionTypeList {
	accessionType: string;
}

const ModelDetails = ({
	metadata,
	extLinks,
	molecularData,
	molecularDataRestrictions,
	drugDosing,
	patientTreatment,
	qualityData,
	allPublications,
}: IModelDetailsProps) => {
	const metadataDataArr = [
		{ label: "Patient Sex", value: metadata.patientSex },
		{ label: "Patient Age", value: metadata.patientAge },
		{ label: "Patient Ethnicity", value: metadata.patientEthnicity },
		{ label: "Tumour Type", value: metadata.tumourType },
		{ label: "Cancer Grade", value: metadata.cancerGrade },
		{ label: "Cancer Stage", value: metadata.cancerStage },
		{ label: "Cancer Stage", value: metadata.cancerStage },
		{ label: "Primary Site", value: metadata.primarySite },
		{ label: "Collection Site", value: metadata.collectionSite },
	];

	const { windowWidth } = useWindowDimensions();

	const bpLarge = breakPoints.large;

	return (
		<>
			<header className="bg-primary-primary text-white py-5">
				<div className="container">
					<div className="row align-center py-5 pb-lg-0 text-capitalize">
						<div className="col-12 col-lg-8 offset-lg-2 col-xxx-6 mb-5">
							<h2 className="h3 m-0 text-family-secondary">
								{metadata.histology} - {metadata.modelType}
							</h2>
							<h1 className="m-0">{metadata.modelId}</h1>
						</div>
						<div className="text-right col-12 col-lg-8 offset-lg-2 col-xxx-5 offset-xxx-1">
							<p className="mb-1">Provided by</p>
							<h3 className="my-0 mb-3">{metadata.providerName}</h3>
							<div className="d-flex flex-column d-lg-block">
								<Link className="text-white" href={extLinks.sourceDatabaseUrl}>
									View data at {metadata.providerId ?? "provider"}
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
							<aside className="col-12 col-lg-3">
								<p> Data available</p>
							</aside>
						</ShowHide>
						<div className="col-12 col-lg-9">
							<div className="row mb-5">
								<div className="col-12">
									<h2 className="mt-0">Patient / Tumor Metadata</h2>
									<ShowHide showOver={bpLarge} windowWidth={windowWidth || 0}>
										<hr className="mb-3 col-md-8 ml-0" />
									</ShowHide>
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
							<div className="row mb-5">
								<div className="col-12">
									<h2 className="mt-0">PDX model engraftment</h2>
									<table>
										<caption>PDX model engraftment</caption>
										<thead>
											<tr>
												<th>asfd</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>asdf</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ModelDetails;

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [
			{
				params: {
					providerId: "PIVOT",
					modelId: "EW-8",
				},
			},
		],
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const {
		metadata,
		extLinks,
		molecularData,
		molecularDataRestrictions,
		engraftments,
		drugDosing,
		patientTreatment,
		qualityData,
		allPublications,
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
			allPublications,
		},
	};
};
