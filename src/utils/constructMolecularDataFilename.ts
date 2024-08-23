export const constructMolecularDataFilename = (
	modelId: string,
	dataType: string,
	sampleId: string,
	platformName: string,
	extraInfo?: string
) => {
	return `CancerModelsOrg_${modelId}_${dataType ?? ""}_${sampleId ?? ""}_${
		platformName ?? ""
	}${extraInfo ? `_${extraInfo}` : ""}.tsv`
		.split(" ")
		.join("-")
		.split("/")
		.join("-");
};

export const constructCleanMolecularDataFilename = (
	modelId: string,
	dataType: string,
	sampleId: string,
	platformName: string
) => {
	return `${modelId}_${dataType ?? ""}_${sampleId ?? ""}_${platformName ?? ""}`
		.split(" ")
		.join("-")
		.split("/")
		.join("-");
};
