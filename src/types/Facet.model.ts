export interface IFacetSidebarProps {
	facetSections?: Array<IFacetSectionProps>;
	sidebarSelection?: IFacetSidebarSelection;
	sidebarOperators?: IFacetSidebarOperators;
	loading?: boolean;
	onSelectionChange(
		sectionKey: string,
		facetKey: string,
		selection: Array<string>,
		operators: string
	): any;
	onReset(): void;
}

export interface IFacetSidebarOperators {
	[section: string]: { [facet: string]: string };
}

export interface IFacetSidebarSelection {
	[sectionKey: string]: IFacetSectionSelection;
}

export interface IFacetSectionSelection {
	[facetKey: string]: Array<string>;
}

export interface IFacetSectionProps {
	key: string;
	name: string;
	facets: Array<IFacetProps>;
	sectionSelection?: IFacetSectionSelection;
	sectionOperators?: { [facet: string]: string };
	onSelectionChange?(
		facetKey: string,
		selection: Array<string>,
		operator: string
	): void;
}

export interface IFacetProps {
	facetId: string;
	name: string;
	type: string;
	options: Array<string>;
	selection?: Array<string>;
	operator?: string;
	loading?: boolean;
	displayOperators?: boolean;
	placeholder?: string;
	onSelectionChange?(selection: Array<string>, operator: string): void;
}

export interface IOptionProps {
	key: string;
	name: string;
}
