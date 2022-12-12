import { IRoute } from "./src/utils/routes";

interface INavProps {
	routes: IRoute;
}

interface IRoute {
	path: string;
	name: string;
	parent?: boolean;
	child?: boolean;
	childTo?: string;
}
