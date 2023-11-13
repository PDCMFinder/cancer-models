import Select from "react-select";
import typeaheadStyles from "../../utils/typeaheadStyles";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { autoCompleteFacetOptions } from "../../apis/Search.api";
import { SelectOption } from "../SearchFilters/SearchFilterContent";
import { onFilterChangeType } from "../../pages/search";
import { IFacetSidebarSelection } from "../../types/Facet.model";
import Fragment from "../Fragment/Fragment";
import { useRouter } from "next/router";
import Label from "../Input/Label";

interface ISearchBarProps {
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
}

const SearchBar = (props: ISearchBarProps) => {
	const selectedFacetObj = props.selection && props.selection["search_terms"],
		selection = selectedFacetObj?.selection;
	const [query, setQuery] = useState("");
	const [facetId, setfacetId] = useState("");
	const [typeaheadData, setTypeaheadData] = useState<SelectOption[]>();
	const router = useRouter();

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

	const defaultValuesObj = selection?.map((value) => ({
		["label"]: value,
		["value"]: value,
	}));

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
				defaultValue={defaultValuesObj}
				value={defaultValuesObj}
				placeholder={"e.g. Melanoma"}
				loadingMessage={() => "Loading data"}
				noOptionsMessage={() => "Type to search"}
				styles={typeaheadStyles}
				components={{ DropdownIndicator: Fragment }}
				options={typeaheadData}
				onInputChange={(inputValue) =>
					onTypeaheadType("search_terms", inputValue)
				}
				onChange={(option, actionMeta) => {
					if (actionMeta.action === "pop-value") return;
					let newOption = "",
						action: onFilterChangeType["type"] = "add";
					if (option && !props.isMulti) {
						router.push({
							pathname: "search",
							// @ts-ignore
							search: `?filters=search_terms:${option.value}`,
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
