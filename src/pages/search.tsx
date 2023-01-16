import type { NextPage } from "next";
import Button from "../components/Button/Button";
import Form from "../components/Form/Form";
import InputAndLabel from "../components/Input/InputAndLabel";
import SearchResults from "../components/SearchResults/SearchResults";
import Select from "../components/Input/Select";
import React, { useState, useEffect } from "react";
import styles from "./search.module.scss";
import CloseIcon from "../components/CloseIcon/CloseIcon";
import Card from "../components/Card/Card";
import { createPortal } from "react-dom";
import handleBodyClass from "../utils/handleBodyClass";
import Modal from "../components/Modal/Modal";
import { useRouter } from "next/router";
import SearchFilters from "../components/SearchFilters/SearchFilters";
import filterMockData from "../components/SearchFilters/SearchFilterData-mock";
import resultsMockData from "../components/SearchResults/SearchResultsData-mock";

const perPageOptions = [
		{ text: "9" },
		{ text: "54" },
		{ text: "99" },
		{ text: "198" },
	],
	ADD = "add",
	REMOVE = "remove",
	OVERFLOW_HIDDEN = "overflow-hidden";

const Search: NextPage = () => {
	const router = useRouter();
	const [searchInputContent, setSearchInputContent] = useState<string>("");
	const [resultsPerPage, setResultsPerPage] = useState<number>(9);
	const [filtersAreOpen, setFiltersAreOpen] = useState<boolean>(false);

	useEffect(() => {
		// Load page with filter modal open if url includes ?advancedSearch
		if (router.query.hasOwnProperty("advancedSearch")) {
			handleOpenFilters();
		}
	}, [router]);

	const handleSearchChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const { value } = e.target;
		setSearchInputContent(value);
	};

	const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;
		let numericAmount = parseInt(value);

		setResultsPerPage(numericAmount);
	};

	const handleToggleFilters = () => {
		if (filtersAreOpen) {
			handleCloseFilters();
		} else {
			handleOpenFilters();
		}
	};

	const handleOpenFilters = () => {
		handleBodyClass([OVERFLOW_HIDDEN], ADD);
		setFiltersAreOpen(true);
	};

	const handleCloseFilters = () => {
		handleBodyClass([OVERFLOW_HIDDEN], REMOVE);
		setFiltersAreOpen(false);
	};

	const handleAdvancedSearch = () => {
		// handle filter api query here
		handleCloseFilters();
	};

	return (
		<>
			<header>
				<div className="bg-primary-primary py-5">
					<div className="container">
						<div className="row">
							<div className="col-12 col-md-10 col-lg-6 offset-md-1 offset-lg-3">
								<h1 className="text-white text-center">Cancer Model Finder</h1>
								<Form>
									<InputAndLabel
										label="Cancer Model Finder"
										name="search"
										type="text"
										placeholder="Cancer diagnosis eg. Melanoma"
										labelClassName="hideElement-accessible"
										className="mb-0"
										onChange={handleSearchChange}
										value={searchInputContent}
									/>
									<div className="text-right">
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
										<Button
											priority="primary"
											color="dark"
											type="submit"
											className="mt-2 mb-0"
										>
											Search
										</Button>
									</div>
								</Form>
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-md-10 col-lg-6 offset-md-1 offset-lg-3">
								{/* Opens filter modal */}
								<Button
									priority="secondary"
									color="white"
									className="mt-5 mb-0 mt-lg-3"
									onClick={() => handleToggleFilters()}
								>
									Advanced search
								</Button>
							</div>
						</div>
					</div>
				</div>
				{/* Filters */}
				{filtersAreOpen &&
					createPortal(
						<Modal handleClose={handleCloseFilters}>
							<Card
								headerClassName="sticky top-0"
								header={
									<div className="d-flex justify-content-between">
										<p className="mb-0 text-family-primary">Advanced search</p>
										<CloseIcon color="dark" onClick={handleCloseFilters} />
									</div>
								}
								footer={
									<>
										<Button
											priority="secondary"
											color="dark"
											className="link-text m-0"
										>
											Clear
										</Button>
										<Button
											color="dark"
											priority="primary"
											className="m-0"
											onClick={() => handleAdvancedSearch()}
										>
											Search
										</Button>
									</>
								}
								footerClassName="sticky bottom-0 text-right"
								className={`${styles.search_filters_card} h-100 bg-secondary-quaternary bc-primary-quaternary`}
								contentClassName={`${styles.search_filters_card_content} h-100 overflow-scroll`}
							>
								<SearchFilters filterData={filterMockData} />
							</Card>
						</Modal>,
						document.body
					)}
			</header>
			<section>
				<div className="container">
					<div className="row mb-3 align-center">
						<div className="col-12 col-md-6">
							<p className="mb-md-0">Showing 1 to 12 of 510 results</p>
						</div>
						<div className="col-12 col-md-6">
							<div className="d-flex align-center justify-content-md-end">
								<p className="mb-0 mr-1">Models per page:</p>
								{/* TODO: Show this amount of results per page */}
								<Select
									id="perPage"
									options={perPageOptions}
									className="w-auto mb-0"
									onChange={handlePerPageChange}
								/>
							</div>
						</div>
					</div>
					<div className="row">
						<SearchResults
							resultsData={resultsMockData}
							resultsAmount={resultsPerPage}
						/>
					</div>
				</div>
			</section>
		</>
	);
};

export default Search;
