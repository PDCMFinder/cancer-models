import { useEffect, useState } from "react";
import { onFilterChangeType } from "../../pages/search";
import {
	IFacetSectionProps,
	IFacetSidebarSelection
} from "../../types/Facet.model";
import { sortObjArrBy } from "../../utils/sortArrBy";
import Accordion from "../Accordion/Accordion";
import Card from "../Card/Card";
import SearchFilterContent from "./SearchFilterContent";

interface ISearchFilters {
	data: IFacetSectionProps[];
	selection: IFacetSidebarSelection;
	onFilterChange: (
		facetId: string,
		selection: string,
		operator: string,
		type: onFilterChangeType["type"]
	) => void;
}

// AKA <FacetSection/>
const SearchFilters = (props: ISearchFilters) => {
	const [filterData, setFilterData] = useState<any>(props.data);

	useEffect(() => {
		setFilterData(
			sortObjArrBy(filterData, ["model", "patient_tumour"], "key", true)
		);
	}, [props.data]);

	return (
		<Card
			className="bg-lightGray bc-transparent overflow-visible"
			contentClassName="py-3 px-2"
			id="tour_filters"
		>
			{filterData.map((facet: IFacetSectionProps) => {
				let facetKey = facet.key,
					facets = facet.facets,
					isModelFacet = facetKey === "model";

				// Order facets
				if (isModelFacet) {
					const modelFacetOrder = ["model_type"];
					sortObjArrBy(facets, modelFacetOrder, "facetId");
				}

				const facetOptionsOrder = ["Not Specified", "Not Collected", "Other"];
				facets.forEach((facetsFacet) => {
					if (facetsFacet.options.length) {
						sortObjArrBy(
							facetsFacet.options,
							facetOptionsOrder,
							undefined,
							false,
							false
						);
					}
				});

				return (
					<Accordion
						buttonClassName="bg-gray"
						key={facetKey}
						id={facet.name}
						contentClassName="mb-3"
						open={isModelFacet}
					>
						<SearchFilterContent
							onFilterChange={props.onFilterChange}
							data={facets}
							facet={facet}
							facetSelection={props.selection}
						/>
					</Accordion>
				);
			})}
		</Card>
	);
};

export default SearchFilters;
