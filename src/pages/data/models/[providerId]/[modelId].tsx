import { GetStaticProps, GetStaticPaths } from "next";
import getModelDetails from "../../../../utils/getModelDetails";
import Button from "../../../../components/Button/Button";
import Link from "next/link";
// import styles from "./Model.module.scss";

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
	params: Params;
}

interface Params {
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
	params,
}: IModelDetailsProps) => {
	return (
		<>
			<header className="bg-primary-primary text-white mb-5 py-5">
				<div className="container">
					<div className="row align-center pt-5 text-capitalize">
						<div className="col-12 col-lg-8 offset-lg-2 col-xxx-6 offset-xxx-0">
							<h2 className="h3 m-0 text-family-secondary">
								{metadata.histology} - {metadata.modelType}
							</h2>
							<h1 className="m-0">{params.modelId}</h1>
						</div>
						<div className="text-right col-12 col-lg-5 offset-lg-5 col-xxx-6 offset-xxx-0">
							<p className="mb-1">Provided by</p>
							<h3 className="my-0">{metadata.providerName}</h3>
							<Link
								className="text-white mr-lg-3"
								href={extLinks.sourceDatabaseUrl}
							>
								View data at {params.providerId}
							</Link>
							<Button
								priority="secondary"
								color="white"
								htmlTag="a"
								href={extLinks.contactLink}
								className="mb-0"
							>
								Contact provider
							</Button>
						</div>
					</div>
				</div>
			</header>
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
			drugDosing,
			patientTreatment,
			qualityData,
			allPublications,
			params,
		},
	};
};
