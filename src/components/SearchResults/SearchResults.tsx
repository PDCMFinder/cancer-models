import SearchResult from "./SearchResult/SearchResult";
import { ISearchResult } from "../../../globalTypes";

interface ISearchResultsProps {
	sortedBy: string;
	resultsData: ISearchResult[];
}

const SearchResults = (props: ISearchResultsProps) => {
	return (
		<>
			{props.resultsData.map((result) => (
				<div className="row mb-3 mb-md-2" key={result.external_model_id}>
					<div className="col-12">
						<SearchResult data={result} className="mb-2 mb-md-0" />
					</div>
				</div>
			))}
		</>
	);
};

export default SearchResults;
