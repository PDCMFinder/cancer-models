import { CSSProperties } from "react";

type CamelCase<S extends string> =
	S extends `${infer P1}_${infer P2}${infer P3}`
		? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
		: Lowercase<S>;

type CamelCaseKeys<T> = T extends Array<infer U>
	? Array<CamelCaseKeys<U>>
	: T extends object
	? {
			[K in keyof T as CamelCase<string & K>]: CamelCaseKeys<T[K]>;
	  }
	: T;

type CSSUnit =
	| "em"
	| "rem"
	| "px"
	| "vh"
	| "vw"
	| "vmin"
	| "vmax"
	| "pt"
	| "cm"
	| "mm"
	| "in"
	| "pc"
	| "ch"
	| "ex"
	| "fr"
	| "%"
	| "s"
	| "ms";

export type CSSSize = `${number}${CSSUnit}`;

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
	"week"
] as const;

export interface INavProps {
	routes: IRoute[];
}

export interface IRoute {
	path?: string;
	name: string;
	secondary?: boolean;
	opensNewTab?: boolean;
	children?: {
		path: string;
		name: string;
		opensNewTab?: boolean;
	}[];
}

export interface ILabelProps {
	label: string;
	forId: string;
	name: string;
	className?: string;
	style?: CSSProperties;
}

export interface IInputProps {
	name: string;
	id?: string;
	type: typeof inputTypes[number] | "textarea";
	placeholder?: string;
	className?: string;
	value?: string;
	onChange?: (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => void;
	inputRef?: MutableRefObject<undefined>;
	required?: boolean;
	checked?: boolean;
	defaultChecked?: boolean;
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
