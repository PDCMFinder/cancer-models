import InputAndLabel from "../Input/InputAndLabel";
import { IFacetProps } from "../../types/Facet.model";
import { IFacetSidebarSelection } from "../../types/Facet.model";
import Select from "react-select";
import { autoCompleteFacetOptions } from "../../apis/Search.api";
import { useQuery } from "react-query";
import { ChangeEvent, useEffect, useState } from "react";
import typeaheadStyles from "../../utils/typeaheadStyles";
import { onFilterChangeType } from "../../pages/search";
import Fragment from "../Fragment/Fragment";
import { ethnicityCategories } from "../../utils/collapseEthnicity";

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

export interface SelectOption {
	label: string;
	value: string;
}

const SearchFilterContent = (props: ISearchFilterContentProps) => {
	const [query, setQuery] = useState("");
	const [facetId, setfacetId] = useState("");
	const [typeaheadData, setTypeaheadData] = useState<SelectOption[]>();

	const selectOptionsQuery = useQuery(
		query,
		() => autoCompleteFacetOptions(facetId, query),
		{
			onSuccess(data) {
				setTypeaheadData(data);
			},
		}
	);

	useEffect(() => {
		setTypeaheadData(selectOptionsQuery.data);
	}, [query, facetId]);

	const onTypeaheadType = (facetId: string, query: string) => {
		setQuery(query);
		setfacetId(facetId);
	};

	const optionSelectObj = (options: string[]): SelectOption[] => {
		return options?.map((value: string) => ({
			["label"]: value,
			["value"]: value,
		}));
	};

	return (
		<>
			{props.data.map((facet: IFacetProps) => {
				let facetContent = null,
					facetName = facet.name,
					facetType = facet.type,
					facetOptions = facet.options,
					selectedFacetObj =
						props.facetSelection && props.facetSelection[facet.facetId],
					selection = selectedFacetObj?.selection,
					operator = selectedFacetObj?.operator;

				const defaultValues = optionSelectObj(selection);

				if (facetType === "autocomplete" || facetType === "multivalued") {
					const placeholder = facet.placeholder
							? `Eg. ${facet.placeholder}`
							: "Select...",
						displayOperators = facetType === "multivalued";

					facetContent = (
						<>
							<Select
								closeMenuOnSelect
								blurInputOnSelect
								isMulti
								defaultValue={defaultValues}
								value={defaultValues}
								placeholder={placeholder}
								options={typeaheadData}
								onInputChange={(inputValue) =>
									onTypeaheadType(facet.facetId, inputValue)
								}
								isLoading={selectOptionsQuery.isLoading}
								loadingMessage={() => "Loading data"}
								noOptionsMessage={() => "Type to search"}
								onChange={(_, actionMeta) => {
									if (actionMeta.action === "pop-value") return;

									let option = "",
										action: onFilterChangeType["type"] = "add";

									switch (actionMeta.action) {
										case "remove-value":
											option = actionMeta.removedValue.value;
											action = "remove";
											break;
										case "select-option":
											option = actionMeta.option!.value;
											break;
										case "clear":
											action = "clear";
											break;
									}

									props.onFilterChange(facet.facetId, option, operator, action);
								}}
								styles={typeaheadStyles}
								components={{ DropdownIndicator: Fragment }}
							/>
							{displayOperators && (
								<fieldset className="d-flex border-none m-0">
									<legend className="hideElement-accessible">Contains:</legend>
									<InputAndLabel
										forId={`any-${facet.facetId}`}
										className="mr-3"
										type="radio"
										name={`operator-${facet.facetId}`}
										id={`any-${facet.facetId}`}
										label="Or"
										value="any"
										defaultChecked={operator === "ANY"}
										onChange={() =>
											props.onFilterChange(
												facet.facetId,
												"",
												"ANY",
												"toggleOperator"
											)
										}
									/>
									<InputAndLabel
										type="radio"
										name={`operator-${facet.facetId}`}
										forId={`all-${facet.facetId}`}
										id={`all-${facet.facetId}`}
										label="And"
										value="all"
										defaultChecked={operator === "ALL"}
										onChange={() =>
											props.onFilterChange(
												facet.facetId,
												"",
												"ALL",
												"toggleOperator"
											)
										}
									/>
								</fieldset>
							)}
						</>
					);
				} else if (facetOptions && facetOptions.length > 10) {
					// Create select typeahead from options
					// Get grouped ethnicity categories from dictionary
					const optionsSelectObj =
						facet.facetId !== "patient_ethnicity"
							? optionSelectObj(facetOptions)
							: optionSelectObj(Object.keys(ethnicityCategories));

					facetContent = (
						<Select
							closeMenuOnSelect
							blurInputOnSelect
							isMulti
							defaultValue={defaultValues}
							value={defaultValues}
							options={optionsSelectObj}
							onChange={(_, actionMeta) => {
								if (actionMeta.action === "pop-value") return;

								let option = "",
									action: onFilterChangeType["type"] = "add";

								switch (actionMeta.action) {
									case "remove-value":
										option = actionMeta.removedValue.value;
										action = "remove";
										break;
									case "select-option":
										option = actionMeta.option!.value;
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
							{facetOptions?.map((option) => (
								<li key={option}>
									<InputAndLabel
										forId={option}
										id={option}
										name={`${option}-name`}
										type="checkbox"
										label={option}
										checked={selection?.includes(option)}
										onChange={(
											e:
												| ChangeEvent<HTMLInputElement>
												| ChangeEvent<HTMLTextAreaElement>
										): void => {
											const target = e.target as HTMLInputElement;
											const actionType = target.checked ? "add" : "remove";

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
