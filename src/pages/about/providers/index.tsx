import { promises as fs } from "fs";
import matter from "gray-matter";
import type { NextPage } from "next";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import path from "path";
import React, { memo, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { getDataSourcesByProject } from "../../../apis/Search.api";
import Button from "../../../components/Button/Button";
import Card from "../../../components/Card/Card";
import Loader from "../../../components/Loader/Loader";
import ProviderInfo from "../../../components/ProviderInfo/ProviderInfo";
import { addProvidersToProjectData } from "../../../utils/projects";
import projectsSettings from "../../../utils/projectSettings.json";

interface IProvidersProps {
	allProvidersBasics: {
		id: string;
		parsedContent: string;
		abbreviation: string;
		logo: string;
		name: string;
	}[];
}

export interface IProjectData {
	project_name: string;
	project_full_name?: string;
	providers?: string[];
	project_settings: {
		main_color: string;
		secondary_color: string;
		logo?: string;
	};
	project_description?: string;
}

interface IProjectButtonProps {
	projectName: string;
	isActive: boolean;
	mainColor: string;
	secondaryColor: string;
	onClick: () => void;
}

interface IProjectButtonsProps {
	activeProject: string;
	onClick: (projectName: string) => void;
}

const getButtonColors = (
	isActive: boolean,
	mainColor: string,
	secondaryColor: string
) => {
	return isActive
		? { backgroundColor: mainColor, color: secondaryColor }
		: { backgroundColor: "#ebebeb", color: "#003e48" };
};

const handleMouseEnter = (
	e: React.MouseEvent<HTMLElement>,
	isActive: boolean,
	mainColor: string,
	secondaryColor: string
) => {
	if (!isActive) {
		const target = e.target as HTMLElement;
		target.style.backgroundColor = mainColor;
		target.style.color = secondaryColor;
	}
};

const handleMouseLeave = (
	e: React.MouseEvent<HTMLElement>,
	isActive: boolean
) => {
	if (!isActive) {
		const target = e.target as HTMLElement;
		target.style.backgroundColor = "#ebebeb";
		target.style.color = "#003e48";
	}
};

const ProjectButton = ({
	projectName,
	isActive,
	mainColor,
	secondaryColor,
	onClick
}: IProjectButtonProps) => {
	const buttonColors = getButtonColors(isActive, mainColor, secondaryColor);

	return (
		<Button
			key={projectName}
			priority="secondary"
			color="dark"
			className="mx-0 my-1 my-md-3 border-none justify-content-center"
			style={{ flex: "1 1 0", ...buttonColors }}
			onMouseEnter={(e) =>
				handleMouseEnter(e, isActive, mainColor, secondaryColor)
			}
			onMouseLeave={(e) => handleMouseLeave(e, isActive)}
			onClick={onClick}
		>
			{projectName}
		</Button>
	);
};

const Header = () => (
	<header className="bg-primary-primary text-white mb-5 py-5">
		<div className="container">
			<div className="row py-5">
				<div className="col-12">
					<h1 className="m-0">Our data providers</h1>
				</div>
			</div>
		</div>
	</header>
);

const ProjectButtons = memo(
	({ activeProject, onClick }: IProjectButtonsProps) => (
		<div className="row mb-5">
			<div
				className="col-12 d-flex flex-column flex-md-row align-md-center justify-content-between"
				style={{ columnGap: "1rem" }}
			>
				{projectsSettings.map(
					({
						project_name,
						project_settings: { main_color, secondary_color }
					}) => (
						<ProjectButton
							key={project_name}
							projectName={project_name}
							isActive={activeProject === project_name}
							mainColor={main_color}
							secondaryColor={secondary_color}
							onClick={() => onClick(project_name)}
						/>
					)
				)}
			</div>
		</div>
	)
);

const Providers: NextPage<IProvidersProps> = ({ allProvidersBasics }) => {
	const router = useRouter();
	const { project: projectFromUrl } = router.query;
	const [activeProject, setActiveProject] = useState<string | null>(null);

	useEffect(() => {
		if (projectFromUrl) {
			if (Array.isArray(projectFromUrl)) {
				setActiveProject(projectFromUrl[0]);
			} else {
				setActiveProject(projectFromUrl as string);
			}
		} else if (router.isReady) {
			setActiveProject(projectsSettings[0].project_name);
		}
	}, [projectFromUrl, router.isReady]);

	const { data: dataSourcesByProject, isLoading: isLoadingProviders } =
		useQuery(
			["dataSources", activeProject],
			() => getDataSourcesByProject(activeProject ?? ""),
			{
				staleTime: 1000 * 60 * 10, // 10 minutes
				cacheTime: 1000 * 60 * 10, // 10 minutes,
				enabled: !!activeProject // Ensure query only runs when activeProject is set
			}
		);

	const activeProjectData =
		(projectsSettings.find(
			(project) => project.project_name === activeProject
		) as IProjectData) || projectsSettings[0];

	const data = addProvidersToProjectData(
		activeProjectData,
		dataSourcesByProject ?? [{ data_source: "" }]
	);

	const activeProviders = allProvidersBasics
		.filter((provider) => data.providers?.includes(provider.abbreviation))
		.sort((a, b) => a.abbreviation.localeCompare(b.abbreviation));

	const handleProjectClick = (projectName: string) => {
		setActiveProject(projectName);
		router.replace({
			pathname: "/about/providers",
			query: { project: projectName }
		});
	};

	return (
		<>
			<Header />
			{/* Decided to move this here instead of outside this return so Header doesn't blink */}
			{activeProject === null ? (
				<div style={{ height: "50vh" }}>
					<Loader />
				</div>
			) : (
				<section className="pt-0">
					<div className="container">
						<ProjectButtons
							activeProject={activeProject}
							onClick={handleProjectClick}
						/>
						{data.project_description && data.project_settings.logo && (
							<div className="row mb-5">
								<div className="col-12 col-lg-8 offset-lg-2">
									<Card
										contentClassName="py-4"
										header={
											<h2 className="m-0">
												{data.project_full_name ?? data.project_name}
											</h2>
										}
									>
										<div className="row">
											<div className="col-3">
												<Image
													src={data.project_settings.logo}
													alt={`${data.project_name} logo`}
													width={150}
													height={150}
													className="w-100 h-auto mx-auto mb-2"
												/>
											</div>
											<div className="col-9">
												<p>{data.project_description}</p>
												<p>
													<Link
														href={`/search?filters=project_name%3A${data.project_name}`}
													>
														View all models and data
													</Link>
												</p>
											</div>
										</div>
									</Card>
								</div>
							</div>
						)}
						<div className="row">
							{isLoadingProviders ? (
								<div style={{ height: "50vh" }}>
									<Loader />
								</div>
							) : (
								activeProviders?.map((provider) => (
									<ProviderInfo key={provider.id} provider={provider} />
								))
							)}
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default Providers;

export const getStaticProps: GetStaticProps = async () => {
	const providersDirectory = path.join(
		process.cwd(),
		"/public/static/providers"
	);
	const providersFiles = await fs.readdir(providersDirectory);

	const allProvidersBasicsFirst = providersFiles.map(
		async (providerFile: string) => {
			const fullPath = path.join(providersDirectory, providerFile);
			const fileContents = await fs.readFile(fullPath, "utf8");
			const matterResult = await matter(fileContents);
			const processedContent = await remark()
				.use(remarkHtml, { sanitize: true })
				.process(matterResult.content);

			return {
				id: providerFile.replace(/\.md$/, "") as string,
				text: matterResult.content,
				parsedContent: JSON.parse(
					JSON.stringify(processedContent.value)
				) as string,
				...(matterResult.data as {
					abbreviation: string;
					logo: string;
					name: string;
				})
			};
		}
	);

	return {
		props: {
			allProvidersBasics: await Promise.all(allProvidersBasicsFirst)
		}
	};
};
