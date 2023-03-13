import type { NextPage } from "next";
import Form from "../components/Form/Form";
import InputAndLabel from "../components/Input/InputAndLabel";
import SearchResults from "../components/SearchResults/SearchResults";
import Select from "../components/Input/Select";
import React, { useEffect, useReducer, useState } from "react";
import styles from "./search.module.scss";
import Label from "../components/Input/Label";
import SearchFilters from "../components/SearchFilters/SearchFilters-mobile";
import { getModelCount } from "../apis/AggregatedData.api";
import {
	getSearchFacets,
	getSearchResults,
	getFacetOptions,
} from "../apis/Search.api";
import { useQueries, useQuery } from "react-query";
import Loader from "../components/Loader/Loader";
import SearchResultsLoader from "../components/SearchResults/SearchResultsLoader";
import Pagination from "../components/Pagination/Pagination";
import { useRouter } from "next/router";

export interface onFilterChangeType {
	type: "add" | "remove" | "clear" | "toggleOperator" | "init";
}

const sortByOptions = [
		{
			value: "model_dataset_type_count.desc",
			text: "Amount of data available",
		},
		{ value: "external_model_id.asc", text: "Model Id: A to Z" },
		{ value: "external_model_id.desc", text: "Model Id: Z to A" },
	],
	resultsPerPage = 10;

