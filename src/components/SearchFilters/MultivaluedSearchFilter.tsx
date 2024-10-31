import { memo, useEffect, useState } from "react";
import { useQuery } from "react-query";
import Select from "react-select";
import { autoCompleteFacetOptions } from "../../apis/Search.api";
import useDebounce from "../../hooks/useDebounce";
import { onFilterChangeType } from "../../pages/search";
import { FacetProps, FacetSectionSelection } from "../../types/Facet.model";
import typeaheadStyles from "../../utils/typeaheadStyles";
import Fragment from "../Fragment/Fragment";
import { SelectOption } from "./SearchFilterContent";

type MultivaluedSearchFilterProps = {
	facet: FacetProps;
	onFilterChange: any;
	operator: FacetSectionSelection["operator"];
};

const MultivaluedSearchFilter = ({
	facet,
	onFilterChange,
	operator
}: MultivaluedSearchFilterProps) => {
	const [typeaheadData, setTypeaheadData] = useState<SelectOption[]>();
	const [debouncedValue, debounceValue, setDebounceValue] = useDebounce(
		"",
		350 // https://lawsofux.com/doherty-threshold/
	);

	let selectOptionsQuery = useQuery(
		[facet.facetId, debouncedValue],
		() => autoCompleteFacetOptions(facet.facetId, debouncedValue),
		{
			onSuccess(data) {
				setTypeaheadData(data);
			},
			enabled: debouncedValue !== ""
		}
	);

	useEffect(() => {
		setTypeaheadData(selectOptionsQuery.data);
	}, [selectOptionsQuery.data]);

	const placeholder = facet.placeholder
		? `Eg. ${facet.placeholder}`
		: "Select...";

	return (
		<Select
			closeMenuOnSelect
			blurInputOnSelect
			isMulti
			placeholder={placeholder}
			options={typeaheadData}
			onInputChange={(inputValue) => setDebounceValue(inputValue)}
			onFocus={() => {
				// reset options, theyre maintaining even after changing Selects
				setTypeaheadData([]);
			}}
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

				onFilterChange(facet.facetId, option, operator, action);
			}}
			styles={typeaheadStyles}
			components={{ DropdownIndicator: Fragment }}
		/>
	);
};

export default memo(MultivaluedSearchFilter);
