import InputAndLabel from "../Input/InputAndLabel";
import { IFacetProps } from "../../types/Facet.model";
import { sortObjArrBy } from "../../utils/sortArrBy";
import { IFacetSidebarSelection } from "../../types/Facet.model";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { autoCompleteFacetOptions } from "../../apis/Search.api";
import { useQuery } from "react-query";
import { useState } from "react";
import typeaheadStyles from "../../utils/typeaheadStyles";
import { onFilterChangeType } from "../../pages/search";

interface ISearchFilterContentProps {
	data: IFacetProps[];
	facetSelection: IFacetSidebarSelection;
	facet: any;
	onFilterChange: (
		facetId: string,
		selection: string,
		operator: string,
		type: onFilterChangeType["type"]
	) => void;
}

const SearchFilterContent = (props: ISearchFilterContentProps) => {
	const [query, setQuery] = useState("");
	const [facetId, setfacetId] = useState("");

	let selectOptionsQuery = useQuery(query, () =>
		autoCompleteFacetOptions(facetId, query)
	);

	const onSelectChange = (facetId: string, query: string) => {
		setQuery(query);
		setfacetId(facetId);
		console.log(selectOptionsQuery.data);
		return selectOptionsQuery.data;
	};

	return (
		<>
			{props.data.map((facet: IFacetProps) => {
				let facetContent = null,
					facetName = facet.name,
					facetType = facet.type,
					selectedFacetObj =
						props.facetSelection && props.facetSelection[facet.facetId],
					selection = selectedFacetObj?.selection,
					operator = selectedFacetObj?.operator;

				const facetOptionsOrder = ["not specified", "not collected", "other"];
				sortObjArrBy(facet.options, facetOptionsOrder, undefined, false, true);

				if (facetType === "autocomplete" || facetType === "multivalued") {
					// Create select typeahead from options
					const optionSelectObj = Object.assign(
						facet.options.map((value) => ({
							["label"]: value,
							["value"]: value,
						}))
					);
					const placeholder = facet.placeholder
						? `Eg. ${facet.placeholder}`
						: "Select...";

					facetContent = (
						<AsyncSelect
							closeMenuOnSelect={false}
							isMulti
							placeholder={placeholder}
							defaultOptions={[{ label: "All", value: "" }, ...optionSelectObj]}
							loadOptions={(inputValue) =>
								new Promise((resolve) => {
									resolve(onSelectChange(facet.facetId, inputValue));
								})
							}
							onChange={(option, actionMeta) => {
								console.log({ option, actionMeta });
								setQuery("");
								setfacetId(facet.facetId);
							}}
							styles={typeaheadStyles}
						/>
					);
				} else if (facet.options.length > 10) {
					// Create select typeahead from options
					const optionSelectObj = Object.assign(
						facet.options.map((value) => ({
							["label"]: value,
							["value"]: value,
						}))
					);

					facetContent = (
						<Select
							// closeMenuOnSelect={false}
							isMulti
							options={[{ label: "All", value: "" }, ...optionSelectObj]}
							onChange={(_, actionMeta) => {
								let option = "",
									action: onFilterChangeType["type"] = "add";

								switch (actionMeta.action) {
									case "remove-value":
										option = actionMeta.removedValue.value;
										action = "remove";
										break;
									case "select-option":
										option = actionMeta.option.value;
										break;
									case "clear":
										action = "clear";
										break;
								}

								props.onFilterChange(facet.facetId, option, operator, action);
							}}
							styles={typeaheadStyles}
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
										checked={selection?.includes(option)}
										onChange={(
											e: React.ChangeEvent<HTMLInputElement>
										): void => {
											const actionType = e.target.checked ? "add" : "remove";
											props.onFilterChange(
												facet.facetId,
												option,
												operator,
												actionType
											);
										}}
									/>
								</li>
							))}
						</ul>
					);
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
