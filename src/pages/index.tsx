import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "../components/Button/Button";
import bannerImage from "../../public/national-cancer-institute-wUg8xhJ3aBs.jpg";
import ShowHide from "../components/ShowHide/ShowHide";
import useWindowDimensions from "../hooks/useWindowDimensions";
import breakPoints from "../utils/breakpoints";
import styles from "./index.module.scss";
import Input from "../components/Input/Input";
import Label from "../components/Input/Label";
import DataCountCard from "../components/DataCountCard/DataCountCard";
import CirclePacking from "../components/CirclePacking/CirclePacking";
import { useQuery } from "react-query";
import { getCancerHierarchy, getModelCount } from "../apis/AggregatedData.api";
import { useRouter } from "next/router";
import Loader from "../components/Loader/Loader";

const Home: NextPage = () => {
	const { windowWidth } = useWindowDimensions();
	let bpLarge = breakPoints.large;
	let cancerHierarchyQuery = useQuery("cancerHierarchy", () => {
		return getCancerHierarchy();
	});
	let modelCountQuery = useQuery("modelCountQuery", () => {
		return getModelCount();
	});
	const router = useRouter();

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
					<div
						className={`${styles.header_title} flex-column d-flex py-5 py-lg-0`}
					>
						<h1 className="h2 mt-lg-1">
							The largest open catalog of harmonised patient-derived cancer
							models.
						</h1>
						<div className="col-12 col-lg-10">
							<p>
								Looking for PDX Finder? That&apos;s us! We have expanded to
								organoids and cell lines and are now called CancerModels.Org.{" "}
							</p>
						</div>
					</div>
					<div
						className={`${styles.header_searchBackground} bg-primary-primary`}
					></div>
					<div className={`${styles.header_search} pt-5 pb-3`}>
						<form action="">
							<Label
								name="search"
								className="h3 text-white"
								label={`Search over ${
									modelCountQuery.data
										? parseFloat(modelCountQuery.data).toLocaleString()
										: "6,998" //placeholder while we fetch api data
								} cancer models`}
							/>
							<div className="d-flex flex-column flex-md-row mb-md-3">
								<Input
									type="text"
									name="search"
									placeholder="Cancer diagnosis eg. Melanoma"
									className="mb-0"
								/>
							</div>
						</form>
					</div>
				</div>
			</header>
			<section>
				<div className="container">
					<div className="row align-center">
						<ShowHide windowWidth={windowWidth || 0} showOver={bpLarge}>
							<div
								className={`col-12 col-md-10 col-lg-5 offset-md-1 offset-lg-0 ${styles.circlePacking_col}`}
							>
								{/* Graph */}
								<div
									style={{
										backgroundColor: "#085154",
										aspectRatio: "1",
										borderRadius: "500%",
									}}
								>
									{!cancerHierarchyQuery.isLoading &&
									cancerHierarchyQuery.data ? (
										<CirclePacking
											data={cancerHierarchyQuery.data}
											onCircleClick={(circleId, circleDepth) => {
												const searchPrefix =
													circleDepth === 1
														? `?facets=patient_tumour.cancer_system:`
														: `?q=`;
												const termSuffix = circleDepth === 1 ? "Cancer" : "";
												const search = `${searchPrefix}${encodeURIComponent(
													circleId + termSuffix
												)}`;

												router.push({
													pathname: "/search",
													search: search,
												});
											}}
										/>
									) : (
										<Loader />
									)}
								</div>
							</div>
						</ShowHide>
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
									Submit data
								</Button>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="pb-0">
				<ShowHide hideOver={bpLarge} windowWidth={windowWidth || 0}>
					<section className="pt-0">
						<div className="container">
							<div className="row">
								<DataCountCard />
							</div>
						</div>
					</section>
				</ShowHide>
				<section className="bg-primary-tertiary">
					<div className="container">
						<div className="row align-center">
							<div className="col-12 col-lg-8 offset-lg- text-center text-white">
								<h1 className="h2 mb-5">
									Find the right PDX, organoid and cell line patient-derived
									cancer model for your next project.
								</h1>
								<h2 className="h3">Explore and analyse the data.</h2>
								<h2 className="h3">Connect with model providers.</h2>
								<h2 className="h3">All in one platform.</h2>
								<Button
									color="white"
									priority="primary"
									htmlTag="a"
									href="/overview"
									className="mt-5"
								>
									Explore data overview
								</Button>
							</div>
							<ShowHide showOver={bpLarge} windowWidth={windowWidth || 0}>
								<div className="col-12 col-lg-3 col-xl-2 offset-lg-1 offset-xl-1">
									<DataCountCard />
								</div>
							</ShowHide>
						</div>
					</div>
				</section>
			</section>
		</>
	);
};

export default Home;
