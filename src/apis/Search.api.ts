import {
	FacetOperator,
	FacetProps,
	FacetSectionProps
} from "../types/Facet.model";
import { SearchResult } from "../types/Search.model";
import { ethnicityCategories } from "../utils/collapseEthnicity";
import { camelCase } from "../utils/dataUtils";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getSearchFacets(): Promise<FacetSectionProps[]> {
	let response = await fetch(
		`${API_URL}/search_facet?facet_section=neq.search&select=facet_section,facet_column,facet_name,facet_example,facet_type,is_boolean,facet_description&order=index`
	);

	const sections: any = {
		model: {
			key: "model",
			name: "Model",
			facets: []
		},
		patient_tumour: {
			key: "patient_tumour",
			name: "Patient / Tumor",
			facets: []
		},
		molecular_data: {
			key: "molecular_data",
			name: "Molecular Data",
			facets: []
		},
		patient_treatment: {
			key: "patient_treatment",
			name: "Patient Treatment",
			facets: []
		},
		model_treatment: {
			key: "model_treatment",
			name: "Model Treatment",
			facets: []
		}
	};

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json().then((d: Array<any>) => {
		d.forEach((element) => {
			const section = sections[element.facet_section];
			if (section) section.facets.push(mapApiFacet(element));
		});
		return Object.values(sections);
	});
}

export async function getFacetOperators(): Promise<FacetOperator[]> {
	try {
		const response = await fetch(
			`${API_URL}/search_facet?select=facet_column,any_operator,all_operator`
		);
		if (!response.ok) {
			throw new Error(`Network response was not ok: ${response.statusText}`);
		}
		const data = await response.json();
		return data.map((d: FacetOperator) => camelCase(d));
	} catch (error) {
		console.error("Error fetching facet operators:", error);
		throw new Error("Failed to fetch facet operators");
	}
}

export async function getFacetOptions(facetColumn: string) {
	let response = await fetch(
		`${API_URL}/search_facet?facet_column=eq.${facetColumn}`
	);
	return response.json().then((d: Array<any>) => {
		const mappedFacet = mapApiFacet(d[0]);
		return mappedFacet.options;
	});
}

export async function autoCompleteFacetOptions(
	facetColumn: string,
	text: string
) {
	const ilikeClause = text.length > 0 ? `, option.ilike."*${text}*"` : "";
	let response = await fetch(
		`${API_URL}/search_facet_options?and=(facet_column.eq.${facetColumn}${ilikeClause})&order=option.asc`
	);
	return response.json().then((d: Array<any>) => {
		return d.map(({ option }) => {
			return { label: option, value: option };
		});
	});
}

export async function getSearchResults(
	searchValues: string[] = [],
	searchFilterSelection: any,
	pageSize: number = 10,
	sortBy: string,
	facetOperators: FacetOperator[]
): Promise<[number, SearchResult[]]> {
	if (!searchFilterSelection && !searchValues.length) {
		return Promise.resolve([0, []]);
	}
	let query =
		searchValues.length > 0
			? `search_terms=ov.{${searchValues.join(",")}}`
			: "";

	for (const facetId in searchFilterSelection) {
		if (
			searchFilterSelection[facetId].selection?.length &&
			facetId !== "page"
		) {
			const currentFacetOperators = facetOperators.find(
				(obj) => obj.facetColumn === facetId
			);
			let options: string[] = searchFilterSelection[facetId].selection.map(
				(d: string) => `"${d}"`
			);

			// Handle filtering of subcategories while selecting top category
			if (facetId === "patient_ethnicity") {
				for (let key in ethnicityCategories) {
					if (searchFilterSelection[facetId].selection.includes(key)) {
						options = ethnicityCategories[key].map((d: string) => `"${d}"`);
					}
				}
			}

			let apiOperator;

			if (searchFilterSelection[facetId].operator === "ANY")
				apiOperator = currentFacetOperators?.anyOperator ?? "ov";

			if (searchFilterSelection[facetId].operator === "ALL")
				apiOperator = currentFacetOperators?.allOperator ?? "cs";

			let optionsQuery =
				apiOperator === "in"
					? `(${encodeURIComponent(options.join(","))})`
					: `{${encodeURIComponent(options.join(","))}}`;

			query += `&${facetId}=${apiOperator}.${optionsQuery}`;
		}
	}

	let response = await fetch(
		`${API_URL}/search_index?${query}&limit=${pageSize}&offset=${
			Math.max(searchFilterSelection["page"].selection - 1, 0) * pageSize
		}&select=provider_name,patient_age,patient_sex,external_model_id,model_type,data_source,histology,primary_site,collection_site,tumour_type,dataset_available,scores,model_availability_boolean&order=${sortBy}`,
		{ headers: { Prefer: "count=exact" } }
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d: any) => {
		return [
			parseInt(response.headers.get("Content-Range")?.split("/")[1] || "0"),
			d.map((result: any) => {
				const score =
					(result.model_type === "PDX"
						? result.scores.pdx_metadata_score
						: result.scores.in_vitro_metadata_score) ?? 0;

				return {
					pdcmId: result.external_model_id,
					sourceId: result.data_source,
					datasource: "",
					providerName: result.provider_name,
					histology: result.histology,
					primarySite: result.primary_site,
					collectionSite: result.collection_site,
					tumourType: result.tumour_type,
					dataAvailable: result.dataset_available,
					modelType: result.model_type,
					patientAge: result.patient_age,
					patientSex: result.patient_sex,
					score,
					modelAvailable: result.model_availability_boolean
				};
			})
		];
	});
}

function mapApiFacet(apiFacet: any): FacetProps {
	return {
		facetId: apiFacet.facet_column,
		name: apiFacet.facet_name,
		type: apiFacet.facet_type,
		options: apiFacet.facet_options
			? sortOptions(apiFacet.facet_column, apiFacet.facet_options)
			: [],
		placeholder: apiFacet.facet_example,
		isBoolean: apiFacet.is_boolean,
		description: apiFacet.facet_description
	};
}

function sortOptions(facet_column: string, list: string[]) {
	if (facet_column === "patient_age") {
		return list.sort((a: string, b: string) => {
			if (a.includes("months")) return -1;
			if (b.includes("specified")) return -1;
			let aa = a.split(" - ");
			let bb = b.split(" - ");
			if (+aa[0] > +bb[0]) return 1;
			else if (+aa[0] < +bb[0]) return -1;
			else return 0;
		});
	}
	let endList = list.filter(
		(str) =>
			str.toLocaleLowerCase().includes("other") ||
			str.toLocaleLowerCase().includes("not specified")
	);
	let sortedList = list
		.filter((str) => !endList.includes(str))
		.sort((a, b) => a.localeCompare(b));
	return sortedList.concat(endList);
}

export async function getDataSourcesByProject(projectName: string) {
	let response = await fetch(
		`${API_URL}/search_index?project_name=${
			projectName === "Other" ? "is.null" : "in.(%22" + projectName + "%22)"
		}&select=data_source,provider_name`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response
		.json()
		.then((d: { data_source: string; provider_name: string }[]) => d);
}
