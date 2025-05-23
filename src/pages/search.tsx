import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import React, {
	ChangeEvent,
	useEffect,
	useReducer,
	useRef,
	useState
} from "react";
import { useQueries, useQuery, useQueryClient } from "react-query";
import { getModelCount } from "../apis/AggregatedData.api";
import {
	getFacetOperators,
	getFacetOptions,
	getSearchFacets,
	getSearchResults
} from "../apis/Search.api";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import FloatingButton from "../components/FloatingWidget/FloatingButton";
import CloseIcon from "../components/Icons/CloseIcon/CloseIcon";
import Label from "../components/Input/Label";
import Select from "../components/Input/Select";
import Loader from "../components/Loader/Loader";
import Pagination from "../components/Pagination/Pagination";
import SearchBar from "../components/SearchBar/SearchBar";
import SearchFilters from "../components/SearchFilters/SearchFilters";
import SearchResults from "../components/SearchResults/SearchResults";
import SearchResultsLoader from "../components/SearchResults/SearchResultsLoader";
import ShowHide from "../components/ShowHide/ShowHide";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { FacetProps } from "../types/Facet.model";
import breakPoints from "../utils/breakpoints";
import { searchTourSteps } from "../utils/tourSteps";
import styles from "./search.module.scss";

const DynamicModal = dynamic(import("../components/Modal/Modal"), {
	loading: () => (
		<div style={{ height: "300px" }}>
			<Loader />
		</div>
	),
	ssr: false
});

export type onFilterChangeType = {
	type: "add" | "remove" | "clear" | "toggleOperator" | "init" | "substitute";
};

const ANY = "ANY",
	ALL = "ALL";

type State = {
	[key: string]: { operator: typeof ANY | typeof ALL; selection: any[] };
};

const sortByOptions = [
		{
			value:
				"scores->>data_score.desc.nullslast,scores->>pdx_metadata_score.desc.nullslast,scores->>in_vitro_metadata_score.desc.nullslast",
			text: "Data available"
		},
		{ value: "external_model_id.asc.nullslast", text: "Model Id: A to Z" },
		{ value: "external_model_id.desc.nullslast", text: "Model Id: Z to A" },
		{
			value:
				"scores->>pdx_metadata_score.asc.nullslast,scores->>in_vitro_metadata_score.asc.nullslast",
			text: "Metadata: Ascending"
		},
		{
			value:
				"scores->>pdx_metadata_score.desc.nullslast,scores->>in_vitro_metadata_score.desc.nullslast",
			text: "Metadata: Descending"
		}
	],
	resultsPerPage = 10;