const Search: NextPage = () => {
	const router = useRouter();
	const [sortBy, setSortBy] = useState<string>(sortByOptions[0].value);

	const [currentPage, setCurrentPage] = useState<number>(1);

	const [searchFilterState, searchFilterDispatch] = useReducer(
		(
			state: any,
			action: {
				type: onFilterChangeType["type"];
				operator: string;
				filterId: string;
				selection: string;
				initialState?: any;
			}
		) => {
			const newState = { ...state };
			const { type, filterId, selection, initialState } = action;
			setCurrentPage(1);
			if (type === "init") {
				return initialState;
			}
			if (type === "add") {
				newState[filterId].selection = [
					...new Set(state[filterId].selection.concat([selection])),
				];
			}
			if (type === "remove") {
				newState[filterId].selection = state[filterId].selection.filter(
					(item: string) => item !== selection
				);
			}

			if (type === "clear") {
				newState[filterId].selection = [];
				newState[filterId].operator = "ANY";
			}

			if (type === "toggleOperator") {
				newState[filterId].operator =
					state[filterId].operator === "ANY" ? "ALL" : "ANY";
			}

			return newState;
		},
		null
	);

	const searchFacetSectionsQuery = useQuery(
		"search-facet-sections",
		() => getSearchFacets(),
		{
			onSuccess(data) {
				const initialSearchFilterState: any = {};
				const stateFromUrl: any = {};
				const filters = router.query["filters"]
					? (router.query["filters"] as string).split(" AND ")
					: [];
				filters.forEach((filterStr) => {
					const filterOperatorStr = filterStr.split(":")[0];
					const filterId = filterOperatorStr.split(".")[0];
					const operator =
						filterOperatorStr.split(".").length > 1 ? "ALL" : "ANY";
					const selection = filterStr.split(":")[1].split(",");
					stateFromUrl[filterId] = { operator, selection };
				});

				data?.forEach((section) =>
					section.facets.forEach(
						(facet) =>
							(initialSearchFilterState[facet.facetId] = stateFromUrl[
								facet.facetId
							]
								? stateFromUrl[facet.facetId]
								: {
										operator: "ANY",
										selection: [],
								  })
					)
				);
				searchFilterDispatch({
					type: "init",
					initialState: initialSearchFilterState,
					selection: "",
					filterId: "",
					operator: "",
				});
			},
		}
	);
	const searchFacetSections = searchFacetSectionsQuery.data;

	const searchFacetQueries = useQueries(
		searchFacetSections
			? searchFacetSections
					.flatMap((facetSection) => facetSection.facets)
					.map((facet) => {
						const fn = () => getFacetOptions(facet?.facetId || "");
						return {
							queryKey: ["facet", facet?.facetId],
							queryFn: ["multivalued", "autocomplete"].includes(
								facet?.type || ""
							)
								? () => []
								: fn,
						};
					})
			: []
	);
	searchFacetSections
		?.flatMap((facetSection) => facetSection.facets)
		.forEach((facet, index) => {
			if (
				facet &&
				!searchFacetQueries[index].isLoading &&
				!searchFacetQueries[index].isError &&
				searchFacetQueries[index].data
			) {
				facet.options = searchFacetQueries[index].data || [];
			} else if (facet && searchFacetQueries[index].isLoading) {
				facet.loading = true;
			}
		});

	const searchResultsQuery = useQuery(
		[
			"search-results",
			{
				searchValues: [],
				searchFilterState,
				resultsPerPage,
				currentPage,
				sortBy,
			},
		],
		async () =>
			getSearchResults(
				[],
				searchFilterState,
				currentPage,
				resultsPerPage,
				sortBy
			)
	);

	useEffect(() => {
		if (searchFilterState === null) return;
		let filterValues: string[] = [];
		for (const filterId in searchFilterState) {
			if (searchFilterState[filterId].selection.length) {
				const operator =
					searchFilterState[filterId].operator !== "ANY"
						? `.${searchFilterState[filterId].operator}`
						: "";
				filterValues.push(
					`${filterId}${operator}:${searchFilterState[filterId].selection.join(
						","
					)}`
				);
			}
		}
		if (filterValues.length) {
			router.replace({
				query: { ...router.query, filters: filterValues.join(" AND ") },
			});
		} else {
			router.replace("/search", undefined, { shallow: true });
		}
	}, [searchFilterState]);

	let modelCountQuery = useQuery("modelCountQuery", () => {
		return getModelCount();
	});
	let totalResults = searchResultsQuery.data ? searchResultsQuery.data[0] : 1;

	return (
		<>
			<header className={`py-5 ${styles.Search_header}`}>
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h1 className="h2 text-white text-center mt-0">
								Search over{" "}
								{
									modelCountQuery.data
										? parseFloat(modelCountQuery.data).toLocaleString()
										: "6,998" //placeholder while we fetch api data
								}{" "}
								cancer models
							</h1>
						</div>
					</div>
					<div className="row">
						<div className="col-12 col-md-10 col-lg-6 offset-md-1 offset-lg-3">
							<Form>
								<InputAndLabel
									label={`Search over ${
										modelCountQuery.data
											? parseFloat(modelCountQuery.data).toLocaleString()
											: "6,998" //placeholder while we fetch api data
									} cancer models`}
									name="search"
									type="text"
									placeholder="Cancer diagnosis eg. Melanoma"
									labelClassName="hideElement-accessible"
									className="mb-0"
									onChange={() => {}}
									value={""}
								/>
								{/* <div className="text-right">
									{searchInputContent && (
										<Button
											priority="secondary"
											color="white"
											className="text-white link-text mt-2 mb-0"
											onClick={() => setSearchInputContent("")}
										>
											Clear
										</Button>
									)}
								</div> */}
							</Form>
						</div>
					</div>
				</div>
			</header>
			<section>
				<div className="container">
					<div className="row">
						<div className="col-12 col-lg-9 offset-lg-3">
							<div className="row mb-3 align-center">
								<div className="col-12 col-md-6">
									<p className="mb-md-0">
										{null
											? `Showing ${(currentPage - 1) * resultsPerPage + 1} to 
										${
											totalResults <
											(currentPage - 1) * resultsPerPage + resultsPerPage
												? totalResults
												: (currentPage - 1) * resultsPerPage + resultsPerPage
										} 
										of ${totalResults} results`
											: null}
									</p>
								</div>
								<div className="col-12 col-md-6">
									<div className="d-flex align-center justify-content-md-end">
										<Label label="Sort by:" name="sortBy" className="mr-1" />
										<Select
											id="sortBy"
											options={sortByOptions}
											className="w-auto mb-0"
											onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
												setSortBy(e.target.value)
											}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12 col-lg-3">
							<h3 className="mt-0">Filters</h3>
							{searchFacetSectionsQuery.data ? (
								<SearchFilters
									data={searchFacetSectionsQuery.data}
									selection={searchFilterState}
									onFilterChange={(filterId, selection, operator, type) => {
										searchFilterDispatch({
											filterId,
											selection,
											operator,
											type,
										});
									}}
								/>
							) : (
								<Loader style={{ height: "auto !important" }} />
							)}
						</div>
						<div className="col-12 col-lg-9">
							<div className="row">
								<div className="col-12">
									{searchResultsQuery.data ? (
										<SearchResults data={searchResultsQuery.data[1]} />
									) : (
										<SearchResultsLoader amount={resultsPerPage} />
									)}
								</div>
								<div className="col-12">
									<Pagination
										totalPages={
											totalResults !== 0
												? Math.ceil(totalResults / resultsPerPage)
												: 1
										}
										currentPage={currentPage}
										onPageChange={(page: number) => {
											setCurrentPage(page);
											window.scrollTo(0, 350);
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Search;
