import { memo, useEffect, useState } from "react";
import { useQuery } from "react-query";
import Select from "react-select";
import { autoCompleteFacetOptions } from "../../apis/Search.api";
import { onFilterChangeType } from "../../pages/search";
import { IFacetProps, IFacetSectionSelection } from "../../types/Facet.model";
import typeaheadStyles from "../../utils/typeaheadStyles";
import Fragment from "../Fragment/Fragment";
import { SelectOption } from "./SearchFilterContent";

type Props = {
	facet: IFacetProps;
	defaultValues: SelectOption[];
	onFilterChange: any;
	operator: IFacetSectionSelection["operator"];
};

const MultivaluedSearchFilter = ({
	facet,
	defaultValues,
	onFilterChange,
	operator
}: Props) => {
	const [query, setQuery] = useState("");
	const [facetId, setfacetId] = useState("");
	const [typeaheadData, setTypeaheadData] = useState<SelectOption[]>();

	let selectOptionsQuery = useQuery(
		[facetId, query],
		() => autoCompleteFacetOptions(facetId, query),
		{
			onSuccess(data) {
				setTypeaheadData(data);
			}
		}
	);

	useEffect(() => {
		setTypeaheadData(selectOptionsQuery.data);
	}, [query, facetId, selectOptionsQuery.data]);

	const onTypeaheadType = (facetId: string, query: string) => {
		setQuery(query);
		setfacetId(facetId);
	};

	const placeholder = facet.placeholder
		? `Eg. ${facet.placeholder}`
		: "Select...";

	return (
		<Select
			closeMenuOnSelect
			blurInputOnSelect
			isMulti
			defaultValue={defaultValues}
			value={defaultValues}
			placeholder={placeholder}
			options={typeaheadData}
			onInputChange={(inputValue) => onTypeaheadType(facet.facetId, inputValue)}
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
