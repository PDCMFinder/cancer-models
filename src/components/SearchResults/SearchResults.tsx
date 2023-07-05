import SearchResult from "./SearchResult/SearchResult";
import { SearchResult as SearchResultType } from "../../types/Search.model";
import { ChangeEvent, useEffect, useState } from "react";

interface ISearchResultsProps {
	compareModel: (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
		id: string
	) => void;
	modelsToCompare: string[];
	data: SearchResultType[];
}

const SearchResults = (props: ISearchResultsProps) => {
	return (
		<>
			{props.data.map((result) => {
				const id = result.pdcmId;

				return (
					<div className="row mb-3 mb-md-2" key={id + result.histology}>
						<div className="col-12">
							<SearchResult
								addModelToCompare={(e) => props.compareModel(e, id)}
								compareCheck={props.modelsToCompare.includes(id)}
								data={result}
							/>
						</div>
					</div>
				);
			})}
		</>
	);
};

export default SearchResults;
