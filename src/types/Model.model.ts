export interface IModelDetailsProps {
	metadata: IMetadata;
	extLinks: IExtLinks;
	molecularData: IMolecularData[];
	molecularDataRestrictions: IMolecularDataRestrictions[];
	drugDosing: any[];
	patientTreatment: IPatientTreatment[];
	qualityData: IQualityData[];
	className: string;
	modelId: string;
	providerId: string;
	engraftments?: IEngraftment[];
}

interface IMolecularDataRestrictions {
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
	externalDbLinks: any;
}

interface IPatientTreatment {
	treatmentDose: string;
	treatmentName: string;
	treatmentResponse: string;
}

export interface IMolecularData {
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
	externalDbLinks: IExternalDbLinks[];
}

export interface IExternalDbLinks {
	column: string;
	link: string;
	resource: string;
}

export interface IQualityData {
	id: number;
	description: string;
	passagesTested: string;
	validationTechnique: string;
	validationHostStrainNomenclature: string;
	modelId: number;
}

export interface IMetadata {
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
	scores: IScore;
	pdcmModelId: number;
}

interface IScore {
	data_score: number;
	pdx_metadata_score: number;
}

export interface IExtLinks {
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

interface ITypesMap {
	expression_molecular_data: string;
	cna_molecular_data: string;
	mutation_measurement_data: string;
	biomarker_molecular_data: string;
}