const Search: NextPage = () => {
	const { windowWidth = 0 } = useWindowDimensions();
	const bpLarge = breakPoints.large;
	const [showFilters, setShowFilters] = useState<boolean>(false);
	const [sortBy, setSortBy] = useState<string>(sortByOptions[0].value);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [hasFilterSelection, setHasFilterSelection] = useState<boolean>(false);
	const [modelsToCompare, setModelsToCompare] = useState<string[]>([]);
	const router = useRouter();
	const { query: routerQuery } = router;
	const ignoredFilterValues = ["page", "search_terms"];
	const selectedFilters = useRef<string[]>([]); // To show on no results msg. We can use a ref since the search results are still gonna rerender

	const [driverInstance, setDriverInstance] =
		useState<ReturnType<typeof driver> | null>(null);

	useEffect(() => {
		const loadDriver = async () => {
			const driverModule = await import("driver.js");
			await import("driver.js/dist/driver.css").then(() => {});
			const driverInstance = driverModule.driver({
				showProgress: true,
				prevBtnText: "← Prev",
				nextBtnText: "Next →",
				doneBtnText: "Done"
			});
			setDriverInstance(driverInstance);
		};
		loadDriver();
	}, []);

	const startTour = () => {
		if (driverInstance) {
			driverInstance.setSteps(searchTourSteps);
			driverInstance.drive();
		}
	};

	const changePage = (page: number) => {
		setCurrentPage(page);
		searchFilterDispatch({
			type: "substitute",
			operator: "",
			filterId: "page",
			selection: page.toString()
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
				initialState: actionInitialState
			} = action;
			if (type === "init") {
				if (actionInitialState) return actionInitialState;

				for (let key in state) {
					if (key !== "search_terms") {
						newState[key].selection = [];
						newState[key].operator = ANY;
					}
				}
			}

			if (type === "add") {
				newState[filterId].selection = [
					...new Set(state[filterId].selection.concat([selection]))
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
				newState[filterId].operator = ANY;
			}

			if (type === "toggleOperator") {
				newState[filterId].operator =
					state[filterId].operator === ANY ? ALL : ANY;
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
			const initialSearchFilterState: State = {};
			const stateFromUrl: State = {};
			const filters = routerQuery["filters"]
				? (routerQuery["filters"] as string).split(" AND ")
				: [];
			filters.forEach((filterStr) => {
				const filterOperatorStr = filterStr.split(":")[0];
				const filterId = filterOperatorStr.split(".")[0];
				const operator = filterOperatorStr.split(".").length > 1 ? ALL : ANY;
				const selection = filterStr.split(":")[1].split(",");
				stateFromUrl[filterId] = { operator, selection };
			});

			const addInitialSearchFilter = (id: string) => {
				initialSearchFilterState[id] = stateFromUrl[id]
					? stateFromUrl[id]
					: {
							operator: ANY,
							selection: []
					  };
			};

			data?.forEach((section) =>
				section.facets.forEach((facet: FacetProps) => {
					addInitialSearchFilter(facet.facetId);
				})
			);

			ignoredFilterValues.forEach((id) => addInitialSearchFilter(id));

			searchFilterDispatch({
				type: "init",
				initialState: initialSearchFilterState,
				selection: "",
				filterId: "",
				operator: ""
			});
		},
		refetchOnWindowFocus: true,
		// staleTime: 120000,
		cacheTime: 100
	});
	const searchFacetSections = searchFacetSectionsQuery.data;

	const searchFacetOperatorsQuery = useQuery({
		queryKey: "searchFacetOperators",
		queryFn: async () => getFacetOperators()
	});
	const searchFacetOperators =
		!searchFacetOperatorsQuery.isLoading && searchFacetOperatorsQuery.data
			? searchFacetOperatorsQuery.data
			: [];

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
								: fn
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
				searchFacetOperators
			}
		],
		queryFn: async () =>
			getSearchResults(
				[],
				searchFilterState,
				resultsPerPage,
				sortBy,
				searchFacetOperators
			),
		enabled:
			searchFilterState !== null || Boolean(searchFacetOperatorsQuery.data) // Only enable when `searchFilterState` and facet operators are ready
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
						searchFilterState[filterId].operator !== ANY
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
			selectedFilters.current = filterValues;

			if (onlyIgnoredFilter) {
				setHasFilterSelection(false);
			} else {
				setHasFilterSelection(true);
			}
			router.replace(
				{
					query: { ...routerQuery, filters: filterValues.join(" AND ") }
				},
				undefined,
				{ scroll: false }
			);
		} else {
			setHasFilterSelection(false);
			router.replace("/search", undefined, { shallow: true });
		}
	}, [searchFilterState]);

	const compareModel = (id: string): void => {
		setModelsToCompare((prev) => {
			if (prev.includes(id)) {
				return prev.filter((model) => model !== id);
			} else {
				if (prev.length === 4) {
					alert(
						"You've reached the maximum amount of models to compare. Remove a model to add another."
					);
					return prev;
				} else {
					return [...prev, id];
				}
			}
		});
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
			disabled={!hasFilterSelection}
			onClick={() =>
				searchFilterDispatch({
					type: "init",
					selection: "",
					filterId: "",
					operator: ""
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
					type
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

	const queryClient = useQueryClient();

	const handleFilterChange = (
		filterId: string,
		selection: string,
		operator: string,
		type: onFilterChangeType["type"]
	) => {
		searchFilterDispatch({
			filterId,
			selection,
			operator,
			type
		});

		queryClient.invalidateQueries("search-results");
	};

	return (
		<>
			{/* page metadata */}
			<Head>
				<title>
					Explore Patient-Derived Xenograft, Cell and Organoid models
				</title>
				<meta
					name="description"
					content="Discover a diverse catalog of cancer models. Find the perfect PDX, organoid, and cell line models for your research."
				/>
			</Head>
			<header className={`py-5 ${styles.Search_header}`}>
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h1 className="h2 text-white text-center mt-0">
								Search{" "}
								{modelCount && modelCount.data
									? `over ${modelCount.data.toLocaleString()}`
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
								onFilterChange={handleFilterChange}
								selection={searchFilterState}
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
											hjAllow={true}
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
												{hasFilterSelection && (
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
								searchResultsQuery.data[1].length > 0 ? (
									<>
										<SearchResults
											compareModel={compareModel}
											modelsToCompare={modelsToCompare}
											data={searchResultsQuery.data[1]}
										/>
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
									</>
								) : (
									<div className="row">
										<div className="col-12 text-center">
											<p>
												There are no results for your search.
												<br />
												Please try again with different filters.
											</p>
											<p>
												Your search terms:
												<br />
												<ul className="ul-noStyle">
													{selectedFilters.current &&
														selectedFilters.current.map((filter) => (
															<li key={filter} className="text-capitalize">
																<span className="text-primary-tertiary">•</span>{" "}
																{filter
																	.replaceAll("_", " ")
																	.replace(":", ": ")
																	.replaceAll(",", ", ")
																	.replaceAll(" boolean", "")}
															</li>
														))}
												</ul>
											</p>
											{ClearFilterButtonComponent}
										</div>
									</div>
								)
							) : (
								<SearchResultsLoader amount={resultsPerPage} />
							)}
						</div>
					</div>
					{modelsToCompare[0] ? (
						<div className="row position-sticky bottom-0 mt-5">
							<div className="col-10 offset-1">
								<Card
									className="bg-primary-quaternary mb-2"
									contentClassName="py-2"
									id="tour_compareCard"
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

												return (
													<React.Fragment key={model}>
														{idx > 0 && (
															<span className="text-primary-tertiary"> + </span>
														)}
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
												className="my-1 ml-1 py-1 bg-transparent"
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
			<ShowHide showOver={bpLarge} windowWidth={windowWidth || 0}>
				<FloatingButton
					onClick={() => {
						setModelsToCompare([]);
						startTour();
					}}
					priority="secondary"
					color="dark"
				>
					<p className="mb-0 lh-1">Take page tour</p>
				</FloatingButton>
			</ShowHide>
		</>
	);
};

export default Search;
