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
