export type SearchResult = {
	pdcmId: string;
	sourceId: string;
	datasource: string;
	providerName: string;
	histology: string;
	primarySite: string;
	collectionSite: string;
	modelType: string;
	tumourType: string;
	dataAvailable?: string[];
	patientSex?: string;
	patientAge?: string;
	score: number;
	modelAvailable: boolean;
};
