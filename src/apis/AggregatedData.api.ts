import { camelCase } from "../utils/dataUtils";

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
					name: element.cancer_system.replace("Cancer", ""),
					children: [],
				};
			}
			hierarchy[element.cancer_system].children.push({
				name: element.histology,
				count: element.count,
			});
		});
		return { name: "PDCM Models", children: Object.values(hierarchy) };
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
		.then((d: Array<any>) => d.reverse().map((i: any) => camelCase(i)));
}

export async function getModelsByTreatment() {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_treatment?order=count.desc&limit=20`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response
		.json()
		.then((d: Array<any>) => d.reverse().map((i: any) => camelCase(i)));
}

export async function getModelsByType() {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_type?order=count.desc&limit=20`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response
		.json()
		.then((d: Array<any>) => d.map((i: any) => camelCase(i)));
}

export async function getModelsByDatasetAvailability() {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/models_by_dataset_availability?order=count.desc`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d: Array<any>) =>
		d.reverse().map((i: any) => {
			return {
				id: i.dataset_availability,
				label: i.dataset_availability,
				value: i.count,
			};
		})
	);
}

export async function getDataReleaseInformation() {
	let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/release_info`);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d: Array<any>) => d[0]);
}

export async function getModelCount() {
	let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search_index`);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.headers.get("Content-range")?.split("/")[1];
}
