import Button from "../components/Button/Button";
import Form from "../components/Form/Form";
import useWindowDimensions from "../hooks/useWindowDimensions";
import ShowHide from "../components/ShowHide/ShowHide";
import breakPoints from "../utils/breakpoints";
import InputAndLabel from "../components/Input/InputAndLabel";
import SearchResults from "../components/SearchResults/SearchResults";
import Select from "../components/Input/Select";
import { useState } from "react";

const search = () => {
	const { windowWidth } = useWindowDimensions();
	const [searchInputContent, setSearchInputContent] = useState("");

	let bpLarge = breakPoints.large;

	return (
		<>
			<header>
				<div className="bg-primary-primary py-5">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<h1 className="text-white text-center">Cancer Model Finder</h1>
								<Form>
									<InputAndLabel
										label="Cancer Model Finder"
										name="search"
										type="text"
										placeholder="Cancer diagnosis eg. Melanoma"
										labelClassName="hideElement-accessible"
										className="mb-0"
									/>
									<div className="text-right">
										{/* TODO: Show clear input button when theres content in input */}
										{searchInputContent && (
											<Button
												priority="secondary"
												color="white"
												className="text-white link--text mt-2 mb-0"
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
								<Select
									id="perPage"
									options={[{ text: "6" }, { text: "12" }, { text: "18" }]}
									className="w-auto mb-0"
								/>
							</div>
						</div>
					</div>
					<div className="row">
						<SearchResults />
					</div>
				</div>
			</section>
		</>
	);
};

export default search;
