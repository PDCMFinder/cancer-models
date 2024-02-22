export interface IModelByCancerSystem {
	cancer_system: string;
	histology: string;
	count: number;
}

export interface ICancerHierarchy {
	search_terms: string;
	children: {
		search_terms: string;
		children: {
			search_terms: string;
			count: number;
		}[];
	}[];
}

export interface IModelByTreatment {
	treatment: string;
	count: number;
}

export interface IModelByType {
	model_type: string;
	count: number;
}

export interface IMutatedGene {
	markers_with_mutation_data?: string;
	mutated_gene?: string;
	count: number;
}

export interface IModelByMutatedGene {
	markers_with_mutation_data: string;
	count: number;
}

export interface IModelByPatientGender {
	patient_sex: string;
	count: number;
}

export interface IModelByTumourType {
	tumour_type: string;
	count: number;
}

export interface IModelsByPatientEthnicity {
	patient_ethnicity: string;
	count: number;
}

export interface IModelByPatientAge {
	patient_age: string;
	count: number;
}

export interface IParsedRelease {
	released_at: string;
	tag_name: string;
	description: string;
	repository?: "Data" | "UI";
}

export interface IModelCount {
	key: string;
	value: number;
}
