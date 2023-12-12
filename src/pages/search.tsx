import SearchResults from "../components/SearchResults/SearchResults";
import Select from "../components/Input/Select";
import React, { ChangeEvent, useEffect, useReducer, useState } from "react";
import styles from "./search.module.scss";
import Label from "../components/Input/Label";
import SearchFilters from "../components/SearchFilters/SearchFilters";
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
import Button from "../components/Button/Button";
import SearchBar from "../components/SearchBar/SearchBar";
import breakPoints from "../utils/breakpoints";
import useWindowDimensions from "../hooks/useWindowDimensions";
import ShowHide from "../components/ShowHide/ShowHide";
import Card from "../components/Card/Card";
import CloseIcon from "../components/CloseIcon/CloseIcon";
import { NextPage } from "next/types";
import dynamic from "next/dynamic";

const DynamicModal = dynamic(import("../components/Modal/Modal"), {
	loading: () => (
		<div style={{ height: "300px" }}>
			<Loader />
		</div>
	),
	ssr: false,
});

export interface onFilterChangeType {
	type: "add" | "remove" | "clear" | "toggleOperator" | "init" | "substitute";
}

const sortByOptions = [
		{
			value:
				"scores->>data_score.desc.nullslast,scores->>pdx_metadata_score.desc.nullslast",
			text: "Data available",
		},
		{ value: "external_model_id.asc.nullslast", text: "Model Id: A to Z" },
		{ value: "external_model_id.desc.nullslast", text: "Model Id: Z to A" },
		{
			value: "scores->>pdx_metadata_score.asc.nullslast",
			text: "Metadata: Ascending",
		},
		{
			value: "scores->>pdx_metadata_score.desc.nullslast",
			text: "Metadata: Descending",
		},
	],
	resultsPerPage = 10;

