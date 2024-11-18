// Documents/cancer-models/src/pages/index.tsx
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";
import { getModelCount } from "../apis/AggregatedData.api";
import Button from "../components/Button/Button";
import DataCountCard from "../components/DataCountCard/DataCountCard";
import Label from "../components/Input/Label";
import Loader from "../components/Loader/Loader";
import ShowHide from "../components/ShowHide/ShowHide";
import useWindowDimensions from "../hooks/useWindowDimensions";
import breakPoints from "../utils/breakpoints";
import { useActiveProject } from "../utils/hooks/useActiveProject";
import { ProjectButtons } from "./about/providers";
import styles from "./index.module.scss";

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

	const { activeProjectData, handleProjectClick } = useActiveProject();

	return (
		<>
			<header className="mt-lg-3">
				<div className={styles.header_container}>
					<div className={styles.header_searchBackground}></div>
					<ShowHide windowWidth={windowWidth || 0} showOver={bpLarge}>
						<div className={styles.header_graphicElement}>
							<DataCountCard layout="vertical" iconSize="2em" />
						</div>
					</ShowHide>
					<div
						className={`${styles.header_title} flex-column d-flex py-5 py-lg-0`}
					>
						<h1 className="text-center text-md-left h2 mt-lg-1">
							Find the right patient-derived xenograft, organoid and cell line
							model for your next project.
						</h1>
						<ShowHide windowWidth={windowWidth || 0} hideOver={bpLarge}>
							<div
								className={`${styles.header_graphicElement} mt-3 position-relative`}
							>
								<DataCountCard layout="vertical" iconSize="2em" />
							</div>
						</ShowHide>
					</div>
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
					<div className="row mb-3">
						<div className="col-12 col-lg-6 offset-lg-1">
							<h2>Our data providers</h2>
						</div>
					</div>
					{activeProjectData.project_abbreviation === null ? (
						<div style={{ height: "50vh" }}>
							<Loader />
						</div>
					) : (
						<div className="row justify-content-center">
							<div className="col-12 col-md-3 col-lg-2">
								<ProjectButtons
									direction="column"
									activeProject={activeProjectData.project_abbreviation}
									onClick={handleProjectClick}
								/>
							</div>
							<div className="col-12 col-md-9 col-lg-8 mt-5 mt-md-0">
								{/* project logo and name */}
								{activeProjectData.project_description &&
								activeProjectData.project_settings.logo ? (
									<>
										<div className="row flex-lg-row-reverse mb-3">
											<div className="col-12 col-md-6 col-lg-3">
												<Image
													src={activeProjectData.project_settings.logo}
													alt={`${activeProjectData.project_full_name} logo`}
													title={`${activeProjectData.project_full_name}`}
													className="w-50 h-auto mx-auto mb-2 mb-md-0 w-lg-auto mr-lg-0"
													height={120}
													width={120}
													style={{
														maxHeight: "120px",
														maxWidth: "100%"
													}}
												/>
											</div>
											<div className="col-12 col-md-6 col-lg-9">
												<h3 className="mt-0">
													{activeProjectData.project_full_name ??
														activeProjectData.project_abbreviation}
												</h3>
												<p className="mb-lg-0">
													<a
														href={`/search?filters=project_name%3A${activeProjectData.project_abbreviation}`}
													>
														Explore all project models
													</a>
												</p>
											</div>
										</div>
										<hr className="mb-3" />
									</>
								) : null}
								{/* provider logos */}
								<div className="row row-cols-2 row-cols-md-3 row-cols-lg-4">
									{activeProjectData.providers?.map((provider) => (
										<div
											key={provider?.data_source}
											className="col text-center"
										>
											<Link
												href={`/search?filters=data_source%3A${provider?.data_source}`}
												title={`Explore all ${provider?.data_source} models`}
												style={{ height: "100px" }}
												className="mb-1 d-flex"
											>
												<Image
													src={`/img/providers/${provider?.data_source}.png`}
													alt={`${provider?.provider_name} logo`}
													title={provider?.provider_name}
													className="w-auto h-auto m-auto"
													width={300}
													height={100}
													style={{
														maxHeight: "100px",
														maxWidth: "75%"
													}}
												/>
											</Link>
											<p className="text-small text-muted">
												{provider?.provider_name}
											</p>
										</div>
									))}
								</div>
							</div>
						</div>
					)}
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
