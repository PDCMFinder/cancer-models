import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getDataSourcesByProject } from "../apis/Search.api";
import { addProvidersToProjectData } from "../utils/projects";
import projectsSettings from "../utils/projectSettings.json";

export type ProjectData = {
	project_abbreviation: string;
	project_full_name?: string;
	providers?: ({ data_source: string; provider_name: string } | undefined)[];
	project_description?: string;
	project_settings: {
		main_color: string;
		secondary_color: string;
		logo?: string;
	};
};

const randomizeProjectProviders = (providers: ProjectData["providers"]) => {
	const newProviders = [...(providers ?? [])];
	let currentIndex = newProviders.length ?? 0;

	while (currentIndex != 0 && newProviders) {
		const randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[newProviders[currentIndex], newProviders[randomIndex]] = [
			newProviders[randomIndex],
			newProviders[currentIndex]
		];
	}

	return newProviders;
};

export const useActiveProject = () => {
	const router = useRouter();
	const { project: projectFromUrl } = router.query;
	const [activeProject, setActiveProject] = useState<string>();

	useEffect(() => {
		const randomProjectIndex = Math.floor(
			Math.random() * projectsSettings.length
		);
		if (router.isReady) {
			if (projectFromUrl) {
				if (Array.isArray(projectFromUrl)) {
					setActiveProject(projectFromUrl[0]);
				} else {
					setActiveProject(projectFromUrl);
				}
			} else {
				setActiveProject(
					projectsSettings[randomProjectIndex].project_abbreviation
				);
			}
		}
	}, [projectFromUrl, router.isReady]);

	const { data: dataSourcesByProject, isLoading: isLoadingProviders } =
		useQuery(
			["projectDataSources", activeProject],
			() => getDataSourcesByProject(activeProject ?? ""),
			{
				enabled: !!activeProject // Ensure query only runs when activeProject is set
			}
		);

	const activeProjectData = (projectsSettings.find(
		(project) => project.project_abbreviation === activeProject
	) as ProjectData) || { providers: [] };

	addProvidersToProjectData(activeProjectData, dataSourcesByProject ?? []);

	const handleProjectClick = (projectName: string) => {
		if (projectName !== activeProject) {
			setActiveProject(projectName);
			router.replace(
				{
					query: {
						project: projectName
					}
				},
				undefined,
				{ scroll: false }
			);
		}
	};

	return {
		setActiveProject,
		activeProjectData,
		isLoadingProviders,
		handleProjectClick
	};
};
