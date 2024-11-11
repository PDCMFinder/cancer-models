import { SearchResult as SearchResultType } from "../../types/Search.model";
import SearchResult from "./SearchResult/SearchResult";

type SearchResultsProps = {
	compareModel: (id: string) => void;
	modelsToCompare: string[];
	data: SearchResultType[];
};

const SearchResults = (props: SearchResultsProps) => {
	return (
		<>
			{props.data.map((result) => {
				const id = result.pdcmId;

				return (
					<div className="row mb-3 mb-md-2" key={id + result.histology}>
						<SearchResult
							addModelToCompare={() => props.compareModel(id)}
							compareCheck={props.modelsToCompare.includes(id)}
							data={result}
						/>
					</div>
				);
			})}
		</>
	);
};

export default SearchResults;
