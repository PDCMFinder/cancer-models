import { IProjectData } from "./hooks/useActiveProject";

export const addProvidersToProjectData = (
	projectData: IProjectData,
	dataSources: { data_source: string; provider_name: string }[]
): IProjectData => {
	const uniqueValues = [
		...new Set(dataSources.map((item) => item.data_source))
	];
	const providers = uniqueValues.map((provider) =>
		dataSources.find((source) => source.data_source === provider)
	);

	projectData.providers = providers.sort((a, b) =>
		(a?.data_source ?? "").localeCompare(b?.data_source ?? "")
	);

	return projectData;
};

/*
{
  "ACC": "Alliance Against Cancer",
  "CRO": "Cancer Research Organization",
}

providers[abbreviation]
*/
