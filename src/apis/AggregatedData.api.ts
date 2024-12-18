import { GitlabRelease } from "../../types/releaseTypes";
import { ethnicityCategories } from "../utils/collapseEthnicity";
import { camelCase, countUniqueValues } from "../utils/dataUtils";
import parseRelease from "../utils/parseRelease";

export async function getCancerHierarchy(): Promise<any> {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_cancer`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d) => {
		let hierarchy: any = {};
		d.filter(
			(i: any) =>
				i.cancer_system !== null &&
				i.cancer_system !== i.histology &&
				i.cancer_system !== "Unclassified"
		).forEach((element: any) => {
			if (hierarchy[element.cancer_system] === undefined) {
				hierarchy[element.cancer_system] = {
					search_terms: element.cancer_system.replace("Cancer", ""),
					children: []
				};
			}
			hierarchy[element.cancer_system].children.push({
				search_terms: element.histology,
				count: element.count
			});
		});

		return {
			search_terms: "CancerModels.Org Models",
			children: Object.values(hierarchy)
		};
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

	return response.json().then((d: any[]) => {
		var i;
		for (i = 0; i < d.length; i++) {
			d[i]["treatment_list"] = d[i]["treatment"];
			delete d[i].treatment;
		}

		return d;
	});
}

export async function getModelsByType(): Promise<
	{ modelType: string; count: number }[]
> {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_type?order=count.desc`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response
		.json()
		.then((d: { model_type: string; count: number }[]) =>
			d.filter((d) => d.model_type !== "other").map(camelCase)
		);
}

export async function getModelsByPrimarySite() {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_primary_site?order=count.desc&limit=10`
	);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json();
}

export async function getModelsByMutatedGene() {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_mutated_gene?order=count.desc&limit=10`
	);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json().then((d: any[]) => {
		var i;
		for (i = 0; i < d.length; i++) {
			d[i]["markers_with_mutation_data"] = d[i]["mutated_gene"];
			delete d[i]["mutated_gene"];
		}

		return d;
	});
}

export async function getModelsByPatientSex() {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_patient_sex?order=count.desc`
	);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json();
}

export async function getModelsByTumourType() {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_tumour_type?order=count.desc`
	);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json();
}

export async function getModelsByPatientEthnicity() {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_patient_ethnicity?order=count.desc`
	);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json();
}

export async function getModelsByPatientAge() {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_patient_age?order=count.desc`
	);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json();
}

export async function getModelsByDatasetAvailability() {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_dataset_availability?order=count.desc`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d: any[]) =>
		d.reverse().map((i: any) => {
			return {
				id: i.dataset_availability,
				label: i.dataset_availability,
				value: i.count
			};
		})
	);
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
	cancer_system: {
		[key: string]: number;
	};
	patient_age: {
		[key: string]: number;
	};
	model_type: {
		[key: string]: number;
	};
	tumour_type: {
		[key: string]: number;
	};
	patient_ethnicity: {
		[key: string]: number;
	};
};

export async function getProviderDataCounts(
	providerId: string
): Promise<ProviderDataCounts> {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/search_index?data_source=in.("${providerId}")&select=cancer_system,patient_age,model_type,tumour_type,patient_ethnicity`
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

			const cancerSystemCounts = countUniqueValues(d, "cancer_system");
			const patientAgeCounts = countUniqueValues(d, "patient_age");
			const modelTypeCounts = countUniqueValues(d, "model_type");
			const tumourTypeCounts = countUniqueValues(d, "tumour_type");
			const patientEthnicityCounts = countUniqueValues(
				groupedPatientEthnicity,
				"patient_ethnicity"
			);

			return {
				cancer_system: cancerSystemCounts,
				patient_age: patientAgeCounts,
				model_type: modelTypeCounts,
				tumour_type: tumourTypeCounts,
				patient_ethnicity: patientEthnicityCounts
			};
		}
	);
}
