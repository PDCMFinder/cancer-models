import Accordion from "../Accordion/Accordion";
import SearchFilterContent from "./SearchFilterContent";
import Card from "../Card/Card";
import {
	IFacetSidebarSelection,
	IFacetSectionProps,
} from "../../types/Facet.model";
import { sortObjArrBy } from "../../utils/sortArrBy";
import { useEffect, useState } from "react";
import { onFilterChangeType } from "../../pages/search";

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
const SearchFiltersMobile = (props: ISearchFilters) => {
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

				return (
					<Accordion
						buttonClassName="bg-gray"
						key={facetKey}
						id={facet.name}
						contentClassName="mb-3"
						open={isModelFacet}
						content={
							<SearchFilterContent
								onFilterChange={props.onFilterChange}
								data={facets}
								facet={facet}
								facetSelection={props.selection}
							/>
						}
					/>
				);
			})}
		</Card>
	);
};

export default SearchFiltersMobile;
