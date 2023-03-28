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
  availableData: Array<string>;
  mutations?: Array<string>;
  drugs?: Array<string>;
  responses?: Array<string>;
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

export interface Publication {
  pmid: string;
  title: string;
  pubYear: string;
  journalTitle: string;
  authorString: string;
  doi: string;
}
