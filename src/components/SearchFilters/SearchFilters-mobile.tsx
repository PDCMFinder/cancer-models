import Accordion from "../Accordion/Accordion";
import { ISearchFiltersProps } from "../../../globalTypes";
import SearchFilterContent from "./SearchFilterContent";
import Card from "../Card/Card";

const SearchFiltersMobile = (props: ISearchFiltersProps) => {
	return (
		<Card className="bg-lightGray" contentClassName="py-3 px-2">
			{props.filterData.map((section) => {
				let facetSection = section.facet_section;
				let open = facetSection === "model" ? true : false;

				return (
					<Accordion
						buttonClassName="bg-gray"
						key={facetSection}
						id={facetSection}
						contentClassName="mb-3"
						open={open}
						content={
							<SearchFilterContent filterContentData={section.facet_filters} />
						}
					/>
				);
			})}
		</Card>
	);
};

export default SearchFiltersMobile;
