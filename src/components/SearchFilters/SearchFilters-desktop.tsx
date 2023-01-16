import Tab from "../Tabs/Tab";
import Tabs from "../Tabs/Tabs";
import { ISearchFiltersProps } from "../../../globalTypes";
import SearchFilterContent from "./SearchFilterContent";

const SearchFiltersDesktop = (props: ISearchFiltersProps) => {
	return (
		<Tabs packedLabels={true}>
			{props.filterData.map((section) => {
				let facetSection = section.facet_section;

				return (
					<Tab
						key={facetSection}
						label={facetSection.split("_").join(" ")}
						content={
							<SearchFilterContent filterContentData={section.facet_filters} />
						}
					/>
				);
			})}
		</Tabs>
	);
};

export default SearchFiltersDesktop;
