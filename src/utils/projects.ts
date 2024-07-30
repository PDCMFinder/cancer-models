import { IProjectData } from "../pages/about/providers";

export const addProvidersToProjectData = (
	projectData: IProjectData,
	dataSources: { data_source: string }[]
): IProjectData => {
	const uniqueValues = [
		...new Set(dataSources.map((item) => item.data_source))
	];
	projectData.providers = uniqueValues.sort((a, b) => a.localeCompare(b));

	return projectData;
};
