import { CamelCaseKeys } from "../../types/globalTypes";

export type AllModelData = {
	metadata: ParsedModelMetadata;
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

type ParsedModelMetadata = {
	histology: string;
	providerName: string;
	cancerSystem: string;
	modelType: string;
	modelAvailable: boolean;
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
	dateSubmitted: string;
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

// export type ModelMetadata = {
// 	histology: string;
// 	providerName: string;
// 	cancerSystem: string;
// 	modelType: string;
// 	modelAvailabilityBoolean: boolean;
// 	patientSex: string;
// 	patientAge: string;
// 	patientEthnicity: string;
// 	tumourType: string;
// 	cancerGrade: string;
// 	cancerStage: string;
// 	primarySite: string;
// 	collectionSite: string;
// 	licenseName: string;
// 	licenseUrl: string;
// 	scores: ModelScores;
// 	pdcmModelId: number;
// 	modelId: string;
// 	providerId: string;
// 	externalModelId: string;
// 	projectName: string;
// 	datasetAvailable: string[];
// 	cancerGradingSystem: string;
// 	cancerStagingSystem: string;
// 	patientHistory: string;
// 	patientEthnicityAssessmentMethod: string;
// 	patientInitialDiagnosis: string;
// 	patientAgeAtInitialDiagnosis: string;
// 	patientSampleId: string;
// 	patientSampleCollectionDate: string;
// 	patientSampleCollectionEvent: string;
// 	patientSampleMonthsSinceCollection_1: string;
// 	patientSampleVirologyStatus: string;
// 	patientSampleSharable: string;
// 	patientSampleTreatedAtCollection: string;
// 	patientSampleTreatedPriorToCollection: string;
// 	pdxModelPublications: string;
// };

export type ModelMetadata = {
	pdcmModelId: number;
	externalModelId: string;
	dataSource: string;
	projectName: string;
	providerName: string;
	modelType: string;
	supplier: string;
	supplierType: string;
	catalogNumber: string;
	vendorLink: string;
	rrid: any;
	externalIds: string;
	histology: string;
	searchTerms: string[];
	cancerSystem: string;
	datasetAvailable: string[];
	licenseName: string;
	licenseUrl: string;
	primarySite: string;
	collectionSite: string;
	tumourType: string;
	cancerGrade: string;
	cancerGradingSystem: string;
	cancerStage: string;
	cancerStagingSystem: string;
	patientAge: string;
	patientAgeCategory: string;
	patientSex: string;
	patientHistory: string;
	patientEthnicity: string;
	patientEthnicityAssessmentMethod: string;
	patientInitialDiagnosis: string;
	patientAgeAtInitialDiagnosis: string;
	patientSampleId: string;
	patientSampleCollectionDate: string;
	patientSampleCollectionEvent: string;
	patientSampleCollectionMethod: string;
	patientSampleMonthsSinceCollection_1: string;
	patientSampleGeneMutationStatus: string;
	patientSampleVirologyStatus: string;
	patientSampleSharable: string;
	patientSampleTreatmentNaiveAtCollection: string;
	patientSampleTreatedAtCollection: string;
	patientSampleTreatedPriorToCollection: string;
	patientSampleResponseToTreatment: string;
	pdxModelPublications: string;
	qualityAssurance: QualityAssurance[];
	xenograftModelSpecimens: XenograftModelSpecimen[];
	modelImages: any;
	markersWithCnaData: string[];
	markersWithBiomarkerData: string[];
	breastCancerBiomarkers: any;
	msiStatus: any;
	hlaTypes: any;
	treatmentList: string[];
	modelTreatmentList: any;
	customTreatmentTypeList: string[];
	rawDataResources: any;
	cancerAnnotationResources: string[];
	modelAvailability: string;
	dateSubmitted: string;
	scores: Scores;
	modelDatasetTypeCount: number;
	paediatric: boolean;
	modelAvailabilityBoolean: boolean;
	modelRelationships: ModelRelationships;
	hasRelations: boolean;
};

type Scores = {
	dataScore: number;
	inVitroMetadataScore: number;
	pdxMetadataScore: number;
};

export type APIModelMetadata = {
	pdcm_model_id: number;
	external_model_id: string;
	data_source: string;
	project_name: string;
	provider_name: string;
	model_type: string;
	supplier: string;
	supplier_type: string;
	catalog_number: string;
	vendor_link: string;
	rrid: any;
	external_ids: string;
	histology: string;
	search_terms: string[];
	cancer_system: string;
	dataset_available: string[];
	license_name: string;
	license_url: string;
	primary_site: string;
	collection_site: string;
	tumour_type: string;
	cancer_grade: string;
	cancer_grading_system: string;
	cancer_stage: string;
	cancer_staging_system: string;
	patient_age: string;
	patient_age_category: string;
	patient_sex: string;
	patient_history: string;
	patient_ethnicity: string;
	patient_ethnicity_assessment_method: string;
	patient_initial_diagnosis: string;
	patient_age_at_initial_diagnosis: string;
	patient_sample_id: string;
	patient_sample_collection_date: string;
	patient_sample_collection_event: string;
	patient_sample_collection_method: string;
	patient_sample_months_since_collection_1: string;
	patient_sample_gene_mutation_status: string;
	patient_sample_virology_status: string;
	patient_sample_sharable: string;
	patient_sample_treatment_naive_at_collection: string;
	patient_sample_treated_at_collection: string;
	patient_sample_treated_prior_to_collection: string;
	patient_sample_response_to_treatment: string;
	pdx_model_publications: string;
	quality_assurance: QualityAssurance[];
	xenograft_model_specimens: XenograftModelSpecimen[];
	model_images: any;
	markers_with_cna_data: string[];
	markers_with_biomarker_data: string[];
	breast_cancer_biomarkers: any;
	msi_status: any;
	hla_types: any;
	treatment_list: string[];
	model_treatment_list: any;
	custom_treatment_type_list: string[];
	raw_data_resources: any;
	cancer_annotation_resources: string[];
	model_availability: string;
	date_submitted: string;
	scores: APIScores;
	model_dataset_type_count: number;
	paediatric: boolean;
	model_availability_boolean: boolean;
	model_relationships: ModelRelationships;
	has_relations: boolean;
};

type QualityAssurance = {
	validation_technique: string;
	description: string;
	passages_tested: string;
	validation_host_strain_nomenclature: string;
	morphological_features: string;
	SNP_analysis: string;
	STR_analysis: string;
	tumour_status: string;
	model_purity: string;
};

type XenograftModelSpecimen = {
	host_strain_name: string;
	host_strain_nomenclature: string;
	engraftment_site: string;
	engraftment_type: string;
	engraftment_sample_type: string;
	engraftment_sample_state: string;
	passage_number: string;
};

type APIScores = {
	data_score: number;
	in_vitro_metadata_score: number;
	pdx_metadata_score: number;
};

type ModelRelationships = {
	parents: any;
	children: any;
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
