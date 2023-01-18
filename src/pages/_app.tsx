import { useEffect } from "react";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Merriweather } from "@next/font/google";
import { Space_Mono } from "@next/font/google";
import Layout from "../components/Layout/Layout";
import Head from "next/head";
import handleBodyClass from "../utils/handleBodyClass";

const USERNAVIGATION_MOUSE = "userNavigation-mouse",
	USERNAVIGATION_KEYBOARD = "userNavigation-keyboard",
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

	return (
		<>
			<Head>
				<title>Cancer Models Finder</title>
				<meta name="description" content="Patient Derived Cancer Models" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta property="og:image" content="/ogimage.png" />

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
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}

export default CancerModels;
