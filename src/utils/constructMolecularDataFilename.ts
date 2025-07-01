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
		.replace(/[ /]/g, "-");
};

export const constructCleanMolecularDataFilename = (
	dataType: string,
	sampleId: string,
	platformName: string
) => {
	return `${dataType ?? ""}_${sampleId ?? ""}_${platformName ?? ""}`
		.replace(/[ /]/g, "-");
};
