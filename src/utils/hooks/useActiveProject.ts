import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getDataSourcesByProject } from "../../apis/Search.api";
import { addProvidersToProjectData } from "../projects";
import projectsSettings from "../projectSettings.json";

interface IProjectData {
	project_name: string;
	project_full_name?: string;
	providers?: string[];
	project_description?: string;
	project_settings: {
		main_color: string;
		secondary_color: string;
		logo?: string;
	};
}

export const useActiveProject = () => {
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
				enabled: !!activeProject // Ensure query only runs when activeProject is set
			}
		);

	const activeProjectData =
		(projectsSettings.find(
			(project) => project.project_name === activeProject
		) as IProjectData) || projectsSettings[0];

	addProvidersToProjectData(
		activeProjectData,
		dataSourcesByProject ?? [{ data_source: "" }]
	);

	return {
		activeProject,
		setActiveProject,
		activeProjectData,
		isLoadingProviders,
		handleProjectClick: (projectName: string) => {
			if (projectName !== activeProject) {
				setActiveProject(projectName);
				router.replace(
					{
						pathname: router.pathname,
						query: { project: projectName }
					},
					undefined,
					{ scroll: false }
				);
			}
		}
	};
};
