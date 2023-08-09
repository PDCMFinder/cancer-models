import "!style-loader!css-loader!sass-loader!../src/styles/globals.scss";
import { RouterContext } from "next/dist/shared/lib/router-context";
import Link from "next/link";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
			refetchOnWindowFocus: true,
		},
	},
});

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	nextRouter: {
		Provider: RouterContext.Provider,
		path: "/", // defaults to `/`
		asPath: "/", // defaults to `/`
		query: {}, // defaults to `{}`
		push() {}, // defaults to using addon actions integration,
		//   can override any method in the router
	},
};

Object.defineProperty(Link, "default", {
	configurable: true,
	value: (props) => <a {...props}>{props.children}</a>,
});

export const decorators = [
	(Story) => (
		<QueryClientProvider client={queryClient}>
			<div style={{ margin: "1.5rem" }}>
				<Story />
			</div>
		</QueryClientProvider>
	),
];
