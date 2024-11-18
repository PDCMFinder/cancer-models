import { onFilterChangeType } from "../../pages/search";
import {
	FacetSectionProps,
	FacetSidebarSelection
} from "../../types/Facet.model";
import Accordion from "../Accordion/Accordion";
import AccordionItem from "../Accordion/AccordionItem";
import Card from "../Card/Card";
import SearchFilterContent from "./SearchFilterContent";

type SearchFilters = {
	data: FacetSectionProps[];
	selection: FacetSidebarSelection;
	onFilterChange: (
		facetId: string,
		selection: string,
		operator: string,
		type: onFilterChangeType["type"]
	) => void;
};

const SearchFilters = (props: SearchFilters) => {
	return (
		<Card
			className="bg-lightGray bc-transparent overflow-visible"
			contentClassName="py-3 px-2"
			id="tour_filters"
		>
			<Accordion allowMultipleOpen>
				{props.data.map((facet: FacetSectionProps, idx: number) => {
					return (
						<AccordionItem
							title={facet.name}
							key={facet.name}
							isDefaultOpen={idx === 0}
						>
							<SearchFilterContent
								onFilterChange={props.onFilterChange}
								data={facet.facets}
								facet={facet}
								facetSelection={props.selection}
							/>
						</AccordionItem>
					);
				})}
			</Accordion>
		</Card>
	);
};

export default SearchFilters;
