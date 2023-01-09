import Button from "../components/Button/Button";
import Form from "../components/Form/Form";
import useWindowDimensions from "../hooks/useWindowDimensions";
import ShowHide from "../components/ShowHide/ShowHide";
import breakPoints from "../utils/breakpoints";
import InputAndLabel from "../components/Input/InputAndLabel";
import SearchResults from "../components/SearchResults/SearchResults";
import Select from "../components/Input/Select";
import React, { useState } from "react";
import styles from "./search.module.scss";
import CloseIcon from "../components/CloseIcon/CloseIcon";
import Card from "../components/Card/Card";
import { createPortal } from "react-dom";
import handleBodyClass from "../utils/handleBodyClass";
import SearchFiltersMobile from "../components/SearchFilters/SearchFilters--mobile";

const perPageOptions = [
		{ text: "9" },
		{ text: "54" },
		{ text: "99" },
		{ text: "198" },
	],
	ADD = "add",
	REMOVE = "remove";

const search = () => {
	const { windowWidth } = useWindowDimensions();
	const [searchInputContent, setSearchInputContent] = useState<string>("");
	const [resultsPerPage, setResultsPerPage] = useState<number>(9);
	const [mobileFiltersAreOpen, setMobileFiltersAreOpen] =
		useState<boolean>(false);

	let bpLarge = breakPoints.large;

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

	const handleToggleMobileFilters = () => {
		let addRemoveBodyClass: typeof ADD | typeof REMOVE = !mobileFiltersAreOpen
			? ADD
			: REMOVE;
		handleBodyClass(["overflow-hidden"], addRemoveBodyClass);
		setMobileFiltersAreOpen((prev) => !prev);
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
										type="search"
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
												className="text-white link--text mt-2 mb-0"
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
								<ShowHide windowWidth={windowWidth || 0} hideOver={bpLarge}>
									{/* Opens filter modal for mobile */}
									<Button
										priority="secondary"
										color="white"
										className="mt-2"
										onClick={() => handleToggleMobileFilters()}
									>
										Filters
									</Button>
								</ShowHide>
							</div>
						</div>
					</div>
				</div>
				{/* Mobile filters */}
				<ShowHide windowWidth={windowWidth || 0} hideOver={bpLarge}>
					{mobileFiltersAreOpen &&
						createPortal(
							<div className={styles.mobileFilters}>
								<Card
									header={
										<div className="d-flex justify-content-between">
											<p className="mb-0">Filters</p>
											<CloseIcon
												color="dark"
												onClick={() => handleToggleMobileFilters()}
											/>
										</div>
									}
									className="h-100 bg-secondary-quaternary bc-primary-quaternary"
									contentClassName="mobileFilters_card_content"
								>
									<SearchFiltersMobile />
								</Card>
							</div>,
							document.body
						)}
				</ShowHide>
				{/* Desktop filters */}
				<ShowHide windowWidth={windowWidth || 0} showOver={bpLarge}>
					<div className="bg-white">
						<div className="container">
							<div className="row">
								<div className="col-12">desktop filters</div>
							</div>
						</div>
					</div>
				</ShowHide>
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
						<SearchResults resultsAmount={resultsPerPage} />
					</div>
				</div>
			</section>
		</>
	);
};

export default search;
