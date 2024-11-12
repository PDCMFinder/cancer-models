import type { AppProps } from "next/app";
import { Merriweather, Space_Mono } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { CookieConditions } from "../components/CookieConsentBanner/CookieConsentBanner";
import Layout from "../components/Layout/Layout";
import { AddRemove } from "../components/Navbar/Navbar-mobile/Navbar-mobile";
import "../styles/globals.scss";
import handleBodyClass from "../utils/handleBodyClass";

const USERNAVIGATION_MOUSE = "userNavigation-mouse",
	USERNAVIGATION_KEYBOARD = "userNavigation-keyboard",
	KEYDOWN = "keydown",
	MOUSEMOVE = "mousemove",
	MOUSEDOWN = "mousedown";

const merriweather = Merriweather({
	weight: "400",
	subsets: ["latin"],
	display: "swap"
});
const spaceMono = Space_Mono({
	weight: ["400", "700"],
	subsets: ["latin"],
	display: "swap"
});

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
	require("../mocks");
}

function CancerModels({ Component, pageProps }: AppProps) {
	const [cookies] = useCookies();
	const [isConsented, setIsConsented] = useState<
		Record<string, CookieConditions>
	>({ ga: CookieConditions.rejected, hj: CookieConditions.rejected });
	const { asPath } = useRouter();
	// hardcode envhost so we don't have to use getserverprops on whole app
	const envHost = "https://www.cancermodels.org";

	useEffect(() => {
		handleBodyClass([USERNAVIGATION_MOUSE], AddRemove.add);

		const handleKeyDown = () => {
			handleBodyClass([USERNAVIGATION_KEYBOARD], AddRemove.add);
			handleBodyClass([USERNAVIGATION_MOUSE], AddRemove.remove);
		};
		const handleMouseMove = () => {
			handleBodyClass([USERNAVIGATION_MOUSE], AddRemove.add);
			handleBodyClass([USERNAVIGATION_KEYBOARD], AddRemove.remove);
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

	useEffect(() => {
		setIsConsented({
			ga: cookies["cm_consent"]?.ga,
			hj: cookies["cm_consent"]?.hj
		});
	}, [cookies["cm_consent"]]);

	const isProductionEnvironment =
		process.env.NEXT_PUBLIC_APP_ENV === "production";

	const hjScript =
		isConsented.hj === CookieConditions.accepted ? (
			<Script id="hotjar" strategy="afterInteractive">
				{`(function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:3209855,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
			</Script>
		) : null;

	const gaScript =
		isConsented.ga === CookieConditions.accepted ? (
			<>
				<Script
					strategy="afterInteractive"
					id="google-tagManager"
					src="https://www.googletagmanager.com/gtag/js?id=G-34S5KH94SX"
				/>
				<Script id="google-analytics" strategy="afterInteractive">
					{`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-34S5KH94SX', {
                page_path: window.location.pathname,
              });`}
				</Script>
			</>
		) : null;

	return (
		<>
			<Head>
				<title>
					Cancer Models: Patient-Derived Xenografts, Organoids, Cells
				</title>
				<meta
					name="google-site-verification"
					content="clD2XSBe-DY5OecwoxXxNLdVTBaJeB54be_1zPj9DBA"
				/>
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
				<link rel="canonical" href={`${envHost}${asPath.split("?")[0]}`} />

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
			{isProductionEnvironment ? hjScript : null}
			{isProductionEnvironment ? gaScript : null}
			<CookiesProvider defaultSetOptions={{ path: "/" }}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</CookiesProvider>
		</>
	);
}

export default CancerModels;
