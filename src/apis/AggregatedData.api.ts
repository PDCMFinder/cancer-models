import { GitlabRelease } from "../../types/releaseTypes";
import { ethnicityCategories } from "../utils/collapseEthnicity";
import { camelCase, countUniqueValues } from "../utils/dataUtils";
import mergeObjectsIntoCountObject from "../utils/mergeObjectsIntoCountObject";
import parseRelease from "../utils/parseRelease";

export async function getModelsByCancerSystem(): Promise<any> {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_cancer?select=cancer_system,count&order=count.desc`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d) => {
		d.filter(
			(i: any) =>
				i.cancer_system !== null &&
				i.cancer_system !== i.histology &&
				i.cancer_system !== "Unclassified"
		);

		return mergeObjectsIntoCountObject(d);
	});
}

export async function getFrequentlyMutatedGenes() {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_mutated_gene?order=count.desc&limit=20`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response
		.json()
		.then((d: any[]) => d.reverse().map((i: any) => camelCase(i)));
}

export async function getModelsByTreatment() {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_treatment?order=count.desc&limit=20`
	);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json().then((d) => mergeObjectsIntoCountObject(d));
}

export async function getModelsByDiagnosis() {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_diagnosis?order=count.desc&limit=10`
	);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json().then((d) => mergeObjectsIntoCountObject(d));
}

export async function getModelsByType(): Promise<Record<string, number>> {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_type?order=count.desc`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d) => mergeObjectsIntoCountObject(d));
}

export async function getModelsByProvider(): Promise<Record<string, number>> {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_provider?order=count.desc`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d) => mergeObjectsIntoCountObject(d));
}

export async function getModelsByPrimarySite(): Promise<
	Record<string, number>
> {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_primary_site?order=count.desc&limit=10`
	);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json().then((d) => mergeObjectsIntoCountObject(d));
}

export async function getModelsByMutatedGene() {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_mutated_gene?order=count.desc&limit=20`
	);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response
		.json()
		.then((d: Record<string, number>[]) => mergeObjectsIntoCountObject(d));
}

export async function getModelsByPatientSex() {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_patient_sex?order=count.desc`
	);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json().then((d) => mergeObjectsIntoCountObject(d));
}

export async function getModelsByTumourType() {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_tumour_type?order=count.desc`
	);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json().then((d) => mergeObjectsIntoCountObject(d));
}

interface PatientEthnicityResponse {
	patient_ethnicity: string;
	count: number;
}

export async function getModelsByPatientEthnicity() {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_patient_ethnicity?order=count.desc`
	);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json().then((d: PatientEthnicityResponse[]) => {
		const groupedData = d.reduce((acc: Record<string, number>, item) => {
			let ethnicity = item.patient_ethnicity;
			let topCategory = ethnicity;
			if (
				ethnicity?.toLocaleLowerCase() === "not provided" ||
				ethnicity?.toLocaleLowerCase() === "not provided" ||
				ethnicity?.toLocaleLowerCase() === "not collected" ||
				!ethnicity
			)
				return acc;

			for (const [category, values] of Object.entries(ethnicityCategories)) {
				if (values.includes(ethnicity)) {
					topCategory = category;

					break;
				}
			}

			acc[topCategory] = (acc[topCategory] || 0) + item.count;
			return acc;
		}, {});

		return groupedData;
	});
}

export async function getModelsByPatientAge() {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_patient_age?order=count.desc`
	);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json().then((d) => mergeObjectsIntoCountObject(d));
}

