import { useRouter } from "next/router";
import {
	IFacetProps,
	IFacetSectionProps,
	IFacetSidebarOperators,
	IFacetSidebarSelection,
} from "../types/Facet.model";
import { SearchResult } from "../types/Search.model";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getSearchOptions() {
	let response = await fetch(`${API_URL}/search_facet?facet_section=eq.search`);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d: any) => {
		return d[0].facet_options
			.filter((option: any) => option !== "")
			.sort((a: String, b: String) =>
				a.toLocaleLowerCase().trim() > b.toLocaleLowerCase().trim() ? 1 : -1
			)
			.map((option: any) => {
				return {
					key: option.replace(/[\W_]+/g, "_").toLowerCase(),
					name: option.trim(),
				};
			});
	});
}

export async function getSearchFacets(
	noOptions = false
): Promise<Array<IFacetSectionProps>> {
	let response = await fetch(
		`${API_URL}/search_facet?facet_section=neq.search&select=facet_section,facet_column,facet_name,facet_example`
	);

	const sections: any = {
		model: {
			key: "model",
			name: "Model",
			facets: [],
		},
		molecular_data: {
			key: "molecular_data",
			name: "Molecular Data",
			facets: [],
		},
		patient_tumour: {
			key: "patient_tumour",
			name: "Patient / Tumor",
			facets: [],
		},
		treatment_drug_dosing: {
			key: "treatment_drug_dosing",
			name: "Treatment / Drug dosing",
			facets: [],
		},
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
		`${API_URL}/search_facet_options?and=(facet_column.eq.${facetColumn}${ilikeClause})&limit=20&order=option.asc`
	);
	return response.json().then((d: Array<any>) => {
		return d.map(({ option }) => {
			return { label: option, value: option };
		});
	});
}

export async function getSearchResults(
	searchValues: Array<string> = [],
	searchFilterSelection: any,
	page: number,
	pageSize: number = 10,
	sortBy: string
): Promise<[number, Array<SearchResult>]> {
	if (!searchFilterSelection && !searchValues.length) {
		return Promise.resolve([0, []]);
	}

	let query =
		searchValues.length > 0
			? `search_terms=ov.{${searchValues.join(",")}}`
			: "";

	for (const filterId in searchFilterSelection) {
		if (searchFilterSelection[filterId].selection?.length) {
			const multiValuedFacets = [
				"search_terms",
				"dataset_available",
				"breast_cancer_biomarkers",
				"treatment_list",
				"model_treatment_list",
				"makers_with_cna_data",
				"makers_with_mutation_data",
				"makers_with_expression_data",
				"makers_with_cytogenetics_data",
			];
			const options = searchFilterSelection[filterId].selection.map(
				(d: string) => '"' + d + '"'
			);
			let apiOperator = "in";

			if (
				multiValuedFacets.includes(filterId) &&
				searchFilterSelection[filterId].operator === "ANY"
			)
				apiOperator = "ov";

			if (searchFilterSelection[filterId].operator === "ALL")
				apiOperator = "cs";

			let optionsQuery =
				apiOperator === "in"
					? `(${options.join(",")})`
					: `{${options.join(",")}}`;

			query += `&${filterId}=${apiOperator}.${optionsQuery}`;
		}
	}

	let response = await fetch(
		`${API_URL}/search_index?${query}&limit=${pageSize}&offset=${
			(page - 1) * pageSize
		}&select=provider_name,patient_age,patient_sex,external_model_id,model_type,data_source,histology,primary_site,collection_site,tumour_type,dataset_available,score&order=${sortBy}.nullslast`,
		{ headers: { Prefer: "count=exact" } }
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d: any) => {
		return [
			parseInt(response.headers.get("Content-Range")?.split("/")[1] || "0"),
			d.map((result: any) => {
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
					score: result.score,
				};
			}),
		];
	});
}

function mapApiFacet(apiFacet: any): IFacetProps {
	const autocompleteFacets = ["external_model_id"];
	const multiValuedFacets = [
		"makers_with_mutation_data",
		"makers_with_cna_data",
		"makers_with_expression_data",
		"makers_with_cytogenetics_data",
		"treatment_list",
		"model_treatment_list",
	];
	let facetType = "check";

	if (autocompleteFacets.includes(apiFacet.facet_column))
		facetType = "autocomplete";

	if (multiValuedFacets.includes(apiFacet.facet_column))
		facetType = "multivalued";

	return {
		facetId: apiFacet.facet_column,
		name: apiFacet.facet_name,
		type: facetType,
		options: apiFacet.facet_options
			? sortOptions(apiFacet.facet_column, apiFacet.facet_options)
			: [],
		placeholder: apiFacet.facet_example,
	};
}

