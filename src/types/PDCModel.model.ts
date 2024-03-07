export interface PDCModel {
	pdcmId: string;
	datasource: string;
	sourceId: string;
	ncitTerm: string;
	originTissue: string;
	sampleSite: string;
	sampleExtractionMethod: string;
	classification: string;
	tumorType: string;
	cancerSystems: string;
	availableData: string[];
	mutations?: string[];
	drugs?: string[];
	responses?: string[];
	patient: Patient;
}

export interface Patient {
	ageRange?: string;
	gender: string;
	ethnicity?: string;
	treatmentHistory?: string;
	originalDiagnosis: string;
}

export interface Treatment {
	treatmentName: string;
	treatmentDose: string;
	treatmentResponse: string;
}

export interface IImmuneMarkerAPI {
	model_id: string;
	data_source: string;
	source: string;
	sample_id: string;
	marker_type: "HLA type" | "Model Genomics";
	marker_name: string;
	marker_value: string;
	essential_or_additional_details: string;
}

export interface IModelDetailsMetadata {
	pdcmModelId: number;
	externalModelId: string;
	dataSource: string;
	projectName: string;
	providerName: string;
	modelType: string;
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
	patientSex: string;
	patientHistory: string;
	patientEthnicity: string;
	patientEthnicityAssessmentMethod: string;
	patientInitialDiagnosis: string;
	patientAgeAtInitialDiagnosis: string;
	patientSampleId: string;
	patientSampleCollectionDate: string;
	patientSampleCollectionEvent: string;
	patientSampleMonthsSinceCollection1: string;
	patientSampleVirologyStatus: string;
	patientSampleSharable: string;
	patientSampleTreatedAtCollection: string;
	patientSampleTreatedPriorToCollection: string;
	pdxModelPublications: string;
	qualityAssurance: IModelQualityData[];
	xenograftModelSpecimens: XenograftModelSpecimen[];
	modelImages: any;
	markersWithCnaData: string[];
	markersWithMutationData: string[];
	markersWithExpressionData: any;
	markersWithBiomarkerData: string[];
	breastCancerBiomarkers: any;
	msiStatus: any;
	hlaTypes: any;
	treatmentList: string[];
	modelTreatmentList: string[];
	customTreatmentTypeList: string[];
	rawDataResources: any;
	cancerAnnotationResources: string[];
	scores: Scores;
	modelDatasetTypeCount: number;
	paediatric: boolean;
}

export interface QualityAssurance {
	validation_technique: string;
	description: string;
	passages_tested: string;
	validation_host_strain_nomenclature: string;
}

export interface XenograftModelSpecimen {
	host_strain_name: string;
	host_strain_nomenclature: string;
	engraftment_site: string;
	engraftment_type: string;
	engraftment_sample_type: string;
	engraftment_sample_state: string;
	passage_number: string;
}

export interface Scores {
	pdx_metadata_score: number;
	data_score: number;
}

export interface IPublicationData {
	title?: string;
	pubYear?: string;
	authorString?: string;
	journalTitle?: string;
	pmid?: string;
	doi?: string;
}

export interface IParsedModelQualityData {
	id: number;
	description: string;
	passagesTested: string;
	validationTechnique: string;
	validationHostStrainNomenclature: string;
	modelId: number;
}

export interface IModelQualityData {
	id: number;
	description: string;
	passages_tested: string;
	validation_technique: string;
	validation_host_strain_nomenclature: string;
	model_id: number;
}

interface IExternalDbLinks {
	column: string;
	resource: string;
	link: string;
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
	molecularCharacterizationId: number;
	externalDbLinks: IExternalDbLinks[];
	dataExists: string;
	dataRestricted: string;
	[key: string]: any;
}

export interface IAPIMolecularData {
	hgnc_symbol: string;
	non_harmonised_symbol: string;
	amino_acid_change: string;
	chromosome: string;
	strand: string;
	consequence: string;
	read_depth: string;
	allele_frequency: string;
	seq_start_position: string;
	ref_allele: string;
	alt_allele: string;
	biotype: string;
	external_db_links: IExternalDbLinks[];
	data_source: string;
}

export interface IModelMolecularDataDetails {
	modelId: string;
	dataSource: string;
	source: string;
	sampleId: string;
	xenograftPassage: string;
	rawDataUrl: any;
	dataType: string;
	platformName: string;
	molecularCharacterizationId: number;
	externalDbLinks: IExternalDbLinks[];
	dataExists: string;
	dataRestricted: string;
}
