import Tab from "../Tabs/Tab";
import Tabs from "../Tabs/Tabs";
import { ISearchFiltersProps } from "../../../globalTypes";
import SearchFilterContent from "./SearchFilterContent";

const SearchFiltersDesktop = (props: ISearchFiltersProps) => {
	return (
		<Tabs packedLabels={true}>
			{props.filterData.map((section) => {
				return (
					<Tab
						key={section.facet_section}
						label={section.facet_section.split("_").join(" ")}
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
