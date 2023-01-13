import { ISearchFiltersProps } from "../../../globalTypes";
import InputAndLabel from "../Input/InputAndLabel";
import styles from "./SearchFilters.module.scss";

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
							className={styles["search_filter-search"]}
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
					<div
						className={`w-100 flex-shrink-1 ${styles["search_filter_column"]}`}
					>
						<h3 className="p text-bold">{facetName}</h3>
						<hr className="col-lg-8 ml-0" />
						{filterContent}
					</div>
				);
			})}
		</>
	);
};

export default SearchFilterContent;
