export interface SearchResult {
	pdcmId: string;
	sourceId: string;
	datasource: string;
	providerName: string;
	histology: string;
	primarySite: string;
	collectionSite: string;
	modelType: string;
	tumourType: string;
	dataAvailable?: Array<string>;
	patientSex?: string;
	patientAge?: number;
}

export interface ResultCol {
	displayName: string;
	key: string;
}
