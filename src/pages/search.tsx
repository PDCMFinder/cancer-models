import Button from "../components/Button/Button";
import Form from "../components/Form/Form";
import styles from "./search.module.scss";
import useWindowDimensions from "../hooks/useWindowDimensions";
import ShowHide from "../components/ShowHide/ShowHide";
import breakPoints from "../utils/breakpoints";
import InputAndLabel from "../components/Input/InputAndLabel";
import SearchResults from "../components/SearchResults/SearchResults";

const search = () => {
	const { windowWidth } = useWindowDimensions();

	let bpLarge = breakPoints.large;

	return (
		<>
			<header>
				<div className="bg-primary-primary">
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
					<div className="row">
						<div className="col-12">
							{/* TODO: add models per page select */}
							<p>Showing 1 to 12 of 510 results</p>
							<div>
								<p>Models per page:</p>
							</div>
						</div>
					</div>
					<SearchResults />
				</div>
			</section>
		</>
	);
};

export default search;