export async function getModelsByDatasetAvailability() {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_dataset_availability?order=count.desc`
	);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json().then((d: any[]) => mergeObjectsIntoCountObject(d));
}

export async function getDataReleaseInformation() {
	let response = await fetch(
		"https://gitlab.ebi.ac.uk/api/v4/projects/1629/releases",
		{
			headers: {
				"PRIVATE-TOKEN": "glpat-gbQzKFxHTWyp_jZhP5gE"
			}
		}
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d) => {
		d.forEach(async (release: GitlabRelease) => {
			release = await parseRelease(release, "data");
		});

		return d;
	});
}

export async function getLatestDataReleaseInformation() {
	// pdxfinder-data repo (data)
	let response = await fetch(
		"https://gitlab.ebi.ac.uk/api/v4/projects/1629/releases?per_page=1",
		{
			headers: {
				"PRIVATE-TOKEN": "glpat-gbQzKFxHTWyp_jZhP5gE"
			}
		}
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d: GitlabRelease[]) => parseRelease(d[0]));
}

export async function getUIReleaseInformation() {
	// cancer-models repo (ui)
	let response = await fetch(
		"https://gitlab.ebi.ac.uk/api/v4/projects/4135/releases",
		{
			headers: {
				"PRIVATE-TOKEN": "glpat-SJR6QYyByDoaKp-wCRxL"
			}
		}
	);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json().then((d) => {
		d.forEach(async (release: GitlabRelease) => {
			release = await parseRelease(release, "ui");
		});

		return d;
	});
}

export async function getModelCount() {
	let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/info`);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response
		.json()
		.then(
			(d: { value: number; key: string }[]) =>
				d.filter(
					(el: { value: number; key: string }) => el.key === "total_models"
				)[0].value
		);
}

export async function getModelsByRareCancer() {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_rare_cancer`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response
		.json()
		.then((d: Record<string, number>[]) => mergeObjectsIntoCountObject(d));
}

export async function getProviderCount() {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/provider_group?select=id`,
		{
			headers: {
				"Range-Unit": "items",
				Range: "0-24",
				Prefer: "count=exact"
			}
		}
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.headers.get("Content-range")?.split("/")[1];
}

export type ProviderDataCounts = {
	cancer_system: Record<string, number>;
	patient_age: Record<string, [Record<string, number>, number]>;
	model_type: Record<string, number>;
	tumour_type: Record<string, number>;
	patient_ethnicity: Record<string, number>;
	dataset_available: Record<string, number>;
	totalModelCount: number;
};

export async function getProviderDataCounts(
	providerId: string
): Promise<ProviderDataCounts> {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/search_index?data_source=in.("${providerId}")&select=cancer_system,patient_age,model_type,tumour_type,patient_ethnicity,dataset_available`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json().then(
		(
			d: {
				cancer_system: string;
				patient_age: string;
				model_type: string;
				tumour_type: string;
				patient_ethnicity: string;
				dataset_available: string[];
			}[]
		) => {
			const groupedPatientEthnicity = d.map((item) => {
				let ethnicity = item.patient_ethnicity;
				for (const [category, values] of Object.entries(ethnicityCategories)) {
					if (values.includes(ethnicity)) {
						ethnicity = category;
						break;
					}
				}
				return { patient_ethnicity: ethnicity };
			});

			const cancerSystemCounts = countUniqueValues(
				d.map((item) => ({ cancer_system: item.cancer_system })),
				"cancer_system"
			);
			const modelTypeCounts = countUniqueValues(
				d.map((item) => ({ model_type: item.model_type })),
				"model_type"
			);
			const patientAgeCounts = countUniqueValues(
				d.map((item) => ({ patient_age: item.patient_age })),
				"patient_age"
			);
			const tumourTypeCounts = countUniqueValues(
				d.map((item) => ({ tumour_type: item.tumour_type })),
				"tumour_type"
			);
			const patientEthnicityCounts = countUniqueValues(
				groupedPatientEthnicity,
				"patient_ethnicity"
			);
			const datasetAvailableCounts = countUniqueValues(
				d.map((item) => ({ dataset_available: item.dataset_available })),
				"dataset_available"
			);
			const totalModelCount = Object.values(modelTypeCounts).reduce(
				(acc, curr) => acc + curr,
				0
			);

			return {
				cancer_system:
					cancerSystemCounts as ProviderDataCounts["cancer_system"],
				patient_age:
					patientAgeCounts as unknown as ProviderDataCounts["patient_age"], // sorry for using unknown
				model_type: modelTypeCounts as ProviderDataCounts["model_type"],
				tumour_type: tumourTypeCounts as ProviderDataCounts["tumour_type"],
				patient_ethnicity:
					patientEthnicityCounts as ProviderDataCounts["patient_ethnicity"],
				dataset_available:
					datasetAvailableCounts as ProviderDataCounts["dataset_available"],
				totalModelCount
			};
		}
	);
}
