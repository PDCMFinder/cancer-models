export type IFacetSidebarProps = {
	facetSections?: IFacetSectionProps[];
	sidebarSelection?: IFacetSidebarSelection;
	sidebarOperators?: IFacetSidebarOperators;
	loading?: boolean;
	onSelectionChange(
		sectionKey: string,
		facetKey: string,
		selection: string[],
		operators: string
	): any;
	onReset(): void;
};

export type IFacetOperator = {
	facetColumn: string;
	anyOperator: string | null;
	allOperator: string | null;
	facetType: "multivalued" | "autocomplete" | "check";
};

export type IFacetSidebarOperators = {
	[section: string]: { [facet: string]: string };
};

export type IFacetSidebarSelection = {
	[facetKey: string]: IFacetSectionSelection;
};

export type IFacetSectionSelection = {
	selection: string[];
	operator: "ANY" | "ALL";
};

export type IFacetSectionProps = {
	key: string;
	name: string;
	facets: IFacetProps[];
	sectionSelection?: IFacetSectionSelection;
	sectionOperators?: { [facet: string]: string };
	onSelectionChange?(
		facetKey: string,
		selection: string[],
		operator: string
	): void;
};

export type IFacetProps = {
	facetId: string;
	name: string;
	type: string;
	options: string[];
	selection?: string[];
	operator?: string;
	loading?: boolean;
	displayOperators?: boolean;
	placeholder?: string | null;
	onSelectionChange?(selection: string[], operator: string): void;
	isBoolean: boolean;
	description?: string;
};

export type IOptionProps = {
	key: string;
	name: string;
};
