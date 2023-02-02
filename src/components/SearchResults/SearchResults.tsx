import SearchResult from "./SearchResult/SearchResult";

interface ISearchResultsProps {
	sortedBy: string;
	resultsData: {
		patient_age: string;
		patient_sex: string;
		external_model_id: string;
		model_type: string;
		data_source: string;
		histology: string;
		primary_site: string;
		collection_site: string;
		tumour_type: string;
		dataset_available: string[];
	}[];
}

const SearchResults = (props: ISearchResultsProps) => {
	return (
		<div className="row">
			<div className="col-12">
				{/* TODO: Use sortedBy to sort results */}
				{props.resultsData.map((result) => (
					<div className="row">
						<div className="col-12">
							<SearchResult
								key={result.external_model_id}
								data={result}
								className="mb-2 mb-md-0"
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default SearchResults;
