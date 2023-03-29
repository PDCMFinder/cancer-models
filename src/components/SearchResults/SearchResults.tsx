import SearchResult from "./SearchResult/SearchResult";
import { SearchResult as SearchResultType } from "../../types/Search.model";

interface ISearchResultsProps {
	data: Array<SearchResultType>;
}

const SearchResults = (props: ISearchResultsProps) => {
	return (
		<>
			{props.data.map((result) => (
				<div
					className="row mb-3 mb-md-2"
					key={result.pdcmId + result.histology}
				>
					<div className="col-12">
						<SearchResult data={result} />
					</div>
				</div>
			))}
		</>
	);
};

export default SearchResults;
