export interface IFacetSidebarProps {
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
}

export interface IFacetSidebarOperators {
	[section: string]: { [facet: string]: string };
}

export interface IFacetSidebarSelection {
	[facetKey: string]: IFacetSectionSelection;
}

export interface IFacetSectionSelection {
	selection: string[];
	operator: "ANY" | "ALL";
}

export interface IFacetSectionProps {
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
}

export interface IFacetProps {
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
}

export interface IOptionProps {
	key: string;
	name: string;
}
