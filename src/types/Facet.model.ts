export type FacetOperator = {
	facetColumn: string;
	anyOperator: string | null;
	allOperator: string | null;
	facetType: "multivalued" | "autocomplete" | "check";
};

export type FacetSidebarSelection = {
	[facetKey: string]: FacetSectionSelection;
};

export type FacetSectionSelection = {
	selection: string[];
	operator: "ANY" | "ALL";
};

export type FacetSectionProps = {
	key: string;
	name: string;
	facets: FacetProps[];
	sectionSelection?: FacetSectionSelection;
	sectionOperators?: { [facet: string]: string };
	onSelectionChange?(
		facetKey: string,
		selection: string[],
		operator: string
	): void;
};

export type FacetProps = {
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
