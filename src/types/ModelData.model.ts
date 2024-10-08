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
	modelImages: ModelImage[];
	modelRelationships: ModelRelationships;
	publications: Publication[];
};

export type Metadata = {
	histology: string;
	providerName: string;
	cancerSystem: string;
	modelType: string;
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
	score: number;
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

export type ModelRelationships = {
	type?: string;
	parents?: ModelRelationships[];
	children?: ModelRelationships[];
	external_model_id?: string;
};

export type Publication = {
	pmid: string;
	doi: string;
	pubYear: string;
	title: string;
	authorString: string;
	journalTitle: string;
};
