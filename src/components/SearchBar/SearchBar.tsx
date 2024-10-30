import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Select from "react-select";
import { autoCompleteFacetOptions } from "../../apis/Search.api";
import useDebounce from "../../hooks/useDebounce";
import { onFilterChangeType } from "../../pages/search";
import { IFacetSidebarSelection } from "../../types/Facet.model";
import typeaheadStyles from "../../utils/typeaheadStyles";
import Fragment from "../Fragment/Fragment";
import Label from "../Input/Label";
import { SelectOption } from "../SearchFilters/SearchFilterContent";

type ISearchBarProps = {
	id: string;
	name: string;
	isMulti?: boolean;
	selection?: IFacetSidebarSelection;
	onFilterChange?: (
		facetId: string,
		selection: string,
		operator: string,
		type: onFilterChangeType["type"]
	) => void;
};

const SearchBar = (props: ISearchBarProps) => {
	const [typeaheadData, setTypeaheadData] = useState<SelectOption[]>();
	const router = useRouter();
	const [debouncedValue, debounceValue, setDebounceValue] = useDebounce(
		"",
		500
	);

	let selectOptionsQuery = useQuery(
		debouncedValue,
		() => autoCompleteFacetOptions("search_terms", debouncedValue),
		{
			onSuccess(data) {
				setTypeaheadData(data);
			},
			enabled: debouncedValue !== ""
		}
	);

	useEffect(() => {
		setTypeaheadData(selectOptionsQuery.data);
	}, [debouncedValue]);

	return (
		<>
			<Label
				className="mb-0 text-white"
				label="Search by cancer diagnosis"
				forId={props.id}
				name={props.name}
			/>
			<Select
				instanceId={props.id}
				id={props.id}
				inputId={props.id + "select"}
				name={props.name}
				aria-label="Search by cancer diagnosis"
				aria-labelledby={props.id}
				className="lh-1"
				closeMenuOnSelect={props.isMulti}
				blurInputOnSelect={props.isMulti}
				isMulti={props.isMulti}
				placeholder={"e.g. Melanoma"}
				loadingMessage={() => "Loading data"}
				noOptionsMessage={() => "Type to search"}
				styles={typeaheadStyles}
				components={{ DropdownIndicator: Fragment }}
				options={typeaheadData}
				onInputChange={(inputValue) => setDebounceValue(inputValue)}
				onChange={(option, actionMeta) => {
					if (actionMeta.action === "pop-value") return;
					let newOption = "",
						action: onFilterChangeType["type"] = "add";
					if (option && !props.isMulti) {
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

						props.onFilterChange &&
							props.onFilterChange("search_terms", newOption, "", action);
					}
				}}
			/>
		</>
	);
};

export default SearchBar;
