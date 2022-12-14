import { useEffect } from "react";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Merriweather } from "@next/font/google";
import { Space_Mono } from "@next/font/google";
import Layout from "../components/Layout/Layout";
import Head from "next/head";

const merriweather = Merriweather({
	weight: "400",
});
const spaceMono = Space_Mono({
	weight: ["400", "700"],
});

function CancerModels({ Component, pageProps }: AppProps) {
	useEffect(() => {
		document.body.classList.add("userNavigation--mouse");

		const handleKeyDown = () => {
			document.body.classList.add("userNavigation--keyboard");
			document.body.classList.remove("userNavigation--mouse");
		};
		const handleMouseMove = () => {
			document.body.classList.add("userNavigation--mouse");
			document.body.classList.remove("userNavigation--keyboard");
		};

		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mousedown", handleMouseMove);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mousedown", handleMouseMove);
		};
	}, []);

	return (
		<>
			<Head>
				<title>Patient Derived Cancer Models</title>
				<meta name="description" content="Patient Derived Cancer Models" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
		</>
	);
}

export default CancerModels;
