import styles from "./SearchBar.module.scss";
import Select from "react-select";
import typeaheadStyles from "../../utils/typeaheadStyles";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { autoCompleteFacetOptions } from "../../apis/Search.api";
import { SelectOption } from "../SearchFilters/SearchFilterContent";
import { onFilterChangeType } from "../../pages/search";
import { IFacetSidebarSelection } from "../../types/Facet.model";

interface ISearchBarProps {
	selection: IFacetSidebarSelection;
	onFilterChange: (
		facetId: string,
		selection: string,
		operator: string,
		type: onFilterChangeType["type"]
	) => void;
}

const FragmentComponent = () => {
	return <></>;
};

const SearchBar = (props: ISearchBarProps) => {
	const selectedFacetObj = props.selection && props.selection["search_terms"],
		selection = selectedFacetObj?.selection;
	const [query, setQuery] = useState("");
	const [facetId, setfacetId] = useState("");
	const [typeaheadData, setTypeaheadData] = useState<SelectOption[]>();

	let selectOptionsQuery = useQuery(
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
			<Select
				closeMenuOnSelect
				blurInputOnSelect
				isMulti
				defaultValue={defaultValuesObj}
				value={defaultValuesObj}
				placeholder={"Cancer diagnosis e.g. Melanoma"}
				loadingMessage={() => "Loading data"}
				noOptionsMessage={() => "Type to search"}
				styles={typeaheadStyles}
				components={{ DropdownIndicator: FragmentComponent }}
				options={typeaheadData}
				onInputChange={(inputValue) =>
					onTypeaheadType("search_terms", inputValue)
				}
				onChange={(_, actionMeta) => {
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

					props.onFilterChange("search_terms", option, "", action);
				}}
			/>
		</>
	);
};

export default SearchBar;
