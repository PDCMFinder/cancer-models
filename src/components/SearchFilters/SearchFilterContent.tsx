import InputAndLabel from "../Input/InputAndLabel";
import { IFacetProps } from "../../types/Facet.model";
import { sortObjArrBy } from "../../utils/sortArrBy";
import Select from "../Input/Select";
import { IFacetSidebarSelection } from "../../types/Facet.model";

interface ISearchFilterContentProps {
	data: IFacetProps[];
	facetSelection: IFacetSidebarSelection;
	facet: any;
	onFilterChange: (
		section: string,
		facet: any,
		options: string[],
		operator: any
	) => void;
}

const SearchFilterContent = (props: ISearchFilterContentProps) => {
	return (
		<>
			{props.data.map((facet: IFacetProps) => {
				let facetContent = null,
					facetName = facet.name,
					facetType = facet.type,
					selectedFacetObj =
						props.facetSelection && props.facetSelection[props.facet.key],
					selection =
						selectedFacetObj && selectedFacetObj[facet.facetId]
							? selectedFacetObj[facet.facetId]
							: ([] as string[]);

				const facetOptionsOrder = ["not specified", "not collected", "other"];
				sortObjArrBy(facet.options, facetOptionsOrder, undefined, false, true);

				// TODO: Create component for multivalued
				if (facetType === "autocomplete" || facetType === "multivalued") {
					// Create search input
					facetContent = (
						<InputAndLabel
							name={facetName}
							type="search"
							label={facetName}
							placeholder={`E.g. ${facet.placeholder}`}
							labelClassName="hideElement-accessible"
						/>
					);
				} else {
					if (facet.options.length > 10) {
						// Create select from options
						const optionSelectObj = Object.assign(
							facet.options.map((value) => ({ ["text"]: value }))
						);

						facetContent = (
							<Select
								id={facet.facetId}
								options={[{ text: "All", value: "" }, ...optionSelectObj]}
							/>
						);
					} else {
						// Create checkbox per option
						facetContent = (
							<ul className="ul-noStyle m-0">
								{facet.options.map((option) => (
									<li key={option}>
										<InputAndLabel
											name={option}
											type="checkbox"
											label={option}
											onChange={(
												e: React.ChangeEvent<HTMLInputElement>
											): void => {
												let newSelection = [...selection];
												if (e.target.checked) {
													newSelection.push(option);
												} else {
													newSelection = newSelection.filter(
														(selectedKey) => selectedKey !== option
													);
												}

												props.onFilterChange(
													props.facet.key,
													facet.facetId,
													newSelection,
													undefined
												);
											}}
										/>
									</li>
								))}
							</ul>
						);
					}
				}

				return (
					<div className="w-100 text-capitalize" key={facetName}>
						<h3 className="mb-1 p text-bold">{facetName}</h3>
						<hr />
						{facetContent}
					</div>
				);
			})}
		</>
	);
};

export default SearchFilterContent;
