import { CamelCaseKeys } from "../../types/globalTypes";

export type AllModelData = {
	metadata: Metadata;
	extLinks: ExtLinks;
	molecularData: MolecularData[];
	immuneMarkers: ImmuneMarker[];
	engraftments: Engraftment[];
	cellModelData: CellModelData;
	drugDosing: DrugDosing[];
	patientTreatment: PatientTreatment[];
	qualityData: QualityData[];
	knowledgeGraph: KnowledgeGraph;
	modelImages: ModelImage[];
	publications: Publication[];
};

type ModelScores = {
	dataScore: number;
	inVitroMetadataScore: number;
	pdxMetadataScore: number;
};

export type ModelMetadata = {
	histology: string;
	providerName: string;
	cancerSystem: string;
	modelType: string;
	modelAvailabilityBoolean: boolean;
	patientSex: string;
	patientAge: string;
	patientEthnicity: string;
	tumourType: string;
	cancerGrade: string;
	cancerStage: string;
	primarySite: string;
	collectionSite: string;
	licenseName: string;
	licenseUrl: string;
	scores: ModelScores;
	pdcmModelId: number;
	modelId: string;
	providerId: string;
	externalModelId: string;
	projectName: string;
	datasetAvailable: string[];
	cancerGradingSystem: string;
	cancerStagingSystem: string;
	patientHistory: string;
	patientEthnicityAssessmentMethod: string;
	patientInitialDiagnosis: string;
	patientAgeAtInitialDiagnosis: string;
	patientSampleId: string;
	patientSampleCollectionDate: string;
	patientSampleCollectionEvent: string;
	patientSampleMonthsSinceCollection: string;
	patientSampleVirologyStatus: string;
	patientSampleSharable: string;
	patientSampleTreatedAtCollection: string;
	patientSampleTreatedPriorToCollection: string;
	pdxModelPublications: string;
};

type ExternalModelLinkTypes = "external_id" | "supplier";

export type ExternalModelLink = {
	type: ExternalModelLinkTypes;
	resourceLabel: string;
	linkLabel: string;
	link: string;
};

export type ExternalModelLinkByType = Record<
	ExternalModelLinkTypes,
	ExternalModelLink[]
>;

export type APIExternalModelLink = {
	type: ExternalModelLinkTypes;
	resource_label: string;
	link_label: string;
	link: string;
};

export type ExtLinks = {
	contactLink: string;
	sourceDatabaseUrl: string;
	externalModelLinksByType: ExternalModelLinkByType;
};

export type APIExtLinks = {
	other_model_links: APIExternalModelLink[];
	contact_form?: { form_url: string };
	contact_people?: { email_list: string };
	source_database?: { database_url: string };
};

export type MolecularData = {
	modelId: string;
	dataSource: string;
	source: string;
	sampleId: string;
	xenograftPassage: string;
	rawDataUrl: string;
	dataType: string;
	platformName: string;
	molecularCharacterizationId: number;
	externalDbLinks: ExternalDbLink[];
	dataExists: string;
	dataRestricted: string;
};

export type ExternalDbLink = {
	column: string;
	resource: string;
	link: string;
};

export type ImmuneMarker = {
	sampleId: string;
	type: string;
	markers: Marker[];
};

export type Marker = {
	details: string;
	name: string;
	value: string[];
};

export type APIEngraftment = {
	passage_number: string;
	host_strain: {
		name: string;
		nomenclature: string;
	};
	engraftment_site: {
		name: string;
	};
	engraftment_type: {
		name: string;
	};
	engraftment_sample_type: {
		name: string;
	};
	engraftment_sample_state: {
		name: string;
	};
};

export type Engraftment = {
	passageNumber: string;
	hostStrain: string;
	engraftmentSite: string;
	engraftmentType: string;
	engraftmentSampleType: string;
	engraftmentSampleState: string;
	hostStrainNomenclature: string;
};

export type CellModelData = {
	id: number;
	modelName: string;
	modelNameAliases: string;
	type: string;
	growthProperties: string;
	growthMedia: string;
	mediaId: string;
	parentId: string;
	originPatientSampleId: string;
	plateCoating: string;
	otherPlateCoating: string;
	passageNumber: string;
	contaminated: string;
	contaminationDetails: string;
	supplements: string;
	drug: string;
	drugConcentration: string;
};

export type DrugDosing = {
	treatmentName: string;
	treatmentDose: string;
	treatmentResponse: string;
};

export type PatientTreatment = {
	treatmentName: string;
	treatmentDose: string;
	treatmentResponse: string;
};

export type QualityData = {
	id?: number;
	description: string;
	passagesTested: string;
	validationTechnique: string;
	validationHostStrainNomenclature: string;
	modelId?: number | string;
	morphologicalFeatures: string;
	snpAnalysis: string;
	strAnalysis: string;
	tumourStatus: string;
	modelPurity: string;
	comments: string;
};

export type ModelImage = {
	url: string;
	description: string;
	sampleType: string;
	passage: string;
	magnification: string;
	staining: string;
	isBroken: boolean;
};

export type APIKnowledgeGraph = {
	edges: {
		label: string;
		source: number;
		target: number;
	}[];
	nodes: {
		id: number;
		data?: {
			sex?: string;
			type?: string;
		};
		node_type: string;
		node_label: string;
		data_source: string;
	}[];
};

export type KnowledgeGraph = CamelCaseKeys<APIKnowledgeGraph>;

export type Publication = {
	pmid: string;
	doi: string;
	pubYear: string;
	title: string;
	authorString: string;
	journalTitle: string;
};
