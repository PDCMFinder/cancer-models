import { ISearchFiltersProps } from "../../../globalTypes";
import InputAndLabel from "../Input/InputAndLabel";

const FACET_EXAMPLE = "facet_example";

interface ISearchFilterContentProps {
	filterContentData: ISearchFiltersProps["filterData"][0]["facet_filters"];
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
						<h3 className="mb-1 p text-bold">{facetName}</h3>
						<hr />
						{filterContent}
					</div>
				);
			})}
		</>
	);
};

export default SearchFilterContent;
