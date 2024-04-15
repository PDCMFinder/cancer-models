import { useEffect, useState } from "react";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import App, { AppContext } from "next/app";
import { Merriweather } from "@next/font/google";
import { Space_Mono } from "@next/font/google";
import Layout from "../components/Layout/Layout";
import Head from "next/head";
import handleBodyClass from "../utils/handleBodyClass";
import { Cookies, CookiesProvider } from "react-cookie";
import Script from "next/script";
import { HJ_ID } from "../utils/hotjar";
import { useRouter } from "next/router";

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
function CancerModels({ Component, pageProps, cookies, host }: AppProps) {
	const { asPath } = useRouter();
	const [envHost] = useState(host);
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

	const isProductionEnvironment =
		process.env.NEXT_PUBLIC_APP_ENV === "production";

	return (
		<>
			<Head>
				<title>
					Cancer Models: Patient-Derived Xenografts, Organoids, Cells
				</title>
				<meta
					name="description"
					content="Discover the largest catalog of patient-derived xenograft, organoid, and cell cancer models for your next project."
				/>
				<meta
					name="keywords"
					content="Patient-derived models, Cancer research models, PDX models, Cell line models, Organoid models, Cancer model repositories, Molecular data"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta property="og:image" content="/ogimage.png" />
				{/* canonical url without params */}
				<link
					rel="canonical"
					href={`https://${envHost + asPath.split("?")[0]}`}
				/>

				{/* Generics */}
				<link rel="icon" href="/favicon-32.png" sizes="32x32" />
				<link rel="icon" href="/favicon-128.png" sizes="128x128" />
				<link rel="icon" href="/favicon-192.png" sizes="192x192" />

				{/* Android */}
				<link rel="shortcut icon" href="/favicon-196.png" sizes="196x196" />

				{/* iOS */}
				<link rel="apple-touch-icon" href="/favicon-152.png" sizes="152x152" />
				<link rel="apple-touch-icon" href="/favicon-152.png" sizes="167x167" />
				<link rel="apple-touch-icon" href="/favicon-180.png" sizes="180x180" />
			</Head>
			<style jsx global>{`
				:root {
					--type-primary: ${merriweather.style.fontFamily}, serif;
					--type-secondary: ${spaceMono.style.fontFamily}, monospace;
				}
			`}</style>
			{isProductionEnvironment && (
				<>
					{/* Hotjar Tracking Code for Cancer Models Org */}
					<Script id="hotjar" strategy="beforeInteractive">
						{`(function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:${HJ_ID},hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
					</Script>
					{/* Google Analytics code */}
					<Script
						strategy="beforeInteractive"
						id="google-tagManager"
						src="https://www.googletagmanager.com/gtag/js?id=G-34S5KH94SX"
					/>
					<Script id="google-analytics" strategy="beforeInteractive">
						{`window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-34S5KH94SX', {
                      page_path: window.location.pathname,
                  });`}
					</Script>
				</>
			)}
			<CookiesProvider
				cookies={isBrowser ? undefined : new Cookies(cookies)}
				defaultSetOptions={{ path: "/" }}
			>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</CookiesProvider>
		</>
	);
}

export default CancerModels;

CancerModels.getInitialProps = async (appContext: AppContext) => {
	const appProps = await App.getInitialProps(appContext);

	// bfcache ; ssr caching. Commented because its sending double headers in modelid page, doesn't affect lighthouse much
	// appContext.ctx.res?.setHeader(
	// 	"Cache-Control",
	// 	"public, s-maxage=100, stale-while-revalidate=590"
	// );

	return {
		...appProps,
		cookies: appContext.ctx.req?.headers?.cookie,
		host: appContext.ctx.req?.headers?.host,
	};
};