const Search: NextPage = () => {
	const { windowWidth = 0 } = useWindowDimensions();
	const bpLarge = breakPoints.large;
	const [showFilters, setShowFilters] = useState<boolean>(false);
	const [sortBy, setSortBy] = useState<string>(sortByOptions[0].value);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [hasSelection, setHasSelection] = useState<boolean>(false);
	const [modelsToCompare, setModelsToCompare] = useState<string[]>([]);
	const router = useRouter();
	const ignoredFilterValues = ["page", "search_terms"];

	const changePage = (page: number) => {
		setCurrentPage(page);
		searchFilterDispatch({
			type: "substitute",
			operator: "",
			filterId: "page",
			selection: page.toString(),
		});
		window.scrollTo(0, 350);
	};

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
			const {
				type,
				filterId,
				selection,
				initialState: actionInitialState,
			} = action;
			if (type === "init") {
				if (actionInitialState) return actionInitialState;

				for (let key in state) {
					if (key !== "search_terms") {
						newState[key].selection = [];
						newState[key].operator = "ANY";
					}
				}
			}

			if (type === "add") {
				newState[filterId].selection = [
					// @ts-ignore
					...new Set(state[filterId].selection.concat([selection])),
				];
			}

			if (type === "remove") {
				newState[filterId].selection = state[filterId].selection.filter(
					(item: string) => item !== selection
				);
			}

			if (type === "substitute") {
				newState[filterId].selection = selection;
			}

			if (type === "clear") {
				newState[filterId].selection = [];
				newState[filterId].operator = "ANY";
			}

			if (type === "toggleOperator") {
				newState[filterId].operator =
					state[filterId].operator === "ANY" ? "ALL" : "ANY";
			}

			if (filterId !== "page") {
				setCurrentPage(1);
				newState["page"].selection = 1;
			}

			return newState;
		},
		null
	);

	const searchFacetSectionsQuery = useQuery({
		queryKey: "search-facet-sections",
		queryFn: () => getSearchFacets(),
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

			const addInitialSearchFilter = (id: string) => {
				initialSearchFilterState[id] = stateFromUrl[id]
					? stateFromUrl[id]
					: {
							operator: "ANY",
							selection: [],
					  };
			};

			data?.forEach((section) =>
				section.facets.forEach((facet) => {
					addInitialSearchFilter(facet.facetId);
				})
			);

			ignoredFilterValues.forEach((id) => addInitialSearchFilter(id));

			searchFilterDispatch({
				type: "init",
				initialState: initialSearchFilterState,
				selection: "",
				filterId: "",
				operator: "",
			});
		},
		refetchOnWindowFocus: true,
		// staleTime: 120000,
		cacheTime: 100,
	});
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

	const searchResultsQuery = useQuery({
		queryKey: [
			"search-results",
			{
				searchValues: [],
				searchFilterState,
				resultsPerPage,
				sortBy,
			},
		],
		queryFn: async () =>
			getSearchResults([], searchFilterState, resultsPerPage, sortBy),
	});

	useEffect(() => {
		if (searchFilterState === null) return;
		let filterValues: string[] = [];
		for (const filterId in searchFilterState) {
			if (searchFilterState[filterId].selection.length) {
				if (filterId === "page") {
					if (Number(searchFilterState[filterId].selection) > 1) {
						filterValues.push(
							`${filterId}:${searchFilterState[filterId].selection}`
						);
						setCurrentPage(Number(searchFilterState[filterId].selection));
					}
				} else {
					const operator =
						searchFilterState[filterId].operator !== "ANY"
							? `.${searchFilterState[filterId].operator}`
							: "";
					filterValues.push(
						`${filterId}${operator}:${searchFilterState[
							filterId
						].selection.join(",")}`
					);
				}
			}
		}
		if (filterValues.length) {
			// Check if only filter is page or search terms, don't show clear button if so
			const onlyIgnoredFilter = ignoredFilterValues.some((value) =>
				filterValues.every((filterValue) => filterValue.includes(value))
			);

			if (onlyIgnoredFilter) {
				setHasSelection(false);
			} else {
				setHasSelection(true);
			}
			router.replace(
				{
					query: { ...router.query, filters: filterValues.join(" AND ") },
				},
				undefined,
				{ scroll: false }
			);
		} else {
			setHasSelection(false);
			router.replace("/search", undefined, { shallow: true });
		}
	}, [searchFilterState]);

	const compareModel = (id: string): void => {
		if (modelsToCompare.includes(id)) {
			setModelsToCompare((prev) => prev.filter((model) => model !== id));
		} else {
			if (modelsToCompare.length === 4) {
				alert(
					"You've reached the maximum amount of models to compare. Remove a model to add another."
				);
			} else {
				setModelsToCompare((prev) => [...prev, id]);
			}
		}
	};

	const compareModels = () => {
		if (modelsToCompare.length > 1) {
			let compareModelsQuery = modelsToCompare.join("+");
			window.open(`/compare?models=${compareModelsQuery}`, "_blank");

			setModelsToCompare([]);
		} else {
			alert("Please select at least 2 models to compare");
		}
	};

	let totalResults = searchResultsQuery.data ? searchResultsQuery.data[0] : 1;

	const ClearFilterButtonComponent = (
		<Button
			style={{ color: "#b75858" }}
			className="m-0"
			priority="secondary"
			color="dark"
			disabled={!hasSelection}
			onClick={() =>
				searchFilterDispatch({
					type: "init",
					selection: "",
					filterId: "",
					operator: "",
				})
			}
		>
			Clear
		</Button>
	);
	const SearchFiltersComponent = searchFacetSectionsQuery.data ? (
		<SearchFilters
			data={searchFacetSectionsQuery.data ?? []}
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
	);
	const ModalSearchFiltersComponent = (
		<DynamicModal
			modalWidth="100"
			verticalAlign="top"
			handleClose={() => setShowFilters(false)}
		>
			<Card
				className="bg-white"
				header={
					<div className="d-flex justify-content-between align-center">
						{ClearFilterButtonComponent}
						<CloseIcon color="dark" onClick={() => setShowFilters(false)} />
					</div>
				}
				footer={
					<div className="d-flex justify-content-between align-center">
						{ClearFilterButtonComponent}
						<CloseIcon color="dark" onClick={() => setShowFilters(false)} />
					</div>
				}
				contentClassName="p-0"
			>
				{SearchFiltersComponent}
			</Card>
		</DynamicModal>
	);

	let modelCount = useQuery("modelCount", () => {
		return getModelCount();
	});

	return (
		<>
			<header className={`py-5 ${styles.Search_header}`}>
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h1 className="h2 text-white text-center mt-0">
								Search{" "}
								{modelCount && modelCount.data
									? `over ${parseFloat(modelCount.data!).toLocaleString()}`
									: ""}{" "}
								cancer models
							</h1>
						</div>
					</div>
					<div className="row">
						<div className="col-12 col-md-10 col-lg-6 offset-md-1 offset-lg-3">
							<SearchBar
								id="searchBar"
								name="searchBar-name"
								isMulti
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
										{`Showing ${(currentPage - 1) * resultsPerPage + 1} to 
										${
											totalResults <
											(currentPage - 1) * resultsPerPage + resultsPerPage
												? totalResults
												: (currentPage - 1) * resultsPerPage + resultsPerPage
										} 
										of ${totalResults.toLocaleString()} results`}
									</p>
								</div>
								<div className="col-12 col-md-6">
									<div className="d-flex align-center justify-content-md-end">
										<Label
											label="Sort by:"
											forId="sortBy"
											name="sortBy-name"
											className="mr-1"
										/>
										<Select
											id="sortBy"
											options={sortByOptions}
											className="w-auto mb-0"
											onChange={(e: ChangeEvent<HTMLSelectElement>) => {
												setSortBy(e.target.value);
												changePage(1);
											}}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12 col-lg-3">
							<div className="row align-center mb-1">
								<ShowHide hideOver={bpLarge} windowWidth={windowWidth || 0}>
									<div className="col-6 col-md-8 col-lg-6">
										<Button
											priority="secondary"
											color="dark"
											onClick={() => setShowFilters(true)}
											className="align-center d-flex"
										>
											<>
												Filters
												{hasSelection && (
													<span
														className={`ml-1 ${styles.Search_filterNotification}`}
													></span>
												)}
											</>
										</Button>
									</div>
								</ShowHide>
								<ShowHide showOver={bpLarge} windowWidth={windowWidth || 0}>
									<div className="col-6 col-md-8 col-lg-6">
										<h2 className="h3 m-0">Filters</h2>
									</div>
									<div className="col-6 col-md-4 col-lg-6 d-flex justify-content-end">
										{ClearFilterButtonComponent}
									</div>
								</ShowHide>
							</div>
							{windowWidth < bpLarge
								? showFilters && ModalSearchFiltersComponent
								: SearchFiltersComponent}
						</div>
						<div className="col-12 col-lg-9">
							{searchResultsQuery.data ? (
								<SearchResults
									compareModel={compareModel}
									modelsToCompare={modelsToCompare}
									data={searchResultsQuery.data[1]}
								/>
							) : (
								<SearchResultsLoader amount={resultsPerPage} />
							)}
							<div className="row">
								<div className="col-12">
									<Pagination
										totalPages={
											totalResults !== 0
												? Math.ceil(totalResults / resultsPerPage)
												: 1
										}
										currentPage={currentPage}
										onPageChange={(page: number) => changePage(page)}
									/>
								</div>
							</div>
						</div>
					</div>
					{modelsToCompare[0] ? (
						<div className="row position-sticky bottom-0 mt-5">
							<div className="col-10 offset-1">
								<Card
									className="bg-primary-quaternary mb-2"
									contentClassName="py-2"
								>
									<div className="d-flex align-center justify-content-between">
										<p className="m-0">
											<b>Compare up to 4 models: </b>
											{modelsToCompare.map((model, idx) => {
												const clearX = (
													<sup>
														<Button
															color="dark"
															priority="secondary"
															className="text-underline m-0 ml-1"
															style={{ padding: ".2rem .3rem" }}
															onClick={() =>
																setModelsToCompare((prev) =>
																	prev.filter(
																		(prevModel) => prevModel !== model
																	)
																)
															}
														>
															X
														</Button>
													</sup>
												);

												if (idx === 0) {
													return (
														<React.Fragment key={model}>
															{model}
															{clearX}
														</React.Fragment>
													);
												}

												return (
													<React.Fragment key={model}>
														{" "}
														<span className="text-primary-tertiary">
															+
														</span>{" "}
														{model}
														{clearX}
													</React.Fragment>
												);
											})}
										</p>
										<div className="d-flex">
											<Button
												color="dark"
												priority="primary"
												className="my-1 py-1"
												onClick={() => compareModels()}
											>
												Compare
											</Button>
											<Button
												color="dark"
												priority="secondary"
												className="my-1 ml-1 py-1"
												onClick={() => setModelsToCompare([])}
											>
												Clear
											</Button>
										</div>
									</div>
								</Card>
							</div>
						</div>
					) : null}
				</div>
			</section>
		</>
	);
};

export default Search;
