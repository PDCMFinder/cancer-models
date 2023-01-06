import Button from "../components/Button/Button";
import Form from "../components/Form/Form";
import useWindowDimensions from "../hooks/useWindowDimensions";
import ShowHide from "../components/ShowHide/ShowHide";
import breakPoints from "../utils/breakpoints";
import InputAndLabel from "../components/Input/InputAndLabel";
import SearchResults from "../components/SearchResults/SearchResults";
import Select from "../components/Input/Select";
import { useState } from "react";
import { IInputProps } from "../../globalTypes";

const perPageOptions = [
	{ text: "9" },
	{ text: "54" },
	{ text: "99" },
	{ text: "198" },
];

const search = () => {
	const { windowWidth } = useWindowDimensions();
	const [searchInputContent, setSearchInputContent] = useState<string>("");
	const [resultsPerPage, setResultsPerPage] = useState<number>(9);

	let bpLarge = breakPoints.large;

	const handleSearchChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setSearchInputContent(e.target.value);
	};

	const handleSearchInputClear = () => {
		setSearchInputContent("");
	};

	const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		let numericAmount = parseInt(e.target.value);

		setResultsPerPage(numericAmount);
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
												className="text-white link--text mt-2 mb-0"
												onClick={handleSearchInputClear}
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
									<Button priority="secondary" color="white" className="mt-2">
										Filters
									</Button>
								</ShowHide>
							</div>
						</div>
					</div>
				</div>
				{/* Desktop filters */}
				<ShowHide windowWidth={windowWidth || 0} showOver={bpLarge}>
					<div className="bg-white">
						<div className="container">
							<div className="row">
								<div className="col-12"></div>
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
