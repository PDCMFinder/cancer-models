export interface INavProps {
	routes: IRoute[];
}

export interface IRoute {
	path: string;
	name: string;
	secondary?: boolean;
	parent?: boolean;
	childTo?: string;
}
