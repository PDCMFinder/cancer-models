export type Route = {
	path?: string;
	name: string;
	secondary?: boolean;
	opensNewTab?: boolean;
	children?: {
		path: string;
		name: string;
		opensNewTab?: boolean;
	}[];
};