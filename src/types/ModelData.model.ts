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
	validationTechnique: string;
	description: string;
	passagesTested: string;
	validationHostStrainNomenclature: string;
	morphologicalFeatures: string;
	SNPAnalysis: string;
	STRAnalysis: string;
	tumourStatus: string;
	modelPurity: string;
	host_strain_name: string;
	host_strain_nomenclature: string;
	engraftment_site: string;
	engraftment_type: string;
	engraftment_sample_type: string;
	engraftment_sample_state: string;
	passage_number: string;
};

export type ExtLinks = {
	contactLink: string;
	sourceDatabaseUrl: string;
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
	modelId: number;
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
	id: number;
	description: string;
	passagesTested: string;
	validationTechnique: string;
	validationHostStrainNomenclature: string;
	modelId: number;
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
