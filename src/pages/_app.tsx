import { useEffect } from "react";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Merriweather } from "@next/font/google";
import { Space_Mono } from "@next/font/google";
import Layout from "../components/Layout/Layout";
import Head from "next/head";
import handleBodyClass from "../utils/handleBodyClass";
import { QueryClient, QueryClientProvider } from "react-query";

const USERNAVIGATION_MOUSE = "userNavigation--mouse",
	USERNAVIGATION_KEYBOARD = "userNavigation--keyboard",
	ADD = "add",
	REMOVE = "remove",
	KEYDOWN = "keydown",
	MOUSEMOVE = "mousemove",
	MOUSEDOWN = "mousedown";

const merriweather = Merriweather({
	weight: "400",
});
const spaceMono = Space_Mono({
	weight: ["400", "700"],
});

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
	require("../mocks");
}

function CancerModels({ Component, pageProps }: AppProps) {
	useEffect(() => {
		handleBodyClass([USERNAVIGATION_MOUSE], ADD);

		const handleKeyDown = () => {
			handleBodyClass([USERNAVIGATION_KEYBOARD], ADD);
			handleBodyClass([USERNAVIGATION_MOUSE], REMOVE);
		};
		const handleMouseMove = () => {
			handleBodyClass([USERNAVIGATION_MOUSE], ADD);
			handleBodyClass([USERNAVIGATION_KEYBOARD], REMOVE);
		};

		document.addEventListener(KEYDOWN, handleKeyDown);
		document.addEventListener(MOUSEMOVE, handleMouseMove);
		document.addEventListener(MOUSEDOWN, handleMouseMove);

		return () => {
			document.removeEventListener(KEYDOWN, handleKeyDown);
			document.removeEventListener(MOUSEMOVE, handleMouseMove);
			document.removeEventListener(MOUSEDOWN, handleMouseMove);
		};
	}, []);

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: Infinity,
				refetchOnWindowFocus: false,
			},
		},
	});

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Head>
					<title>Patient Derived Cancer Models</title>
					<meta name="description" content="Patient Derived Cancer Models" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<style jsx global>{`
					:root {
						--type-primary: ${merriweather.style.fontFamily}, serif;
						--type-secondary: ${spaceMono.style.fontFamily}, monospace;
					}
				`}</style>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</QueryClientProvider>
		</>
	);
}

export default CancerModels;
