import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useQuery } from "react-query";
import { getModelCount } from "../apis/AggregatedData.api";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import Label from "../components/Input/Label";
import Loader from "../components/Loader/Loader";
import ShowHide from "../components/ShowHide/ShowHide";
import useWindowDimensions from "../hooks/useWindowDimensions";
import breakPoints from "../utils/breakpoints";
import { ProjectButtons } from "./about/providers";
import styles from "./index.module.scss";

const DynamicDataCountCard = dynamic(
	import("../components/DataCountCard/DataCountCard"),
	{
		loading: () => (
			<div style={{ height: "300px" }}>
				<Loader />
			</div>
		),
		ssr: false
	}
);
const DynamicSearchBar = dynamic(
	() => import("../components/SearchBar/SearchBar"),
	{
		loading: () => (
			<div style={{ height: "50px" }}>
				<Loader />
			</div>
		),
		ssr: false
	}
);

const Home: NextPage = () => {
	const { windowWidth } = useWindowDimensions();
	const bpLarge = breakPoints.large;
	const modelCount = useQuery("modelCount", () => getModelCount());

	return (
		<>
			<header className="mt-lg-3">
				<div className={styles.header_container}>
					<ShowHide windowWidth={windowWidth || 0} showOver={bpLarge}>
						<div
							className={`${styles.header_graphicElement} position-relative`}
						>
							<DynamicDataCountCard layout="vertical" iconSize="1em" />
						</div>
					</ShowHide>
					<div
						className={`${styles.header_title} flex-column d-flex py-5 py-lg-0`}
					>
						<h1 className="h2 mt-lg-1">
							Find the right PDX, organoid and cell line patient-derived cancer
							model for your next project.
						</h1>
						{/* <div className="col-12 col-lg-10">
							<p className="mb-0">
								Looking for PDX Finder? That&apos;s us! We have expanded to
								organoids and cell lines and are now called CancerModels.Org.{" "}
							</p>
						</div> */}
					</div>
					<div className={styles.header_searchBackground}></div>
					<div className={`${styles.header_search} py-5`}>
						<Label
							name="searchBar"
							forId="searchBar-label"
							className="h3 text-white"
							label={`Search ${
								modelCount && modelCount.data
									? `over ${modelCount.data.toLocaleString()}`
									: ""
							} cancer models`}
						/>
						<DynamicSearchBar id="searchBar-search-id" name="searchBar-name" />
					</div>
				</div>
			</header>
			<section>
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-12 col-lg-6">
							<h2>Some text about projects</h2>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
								id lectus nec turpis molestie pretium tristique imperdiet
								libero. Praesent sed mi tortor.
							</p>
						</div>
					</div>
					<div className="row justify-content-center">
						<div className="col-12 col-md-3 col-lg-2">
							<Card contentClassName="p-1" className="bg-lightGray">
								<ProjectButtons
									direction="column"
									activeProject={""}
									onClick={function (projectName: string): void {
										throw new Error("Function not implemented.");
									}}
								/>
							</Card>
						</div>
						<div className="col-12 col-md-9 col-lg-8">Providers</div>
					</div>
				</div>
			</section>
			<section className="pb-0">
				<section className="bg-primary-secondary">
					<div className="container my-4">
						<div className="row justify-content-center">
							<div className="col-12 col-lg-6 text-center text-white">
								<h2 className="mt-0">
									We can collect and display your data making you more
									discoverable and visible for end-users.
								</h2>
								<p className="mb-2">
									All submitted models adhere to the PDX-MI standard making it
									easy for researchers to search and compare models of interest.
								</p>
								<Button
									priority="primary"
									color="dark"
									href="/submit"
									htmlTag="a"
									className="mb-0 mt-5"
								>
									Submit data
								</Button>
							</div>
						</div>
					</div>
				</section>
			</section>
		</>
	);
};

export default Home;
