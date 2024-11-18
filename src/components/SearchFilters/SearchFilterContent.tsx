import Select from "react-select";
import { onFilterChangeType } from "../../pages/search";
import {
	FacetProps,
	FacetSectionProps,
	FacetSidebarSelection
} from "../../types/Facet.model";
import { ethnicityCategories } from "../../utils/collapseEthnicity";
import typeaheadStyles from "../../utils/typeaheadStyles";
import InformationIcon from "../InformationIcon/InformationIcon";
import InputAndLabel from "../Input/InputAndLabel";
import MultivaluedSearchFilter from "./MultivaluedSearchFilter";

type SearchFilterContentProps = {
	data: FacetProps[];
	facetSelection: FacetSidebarSelection;
	facet: FacetSectionProps;
	onFilterChange: (
		facetId: string,
		selection: string,
		operator: string,
		type: onFilterChangeType["type"]
	) => void;
};

export type SelectOption = { label: string; value: string };

const optionSelectObj = (options: string[]): SelectOption[] => {
	return options?.map((value: string) => ({
		["label"]: value,
		["value"]: value
	}));
};

const SearchFilterContent = (props: SearchFilterContentProps) => {
	return (
		<>
			{props.data.map((facet: FacetProps) => {
				let facetContent = null;
				const facetName = facet.name,
					facetType = facet.type,
					facetOptions = facet.options,
					isBoolean = facet.isBoolean,
					selectedFacetObj =
						props.facetSelection && props.facetSelection[facet.facetId],
					selection = selectedFacetObj?.selection,
					operator = selectedFacetObj?.operator;

				const displayOperators = facetType === "multivalued";

				if (facetType === "autocomplete" || facetType === "multivalued") {
					facetContent = (
						<>
							<MultivaluedSearchFilter
								facet={facet}
								onFilterChange={props.onFilterChange}
								operator={operator}
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
				} else if (facetType === "check" && (facetOptions ?? []).length >= 10) {
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
				} else if (facetType === "check") {
					// Create checkbox per option
					facetContent = (
						<ul className="ul-noStyle m-0">
							{facetOptions?.map((option) => {
								// if it's boolean, .split("="). First element is label, second element is passed as option value
								const label: string = isBoolean ? option.split("=")[0] : option,
									value = isBoolean ? option.split("=")[1] : option;

								return (
									<li key={label}>
										<InputAndLabel
											forId={label}
											id={label}
											name={`${label}-name`}
											type="checkbox"
											label={label}
											checked={selection?.includes(value)} // no problem passing value since we're checking if it's boolean, if not, pass option as normally. This works for boolean filters
											onChange={(e): void => {
												const target = e.target as HTMLInputElement;
												const actionType = target.checked ? "add" : "remove";

												props.onFilterChange(
													facet.facetId,
													value,
													operator,
													actionType
												);
											}}
										/>
									</li>
								);
							})}
						</ul>
					);
				}

				return (
					<div className="w-100" key={facetName}>
						<h3 className="mb-0 p text-bold d-inline-block text-capitalize">
							{facetName}
						</h3>
						{facet.description && (
							<InformationIcon information={facet.description} />
						)}
						<hr />
						<span className="text-capitalize">{facetContent}</span>
					</div>
				);
			})}
		</>
	);
};

export default SearchFilterContent;
