import { camelCase } from "../utils/dataUtils";
import { IGitlabRelease } from "../../types/releaseTypes";
import parseRelease from "../utils/parseRelease";
import {
	ICancerHierarchy,
	IModelByCancerSystem,
	IModelByTreatment,
	IModelByType,
	IModelByMutatedGene,
	IMutatedGene,
	IModelByPatientGender,
	IModelByTumourType,
	IModelsByPatientEthnicity,
	IModelByPatientAge,
	IParsedRelease,
	IModelCount,
} from "../types/AggregatedData.model";

export async function getCancerHierarchy(): Promise<ICancerHierarchy> {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_cancer`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d: IModelByCancerSystem[]) => {
		let hierarchy: {
			[key: string]: ICancerHierarchy["children"][0];
		} = {};

		d.filter(
			(i) =>
				i.cancer_system !== null &&
				i.cancer_system !== i.histology &&
				i.cancer_system !== "Unclassified"
		).forEach((element) => {
			if (hierarchy[element.cancer_system] === undefined) {
				hierarchy[element.cancer_system] = {
					search_terms: element.cancer_system.replace("Cancer", ""),
					children: [] as ICancerHierarchy["children"][0]["children"],
				};
			}
			hierarchy[element.cancer_system].children.push({
				search_terms: element.histology,
				count: element.count,
			});
		});

		return {
			search_terms: "CancerModels.Org Models",
			children: Object.values(hierarchy),
		};
	});
}

export async function getModelsByTreatment(): Promise<IModelByTreatment[]> {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_treatment?order=count.desc&limit=20`
	);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json().then((d) => {
		var i;
		for (i = 0; i < d.length; i++) {
			d[i]["treatment_list"] = d[i]["treatment"];
			delete d[i].treatment;
		}

		return d;
	});
}

export async function getModelsByType(): Promise<IModelByType[]> {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_type?order=count.desc`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d) => d.map((i: IModelByType) => camelCase(i)));
}

export async function getModelsByMutatedGene(): Promise<IModelByMutatedGene[]> {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_mutated_gene?order=count.desc&limit=10`
	);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json().then((d: IMutatedGene[]) => {
		var i;
		for (i = 0; i < d.length; i++) {
			d[i]["markers_with_mutation_data"] = d[i]["mutated_gene"];
			delete d[i]["mutated_gene"];
		}

		return d as IModelByMutatedGene[];
	});
}

export async function getModelsByPatientGender(): Promise<
	IModelByPatientGender[]
> {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_patient_sex?order=count.desc&limit=10`
	);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json();
}

export async function getModelsByTumourType(): Promise<IModelByTumourType[]> {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_tumour_type?order=count.desc&limit=10`
	);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json();
}

export async function getModelsByPatientEthnicity(): Promise<
	IModelsByPatientEthnicity[]
> {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_patient_ethnicity?order=count.desc`
	);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json();
}

export async function getModelsByPatientAge(): Promise<IModelByPatientAge[]> {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_patient_age?order=count.desc&limit=10`
	);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json();
}

export async function getDataReleaseInformation(): Promise<IParsedRelease[]> {
	let response = await fetch(
		"https://gitlab.ebi.ac.uk/api/v4/projects/1629/releases",
		{
			headers: {
				"PRIVATE-TOKEN": "glpat-gbQzKFxHTWyp_jZhP5gE",
			},
		}
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d) => {
		let parsedReleases: IParsedRelease[] = [];

		d.forEach(async (release: IGitlabRelease) => {
			parsedReleases.push(await parseRelease(release, "Data"));
		});

		return parsedReleases;
	});
}

export async function getLatestDataReleaseInformation(): Promise<IParsedRelease> {
	// pdxfinder-data repo (data)
	let response = await fetch(
		"https://gitlab.ebi.ac.uk/api/v4/projects/1629/releases?per_page=1",
		{
			headers: {
				"PRIVATE-TOKEN": "glpat-gbQzKFxHTWyp_jZhP5gE",
			},
		}
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d: IGitlabRelease[]) => parseRelease(d[0]));
}

export async function getUIReleaseInformation(): Promise<IParsedRelease[]> {
	// cancer-models repo (ui)
	let response = await fetch(
		"https://gitlab.ebi.ac.uk/api/v4/projects/4135/releases",
		{
			headers: {
				"PRIVATE-TOKEN": "glpat-SJR6QYyByDoaKp-wCRxL",
			},
		}
	);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json().then((d) => {
		let parsedReleases: IParsedRelease[] = [];

		d.forEach(async (release: IGitlabRelease) => {
			parsedReleases.push(await parseRelease(release, "UI"));
		});

		return parsedReleases;
	});
}

export async function getModelCount(): Promise<IModelCount["value"]> {
	let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/info`);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response
		.json()
		.then(
			(d) => d.filter((el: IModelCount) => el.key === "total_models")[0].value
		);
}

export async function getProviderCount(): Promise<string | undefined> {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/provider_group?select=id`,
		{
			headers: {
				"Range-Unit": "items",
				Range: "0-24",
				Prefer: "count=exact",
			},
		}
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.headers.get("Content-range")?.split("/")[1];
}
