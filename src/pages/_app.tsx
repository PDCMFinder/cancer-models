import { useEffect } from "react";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import App, { AppContext } from "next/app";
import { Merriweather } from "@next/font/google";
import { Space_Mono } from "@next/font/google";
import Layout from "../components/Layout/Layout";
import Head from "next/head";
import handleBodyClass from "../utils/handleBodyClass";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Cookies, CookiesProvider } from "react-cookie";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Script from "next/script";

const USERNAVIGATION_MOUSE = "userNavigation-mouse",
	USERNAVIGATION_KEYBOARD = "userNavigation-keyboard",
	ADD = "add",
	REMOVE = "remove",
	KEYDOWN = "keydown",
	MOUSEMOVE = "mousemove",
	MOUSEDOWN = "mousedown";

const merriweather = Merriweather({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
});
const spaceMono = Space_Mono({
	weight: ["400", "700"],
	subsets: ["latin"],
	display: "swap",
});

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
	require("../mocks");
}

/* @ts-ignore */
function CancerModels({ Component, pageProps, cookies }: AppProps) {
	const isBrowser = typeof window !== "undefined";

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
				refetchOnWindowFocus: true,
			},
		},
	});

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Head>
					<title>
						CancerModels.Org - Find PDX, organoid and cell line cancer models
					</title>
					<meta
						name="description"
						content="The largest open catalog of harmonised patient-derived cancer models. Find the right PDX, organoid and cell line patient-derived cancer model for your next project."
					/>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<meta property="og:image" content="/ogimage.png" />

					{/* Generics */}
					<link rel="icon" href="/favicon-32.png" sizes="32x32" />
					<link rel="icon" href="/favicon-128.png" sizes="128x128" />
					<link rel="icon" href="/favicon-192.png" sizes="192x192" />

					{/* Android */}
					<link rel="shortcut icon" href="/favicon-196.png" sizes="196x196" />

					{/* iOS */}
					<link
						rel="apple-touch-icon"
						href="/favicon-152.png"
						sizes="152x152"
					/>
					<link
						rel="apple-touch-icon"
						href="/favicon-152.png"
						sizes="167x167"
					/>
					<link
						rel="apple-touch-icon"
						href="/favicon-180.png"
						sizes="180x180"
					/>
				</Head>
				<style jsx global>{`
					:root {
						--type-primary: ${merriweather.style.fontFamily}, serif;
						--type-secondary: ${spaceMono.style.fontFamily}, monospace;
					}
				`}</style>
				<GoogleReCaptchaProvider reCaptchaKey="6LepEiwjAAAAAN9QFU8RpeY0QXCFoRRVVis2B-iF">
					<CookiesProvider
						cookies={isBrowser ? undefined : new Cookies(cookies)}
					>
						<Layout>
							<>
								<ReactQueryDevtools initialIsOpen={false} />
								<Component {...pageProps} />
							</>
						</Layout>
					</CookiesProvider>
				</GoogleReCaptchaProvider>
			</QueryClientProvider>
		</>
	);
}

export default CancerModels;

CancerModels.getInitialProps = async (appContext: AppContext) => {
	const appProps = await App.getInitialProps(appContext);

	return { ...appProps, cookies: appContext.ctx.req?.headers?.cookie };
};
