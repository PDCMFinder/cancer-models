import { GitlabRelease } from "../../types/releaseTypes";
import { camelCase } from "../utils/dataUtils";
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
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_patient_sex?order=count.desc&limit=10`
	);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json();
}

export async function getModelsByTumourType() {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_tumour_type?order=count.desc&limit=10`
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
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_patient_age?order=count.desc&limit=10`
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
