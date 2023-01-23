import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "../components/Button/Button";
import bannerImage from "../../public/national-cancer-institute-cT0SCB8pb04.jpg";
import ShowHide from "../components/ShowHide/ShowHide";
import useWindowDimensions from "../hooks/useWindowDimensions";
import breakPoints from "../utils/breakpoints";
import Card from "../components/Card/Card";
import BlogPreview from "../components/Blog/BlogPreview";
import styles from "./index.module.scss";
import FeedbackSection from "../components/FeedbackSection/FeedbackSection";
import Input from "../components/Input/Input";
import Label from "../components/Input/Label";
import CirclePacking from "../components/CirclePacking/CirclePacking";
import {
	getCancerHierarchy,
	getModelsByType,
} from "../apis/AggregatedData.api";
import { useQuery } from "react-query";

const Home: NextPage = () => {
	const { windowWidth } = useWindowDimensions();
	let cancerHierarchyQuery = useQuery("cancerHierarchy", () => {
		return getCancerHierarchy();
	});
	let modelsByTypeQuery = useQuery("modelsByType", () => {
		return getModelsByType();
	});
	const bpLarge = breakPoints.large;

	return (
		<>
			<header className="mt-lg-3 mb-5">
				<div className={styles.header_container}>
					<ShowHide windowWidth={windowWidth || 0} showOver={bpLarge}>
						<div className={`${styles.header_image} position-relative`}>
							<Image
								src={bannerImage}
								alt="A scanning electron micrograph of the surface of human skin by National Cancer Institute"
								priority
								fill
								sizes="50vw"
							/>
						</div>
					</ShowHide>
					<div className={`${styles.header_title} d-flex align-center`}>
						<h1 className="my-5 mt-lg-1 m-lg-0">
							Largest open catalog of harmonised Patient-Derived Cancer Models
						</h1>
					</div>
					<div
						className={`${styles.header_searchBackground} bg-primary-primary`}
					></div>
					<div className={`${styles.header_search} py-5`}>
						<form action="">
							<Label
								name="search"
								className="h3 text-white"
								label="Cancer Model Finder"
							/>
							<div className="d-flex flex-column flex-md-row mb-md-3">
								<Input
									type="text"
									name="search"
									placeholder="Cancer diagnosis eg. Melanoma"
									className="mr-3 mb-0"
								/>
								<Button
									color="white"
									priority="primary"
									type="submit"
									className="mt-2 m-md-0 align-self-end"
								>
									Search
								</Button>
							</div>
						</form>
						<div className="d-flex justify-content-end">
							<Link href="/search?advancedSearch" className="link-text-light">
								Make an advanced search
							</Link>
						</div>
					</div>
				</div>
			</header>
			<section>
				<div className="container">
					<div className="row align-center">
						<div className="col-12 col-md-10 col-lg-5 offset-md-1 offset-lg-0">
							{/* Graph */}
							<div
								style={
									cancerHierarchyQuery.isLoading
										? {
												backgroundColor: "#C0EDE6",
												aspectRatio: "1",
												borderRadius: "500%",
										  }
										: {}
								}
							>
								<CirclePacking
									data={
										cancerHierarchyQuery.isLoading
											? {}
											: cancerHierarchyQuery.data
									}
									onCircleClick={() => null}
								/>
							</div>
						</div>
						<div className="col-12 col-lg-6 offset-lg-1">
							<h2>
								We can collect and display your data making you more
								discoverable and visible for end-users.
							</h2>
							<p>
								All submitted models adhere to the PDX-MI standard making it
								easy for researchers to search and compare models of interest.
							</p>
							<div className="text-center text-lg-left">
								<Button
									priority="primary"
									color="dark"
									href="/submit"
									htmlTag="a"
								>
									Submit model data
								</Button>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="position-relative pb-0">
				{/* Model type count card */}
				{modelsByTypeQuery.data ? (
					<div className={`col-lg-2 container ${styles.data_card_container}`}>
						<Card className="bg-primary-quaternary">
							<div className="row text-center justify-content-center">
								{modelsByTypeQuery.data
									.filter(({ model_type }: any) => model_type !== "other")
									.map(
										({
											model_type,
											count,
										}: {
											model_type: string;
											count: number;
										}) => (
											<div
												className={`${styles.data_card_dataItem} col-6 col-lg-12`}
											>
												<Link
													href={`/search/?facets=model.model_type:${model_type}`}
													className="p"
												>
													<p className="h2 mb-0">
														{count.toLocaleString("en-US")}
													</p>
													<p className="text-capitalize">{model_type}</p>
												</Link>
											</div>
										)
									)}
							</div>
						</Card>
					</div>
				) : null}
				<div className={`${styles.data_topSection} bg-primary-tertiary py-5`}>
					<div className="container">
						<div className="row">
							<div className="col-12 col-lg-6 offset-lg-1 text-center text-white">
								<h2>Find the perfect model for your next project.</h2>
								<h2>Explore and analyse the data.</h2>
								<h2>Connect with model providers.</h2>
								<Button
									color="white"
									priority="primary"
									htmlTag="a"
									href="/explore"
								>
									Explore model data overview
								</Button>
							</div>
						</div>
					</div>
				</div>
				<div
					className={`${styles.data_bottomSection} bg-primary-secondary py-5`}
				>
					<div className="container">
						<div className="row">
							<div className="col-12 col-lg-6 offset-lg-1 text-center text-white">
								<p>Already know what you&#39;re looking for?</p>
								<Button
									color="white"
									priority="secondary"
									className="mb-0"
									htmlTag="a"
									href="/search?advancedSearch"
								>
									Make an advanced search
								</Button>
							</div>
						</div>
					</div>
				</div>
			</section>
			<FeedbackSection backgroundColor="light" />
		</>
	);
};

export default Home;
