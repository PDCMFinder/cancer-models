import SearchResult from "./SearchResult/SearchResult";
import { SearchResult as SearchResultType } from "../../types/Search.model";

interface ISearchResultsProps {
	resultsData: Array<SearchResultType>;
}

const SearchResults = (props: ISearchResultsProps) => {
	return (
		<>
			{props.resultsData.map((result) => (
				<div className="row mb-3 mb-md-2" key={result.pdcmId}>
					<div className="col-12">
						<SearchResult data={result} />
					</div>
				</div>
			))}
		</>
	);
};

export default SearchResults;