export function getSearchParams(
	searchValues: Array<string>,
	facetSelection: any,
	facetOperators: any
) {
	let search = "";
	if (searchValues?.length > 0) {
		search +=
			"?q=" +
			searchValues.map((o) => encodeURIComponent('"' + o + '"')).join(",");
	}
	let facetString = "";

	Object.keys(facetSelection).forEach((facetSectionKey) => {
		Object.keys(facetSelection[facetSectionKey]).forEach((facetKey) => {
			if (facetSelection[facetSectionKey][facetKey].length === 0) return;
			facetString += `${
				facetString === "" ? "" : " AND "
			}${facetSectionKey}.${facetKey}:${
				facetSelection[facetSectionKey][facetKey]
			}`;
		});
	});
	if (facetString !== "")
		search += `${search === "" ? "?" : "&"}facets=${facetString}`;

	let facetOperatorString = "";
	Object.keys(facetOperators).forEach((facetSectionKey) => {
		Object.keys(facetOperators[facetSectionKey]).forEach((facetKey) => {
			if (
				facetOperators[facetSectionKey][facetKey]?.length === 0 ||
				facetOperators[facetSectionKey][facetKey] === undefined
			)
				return;
			facetOperatorString += `${
				facetOperatorString === "" ? "" : " AND "
			}${facetSectionKey}.${facetKey}:${
				facetOperators[facetSectionKey][facetKey]
			}`;
		});
	});
	if (facetOperatorString !== "")
		search += `${
			search === "" ? "?" : "&"
		}facet.operators=${facetOperatorString}`;
	return search;
}

// A custom hook that builds on useLocation to parse
// the query string for you.
export function useQueryParams() {
	const { query } = useRouter();
	let searchTermValues: Array<string> = [];
	const queryParam = query.q as string,
		queryFacets = query.facets as string,
		queryFacetOperators = query["facet.operators"] as string;

	if (queryParam !== null) {
		searchTermValues = queryParam
			?.split('","')
			.map((o) => o.replace(/["]+/g, ""));
	}
	let facetSelection: any = {};
	const facets = queryFacets?.split(" AND ") || [];
	facets.forEach((facetString) => {
		const [key, values] = facetString.split(":");
		facetSelection[key] = values.split(",");
	});
	let facetOperators: any = {};
	const facetOperatorParam = queryFacetOperators?.split(" AND ") || [];
	facetOperatorParam.forEach((facetString) => {
		const [key, value] = facetString.split(":");
		facetOperators[key] = value;
	});

	return [searchTermValues, facetSelection, facetOperators];
}

export function parseSelectedFacetFromUrl(
	facetsByKey: any
): IFacetSidebarSelection {
	const facetSidebarSelection: IFacetSidebarSelection = {};
	// Object.keys(facetsByKey).forEach((compoundKey: string) => {
	// 	const [sectionKey, facetKey] = compoundKey.split(".");
	// 	const urlFacetSelection = facetsByKey[compoundKey];
	// 	if (!facetSidebarSelection[sectionKey]) {
	// 		facetSidebarSelection[sectionKey] = {};
	// 	}
	// 	facetSidebarSelection[sectionKey][facetKey] = urlFacetSelection || [];
	// });
	return facetSidebarSelection;
}

export function parseOperatorsFromUrl(
	operatorsByKey: any
): IFacetSidebarOperators {
	const facetSidebarSelection: IFacetSidebarOperators = {};
	Object.keys(operatorsByKey).forEach((compoundKey: string) => {
		const [sectionKey, facetKey] = compoundKey.split(".");
		const urlOperator = operatorsByKey[compoundKey];
		if (!facetSidebarSelection[sectionKey]) {
			facetSidebarSelection[sectionKey] = {};
		}
		facetSidebarSelection[sectionKey][facetKey] = urlOperator;
	});
	return facetSidebarSelection;
}

function sortOptions(facet_column, list) {
	if (facet_column === "patient_age") {
		return list.sort((a, b) => {
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
