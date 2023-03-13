const inputTypes = [
	"button",
	"checkbox",
	"color",
	"date",
	"datetime-local",
	"email",
	"file",
	"hidden",
	"image",
	"month",
	"number",
	"password",
	"radio",
	"range",
	"reset",
	"search",
	"submit",
	"tel",
	"text",
	"time",
	"url",
	"week",
] as const;

export interface INavProps {
	routes: IRoute[];
}

export interface IRoute {
	path?: string;
	name: string;
	secondary?: boolean;
	children?: {
		path: string;
		name: string;
	}[];
}

export interface ILabelProps {
	label: string;
	name: string;
	className?: string;
}

export interface IInputProps {
	name: string;
	id?: string;
	type: typeof inputTypes[number] | "textarea";
	placeholder?: string;
	className?: string;
	value?: string;
	onChange?: function;
	checked?: boolean;
	defaultChecked?: boolean;
}

export interface IArrowIconProps {
	direction?: "up" | "right" | "down" | "left";
}

export interface ITabProps {
	props: {
		label: string;
		content: any;
	};
}

export interface ISearchFiltersProps {
	filterData: {
		facet_section: string;
		facet_filters: {
			facet_name: string;
			facet_column: string;
			facet_options: string[];
			facet_example?: string;
		}[];
	}[];
}

export interface ISearchResult {
	patient_age: string;
	patient_sex: string;
	external_model_id: string;
	model_type: string;
	data_source: string;
	histology: string;
	primary_site: string;
	collection_site: string;
	tumour_type: string;
	dataset_available: string[];
}
