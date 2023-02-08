import InputAndLabel from "../Input/InputAndLabel";
import { IFacetProps } from "../../types/Facet.model";
import { sortObjArrBy } from "../../utils/sortArrBy";

interface ISearchFilterContentProps {
	data: IFacetProps[];
}

const SearchFilterContent = (props: ISearchFilterContentProps) => {
	return (
		<>
			{props.data.map((facet: IFacetProps) => {
				let facetContent = null,
					facetName = facet.name,
					facetType = facet.type;

				const facetOptionsOrder = ["not specified", "not collected", "other"];
				sortObjArrBy(facet.options, facetOptionsOrder, undefined, false, true);

				// TODO: Create component for multivalued
				if (facetType === "autocomplete" || facetType === "multivalued") {
					// Create search input
					facetContent = (
						<InputAndLabel
							name={facetName}
							type="search"
							label={facetName}
							placeholder={`E.g. ${facet.placeholder}`}
							labelClassName="hideElement-accessible"
						/>
					);
				} else {
					// Create checkbox per option
					facetContent = (
						<ul className="ul-noStyle m-0">
							{facet.options.map((option) => (
								<li key={option}>
									<InputAndLabel name={option} type="checkbox" label={option} />
								</li>
							))}
						</ul>
					);
				}

				return (
					<div className="w-100 text-capitalize" key={facetName}>
						<h3 className="mb-1 p text-bold">{facetName}</h3>
						<hr />
						{facetContent}
					</div>
				);
			})}
		</>
	);
};

export default SearchFilterContent;
