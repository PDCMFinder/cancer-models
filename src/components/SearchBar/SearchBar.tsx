import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Select, {
	ClearActionMeta,
	components,
	CreateOptionActionMeta,
	DeselectOptionActionMeta,
	PopValueActionMeta,
	RemoveValueActionMeta,
	SelectOptionActionMeta
} from "react-select";
import { autoCompleteFacetOptions } from "../../apis/Search.api";
import useDebounce from "../../hooks/useDebounce";
import { onFilterChangeType } from "../../pages/search";
import { FacetSidebarSelection } from "../../types/Facet.model";
import typeaheadStyles from "../../utils/typeaheadStyles";
import Fragment from "../Fragment/Fragment";
import Label from "../Input/Label";
import {
	SelectOption,
	selectOptions
} from "../SearchFilters/SearchFilterContent";

type SearchBarProps = {
	id: string;
	name: string;
	isMulti?: boolean;
	selection?: FacetSidebarSelection;
	onFilterChange?: (
		facetId: string,
		selection: string,
		operator: string,
		type: onFilterChangeType["type"]
	) => void;
};

type ActionMeta<SelectOption> =
	| SelectOptionActionMeta<SelectOption>
	| DeselectOptionActionMeta<SelectOption>
	| RemoveValueActionMeta<SelectOption>
	| PopValueActionMeta<SelectOption>
	| ClearActionMeta<SelectOption>
	| CreateOptionActionMeta<SelectOption>;

const Input = (props: any) => {
	return <components.Input {...props} data-hj-allow={true} />;
};

const SearchBar = ({
	id,
	name,
	isMulti,
	onFilterChange,
	selection
}: SearchBarProps) => {
	const router = useRouter();
	const [typeaheadData, setTypeaheadData] = useState<SelectOption[]>();
	const [debouncedValue, debounceValue, setDebounceValue] = useDebounce(
		"",
		350 // https://lawsofux.com/doherty-threshold/
	);

	const selectOptionsQuery = useQuery(
		debouncedValue,
		() => autoCompleteFacetOptions("search_terms", debouncedValue),
		{
			onSuccess(data) {
				setTypeaheadData(data);
			},
			enabled: !!debouncedValue
		}
	);

	useEffect(() => {
		setTypeaheadData(selectOptionsQuery.data);
	}, [selectOptionsQuery.data]);

	const defaultValues = selectOptions(selection?.search_terms?.selection ?? []);

	return (
		<>
			<Label
				className="mb-0 text-white"
				label="Search by cancer diagnosis"
				forId={id}
				name={name}
			/>
			<Select
				isLoading={selectOptionsQuery.isLoading}
				instanceId={id}
				id={id}
				value={defaultValues}
				inputId={id + "select"}
				name={name}
				aria-label="Search by cancer diagnosis"
				aria-labelledby={id}
				className="lh-1"
				classNames={{ input: () => "data-hj-allow" }}
				closeMenuOnSelect={isMulti}
				blurInputOnSelect={isMulti}
				isMulti={isMulti}
				placeholder={"e.g. Melanoma"}
				loadingMessage={() => "Loading data"}
				noOptionsMessage={() => "Type to search"}
				styles={typeaheadStyles}
				components={{ DropdownIndicator: Fragment, Input }}
				options={debounceValue !== debouncedValue ? [] : typeaheadData}
				onInputChange={(inputValue: string) => {
					setDebounceValue(inputValue);
				}}
				onChange={(
					option: SelectOption | null,
					actionMeta: ActionMeta<SelectOption>
				) => {
					if (actionMeta.action === "pop-value") return;
					let newOption = "",
						action: onFilterChangeType["type"] = "add";
					if (option && !isMulti) {
						router.push({
							pathname: "search",
							// @ts-ignore
							search: `?filters=search_terms:${option.value}`
						});
					} else {
						switch (actionMeta.action) {
							case "remove-value":
								newOption = actionMeta.removedValue.value;
								action = "remove";
								break;
							case "select-option":
								newOption = actionMeta.option!.value;
								break;
							case "clear":
								action = "clear";
								break;
						}

						onFilterChange &&
							onFilterChange("search_terms", newOption, "", action);
					}
				}}
			/>
		</>
	);
};

export default SearchBar;
