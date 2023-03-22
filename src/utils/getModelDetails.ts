import {
	getModelDetailsMetadata,
	getModelEngraftments,
	getModelExtLinks,
	getModelMolecularData,
	getMolecularDataRestrictions,
	getModelDrugDosing,
	getPatientTreatment,
	getModelQualityData,
	getModelPubmedIds,
	getPublicationData,
} from "../apis/ModelDetails.api";

const getModelDetails = async (modelId: string, providerId: string) => {
	const metadata = await getModelDetailsMetadata(modelId, providerId);
	const pdcmModelId: number = metadata.pdcmModelId;
	const extLinks = await getModelExtLinks(pdcmModelId, modelId);
	const molecularData = await getModelMolecularData(providerId, pdcmModelId);
	const molecularDataRestrictions = await getMolecularDataRestrictions(
		providerId
	);
	const modelType = metadata.modelType;
	const engraftments = await getModelEngraftments(pdcmModelId, modelType);
	const drugDosing = await getModelDrugDosing(pdcmModelId, modelType);
	const patientTreatment = await getPatientTreatment(pdcmModelId);
	const qualityData = await getModelQualityData(pdcmModelId);
	let hasPubmedIds = false;
	let publications = [];
	const pubmedIds = await getModelPubmedIds(pdcmModelId);
	pubmedIds.forEach((id: string) => {
		if (id) hasPubmedIds = true;
	});
	if (hasPubmedIds) {
		publications = await Promise.all(
			pubmedIds.map(async (p: string) => await getPublicationData(p))
		);
		publications = publications.filter((p) => p.title);
	}

	return {
		// deconstruct metadata object so we dont pass more props than we need/should
		metadata: {
			histology: metadata.histology,
			providerName: metadata.providerName,
			cancerSystem: metadata.cancerSystem,
			modelType: metadata.modelType,
			patientSex: metadata.patientSex,
			patientAge: metadata.patientAge,
			patientEthnicity: metadata.patientEthnicity,
			tumourType: metadata.tumourType,
			cancerGrade: metadata.cancerGrade,
			cancerStage: metadata.cancerStage,
			primarySite: metadata.primarySite,
			collectionSite: metadata.collectionSite,
			score: metadata.score ?? 0,
			modelId,
			providerId,
		},
		extLinks,
		molecularData,
		molecularDataRestrictions,
		engraftments,
		drugDosing,
		patientTreatment,
		qualityData,
		publications,
	};
};

export default getModelDetails;
