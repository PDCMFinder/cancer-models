import Accordion from "../Accordion/Accordion";
import { ISearchFiltersProps } from "../../../globalTypes";
import SearchFilterContent from "./SearchFilterContent";

const SearchFiltersMobile = (props: ISearchFiltersProps) => {
	return (
		<>
			{props.filterData.map((section) => {
				let facetSection = section.facet_section;

				return (
					<Accordion
						buttonClassName="text-family-primary"
						key={facetSection}
						id={facetSection}
						contentClassName="d-lg-flex mb-3"
						content={
							<SearchFilterContent filterContentData={section.facet_filters} />
						}
					/>
				);
			})}
		</>
	);
};

export default SearchFiltersMobile;
