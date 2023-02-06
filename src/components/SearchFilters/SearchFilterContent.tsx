import { ISearchFiltersProps } from "../../../globalTypes";
import InputAndLabel from "../Input/InputAndLabel";

const FACET_EXAMPLE = "facet_example";

interface ISearchFilterContentProps {
	filterContentData: ISearchFiltersProps["filterData"][0]["facet_filters"];
	// filterContent: {
	// 	facet_name: string;
	// 	facet_column: string;
	// 	facet_options: string[];
	// 	facet_example?: string;
	// }[];
}

const SearchFilterContent = (props: ISearchFilterContentProps) => {
	return (
		<>
			{props.filterContentData.map((filter) => {
				let filterContent = null,
					facetName = filter.facet_name;

				if (filter.hasOwnProperty(FACET_EXAMPLE)) {
					// Create search input
					filterContent = (
						<InputAndLabel
							name={facetName}
							type="search"
							label={facetName}
							placeholder={`E.g. ${filter[FACET_EXAMPLE]}`}
							labelClassName="hideElement-accessible"
						/>
					);
				} else {
					// Create checkbox per option
					filterContent = (
						<ul className="ul-noStyle m-0">
							{filter.facet_options.map((option) => (
								<li key={option}>
									<InputAndLabel name={option} type="checkbox" label={option} />
								</li>
							))}
						</ul>
					);
				}

				return (
					<div className="w-100" key={facetName}>
						<h3 className="p text-bold">{facetName}</h3>
						<hr className="mb-3 col-lg-8 ml-0" />
						<div className="overflow-y-scroll" style={{ height: "78%" }}>
							{filterContent}
						</div>
					</div>
				);
			})}
		</>
	);
};

export default SearchFilterContent;
