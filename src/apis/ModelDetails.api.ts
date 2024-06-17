import {
	AllModelData,
	CellModelData,
	ExtLinks,
	ImmuneMarker,
	Marker,
	ModelImage,
	ModelRelationships,
	MolecularData,
	Publication,
	QualityData
} from "../types/ModelData.model";
import { camelCase } from "../utils/dataUtils";

interface IImmuneMarkerAPI {
	model_id: string;
	data_source: string;
	source: string;
	sample_id: string;
	marker_type: "HLA type" | "Model Genomics";
	marker_name: string;
	marker_value: string;
	essential_or_additional_details: string;
}

export async function getCellModelData(pdcmModelId: number): Promise<any> {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/cell_model?model_id=eq.${pdcmModelId}`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d) => {
		delete d[0].model_id;
		return camelCase(d[0]);
	});
}

export async function getModelDetailsMetadata(
	modelId: string,
	providerId: string
): Promise<any> {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/search_index?external_model_id=eq.${modelId}&data_source=eq.${providerId}`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d) => camelCase(d[0]));
}

export async function getMolecularCharacterizationId(
	modelId: string,
	providerId: string
): Promise<any> {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/search_index?external_model_id=eq.${modelId}&data_source=eq.${providerId}&select=molecular_characterization_id`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d) => {
		console.log(d);
		camelCase(d[0]);
	});
}

export async function getProviderId(modelId: string) {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/search_index?external_model_id=eq.${modelId}&select=data_source`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json();
}

export async function getModelImages(modelId: string): Promise<ModelImage[]> {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/search_index?external_model_id=eq.${modelId}&select=model_images`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d) => {
		if (d[0].model_images?.length) {
			return d[0].model_images.map((imageObj: ModelImage) =>
				camelCase(imageObj)
			);
		} else {
			return [];
		}
	});
}

export async function getModelRelationships(
	modelId: string
): Promise<ModelRelationships> {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/search_index?external_model_id=eq.${modelId}&select=model_relationships`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d) => {
		const data: ModelRelationships = d[0].model_relationships;

		return data;
	});
}

export async function getModelPubmedIds(
	modelId: string = "",
	providerId: string
): Promise<string[]> {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/model_information?external_model_id=eq.${modelId}&data_source=eq.${providerId}&select=publication_group(pubmed_ids)`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	const jsonContent = await response.json();

	const publicationGroup = jsonContent[0]["publication_group"] || {};

	const pubmedIds: string = publicationGroup["pubmed_ids"] || "";
	return pubmedIds.replaceAll(" ", "").split(",");
}

export async function getPublicationData(pubmedId: string) {
	if (pubmedId !== "") {
		let response = await fetch(
			`https://www.ebi.ac.uk/europepmc/webservices/rest/article/MED/${pubmedId.replace(
				"PMID:",
				""
			)}?resultType=lite&format=json`
		);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return response
			.json()
			.then((d) =>
				Object.fromEntries(
					["title", "pubYear", "authorString", "journalTitle", "pmid", "doi"]
						.filter((key) => key in d.result)
						.map((key) => [key, d.result[key]])
				)
			);
	}
}

export async function getModelExtLinks(
	pdcmModelId: number,
	modelId: string
): Promise<ExtLinks> {
	if (pdcmModelId !== 0 && !pdcmModelId) {
		return {} as ExtLinks;
	}
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/model_information?id=eq.${pdcmModelId}&select=id,contact_people(name_list,email_list),contact_form(form_url),source_database(database_url)`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d) => {
		let extLinks = camelCase(d[0]);
		for (let d in extLinks) {
			extLinks[d] = camelCase(extLinks[d]);
		}
		let modelExtLinks: ExtLinks = {
			contactLink: extLinks.contactForm.formUrl
				? extLinks.contactForm.formUrl
				: createMailToLink(extLinks.contactPeople.emailList, modelId),
			sourceDatabaseUrl: extLinks.sourceDatabase.databaseUrl
		};
		return modelExtLinks;
	});
}

export async function getModelQualityData(
	pdcmModelId: number
): Promise<QualityData[]> {
	if (pdcmModelId !== 0 && !pdcmModelId) {
		return [];
	}
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/quality_assurance?model_id=eq.${pdcmModelId}`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d) => {
		return d.map((item: QualityData) => camelCase(item));
	});
}

export async function getMolecularData(modelId: string) {
	if (!modelId) {
		return [];
	}
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/model_molecular_metadata?model_id=eq.${modelId}`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d) => {
		return d.map((item: any) => {
			return camelCase(item);
		});
	});
}

export async function getAvailableDataColumns(
	dataSource: string,
	molecularCharacterizationType: string
) {
	switch (molecularCharacterizationType) {
		case "copy number alteration":
			molecularCharacterizationType = "cna";
			break;
		case "bio markers":
			molecularCharacterizationType = "biomarker";
			break;
	}

	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/available_molecular_data_columns?data_source=eq.${dataSource}&molecular_characterization_type=eq.${molecularCharacterizationType}`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d) => {
		return d[0].not_empty_cols;
	});
}

export async function getModelMolecularDataDetails(
	molecularCharacterizationId: number,
	dataType: string,
	filter: string,
	page: number,
	pageSize: number,
	sortColumn: string,
	sortDirection: string
) {
	if (!molecularCharacterizationId) {
		return [];
	}
	const typeEndpointMap: any = {
		mutation: "mutation_data_table",
		expression: "expression_data_table",
		"copy number alteration": "cna_data_table",
		"bio markers": "biomarker_data_table"
	};
	const endpoint = typeEndpointMap[dataType];
	let request = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}?molecular_characterization_id=eq.${molecularCharacterizationId}`;
	if (filter) {
		request += `&text=ilike.*${filter}*`;
	}
	request += `&limit=${pageSize}&offset=${(page - 1) * pageSize}`;
	if (sortColumn) {
		request += `&order=${sortColumn}`;
		if (sortDirection) {
			request += `.${sortDirection}`;
		}
	}
	let response = await fetch(request, { headers: { Prefer: "count=exact" } });
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d) => {
		return [
			parseInt(response.headers.get("Content-Range")?.split("/")[1] || "0"),
			d.map((item: any) => {
				delete item.molecular_characterization_id;
				delete item.text;
				return item;
			})
		];
	});
}

export async function getMolecularDataDownload(
	molecularCharacterization: MolecularData
) {
	if (!molecularCharacterization.molecularCharacterizationId) {
		return [];
	}
	const typeEndpointMap: any = {
		mutation: "mutation_data_table",
		expression: "expression_data_table",
		"copy number alteration": "cna_data_table",
		"bio markers": "biomarker_data_table"
	};
	const endpoint = typeEndpointMap[molecularCharacterization.dataType];
	let request = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}?molecular_characterization_id=eq.${molecularCharacterization.molecularCharacterizationId}`;
	let response = await fetch(request, { headers: { Prefer: "count=exact" } });
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d) => {
		return d.map((item: any) => {
			delete item.molecular_characterization_id;
			delete item.text;
			delete item.external_db_links;
			item["sampleID"] = molecularCharacterization.sampleId;
			return item;
		});
	});
}

export async function getModelEngraftments(
	pdcmModelId: number,
	modelType: string
) {
	if ((pdcmModelId !== 0 && !pdcmModelId) || modelType !== "PDX") {
		return [];
	}
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/xenograft_model_specimen?model_id=eq.${pdcmModelId}&select=host_strain(name, nomenclature),engraftment_site(name),engraftment_type(name),engraftment_sample_type(name),engraftment_sample_state(name),passage_number`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d) => {
		return d.map((item: any) => {
			const engraftment = camelCase(item);
			const itemCamelCase = camelCase(item);
			engraftment.hostStrain = itemCamelCase.hostStrain?.name || "";
			engraftment.hostStrainNomenclature =
				itemCamelCase.hostStrain?.nomenclature || "";
			engraftment.engraftmentSite = itemCamelCase.engraftmentSite.name;
			engraftment.engraftmentType = itemCamelCase.engraftmentType.name;
			engraftment.engraftmentSampleType =
				itemCamelCase.engraftmentSampleType.name;
			engraftment.engraftmentSampleState =
				itemCamelCase.engraftmentSampleState?.name;
			return engraftment;
		});
	});
}

export async function getPatientTreatment(pdcmModelId: number) {
	if (pdcmModelId !== 0 && !pdcmModelId) {
		return [];
	}
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/patient_treatment?model_id=eq.${pdcmModelId}&select=*`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d) =>
		d.map((item: any) => {
			const itemCamelCase: any = camelCase(item);
			let treatment = {
				treatmentName: itemCamelCase.treatment.replaceAll(" And ", ", "),
				treatmentDose: itemCamelCase.dose,
				treatmentResponse: itemCamelCase.response
			};
			return treatment;
		})
	);
}

export async function getModelDrugDosing(
	pdcmModelId: number,
	modelType: string
) {
	if (!pdcmModelId || modelType !== "PDX") {
		return [];
	}
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/dosing_studies?model_id=eq.${pdcmModelId}&select=*`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d) => {
		return d.map((item: any) => {
			const itemCamelCase: any = camelCase(item);
			let treatment = {
				treatmentName: itemCamelCase.treatment,
				treatmentDose: itemCamelCase.dose,
				treatmentResponse: itemCamelCase.response
			};
			return treatment;
		});
	});
}

export async function getExpressionHeatmap(
	molecularCharacterizationId: number,
	dataType: string
): Promise<Array<any>> {
	if (!molecularCharacterizationId || dataType !== "expression") {
		return [];
	}
	let response = await fetch(
		`${process.env.PUBLIC_URL}/static/expression_heatmap.json`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d) => {
		return d.map((item: any) => camelCase(item));
	});
}

async function getModelImmuneMarkers(modelId: string): Promise<ImmuneMarker[]> {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/immunemarker_data_extended?model_id=eq.${modelId}`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json().then((d) => {
		const parsedImmuneMarkers: ImmuneMarker[] = d.reduce(
			(result: ImmuneMarker[], current: IImmuneMarkerAPI) => {
				// Check for sample id and type, since there might be a marker of different type but same id
				const existingSampleId = result.find(
					(item: ImmuneMarker) =>
						item.sampleId === current.sample_id &&
						item.type === current.marker_type
				);
				const marker = {
					details: current.essential_or_additional_details,
					name: current.marker_name,
					value: [current.marker_value]
				};

				if (existingSampleId) {
					// Check if column exists in sample id
					const existingName = existingSampleId.markers.find(
						(item: Marker) => item.name === current.marker_name
					);

					// push to same (marker), add value
					if (existingName && existingName.value) {
						existingName.value.push(current.marker_value);
					} else {
						// new name (marker)
						existingSampleId.markers.push(marker);
					}
				} else {
					result.push({
						sampleId: current.sample_id,
						type: current.marker_type,
						markers: [marker]
					});
				}

				return result;
			},
			[]
		);

		const addMissingNames = (immuneMarker: ImmuneMarker, type: string) => {
			// create array with only unique names across all markers of x type
			const uniqueNames = [
				...new Set<string>(
					d
						.map(
							(item: IImmuneMarkerAPI) =>
								item.marker_type === type && item.marker_name
						)
						.filter((el: string) => el) // remove empty values
				)
			];

			// push "empty" objs so all rows have all columns
			uniqueNames.forEach((uniqueName: string) => {
				if (
					!immuneMarker.markers.some(
						(marker: Marker) => marker.name === uniqueName
					) &&
					immuneMarker.type === type
				) {
					immuneMarker.markers.push({
						details: "",
						name: uniqueName,
						value: []
					});
				}
			});
		};

		// Add all missing names for table structure
		parsedImmuneMarkers.forEach((immuneMarker: ImmuneMarker) => {
			addMissingNames(immuneMarker, "HLA type");
			addMissingNames(immuneMarker, "Model Genomics");

			immuneMarker.markers.sort((a, b) => a.name.localeCompare(b.name));
		});

		return parsedImmuneMarkers;
	});
}

export const getAllModelData = async (
	modelId: string,
	providerId?: string
): Promise<AllModelData> => {
	const modelProviderId =
		providerId ?? (await getProviderId(modelId))[0].data_source;
	const metadata = await getModelDetailsMetadata(modelId, modelProviderId);
	const immuneMarkers = await getModelImmuneMarkers(modelId);
	const pdcmModelId: number = metadata.pdcmModelId;
	const extLinks = await getModelExtLinks(pdcmModelId, modelId);
	const molecularData = await getMolecularData(modelId);
	const modelType = metadata.modelType;
	const engraftments = await getModelEngraftments(pdcmModelId, modelType);
	const drugDosing = await getModelDrugDosing(pdcmModelId, modelType);
	const patientTreatment = await getPatientTreatment(pdcmModelId);
	const qualityData = await getModelQualityData(pdcmModelId);
	const modelImages = await getModelImages(modelId);
	const modelRelationships = await getModelRelationships(modelId);
	let score: number = metadata.scores.pdx_metadata_score,
		cellModelData = {} as CellModelData;

	if (modelType !== "PDX") {
		cellModelData = await getCellModelData(pdcmModelId);
		score = metadata.scores.in_vitro_metadata_score;
	}

	return {
		// deconstruct metadata object so we dont pass more props than we need/should
		metadata: {
			cancerGrade: metadata.cancerGrade,
			cancerStage: metadata.cancerStage,
			cancerSystem: metadata.cancerSystem,
			collectionSite: metadata.collectionSite,
			histology: metadata.histology,
			licenseName: metadata.licenseName ?? "",
			licenseUrl: metadata.licenseUrl ?? "",
			modelId,
			modelType: metadata.modelType,
			patientAge: metadata.patientAge,
			patientEthnicity: metadata.patientEthnicity,
			patientSex: metadata.patientSex,
			pdcmModelId,
			primarySite: metadata.primarySite,
			providerId: modelProviderId,
			providerName: metadata.providerName,
			score: score ?? 0,
			tumourType: metadata.tumourType,
			// Extras for metadata file
			cancerGradingSystem: metadata.cancerGradingSystem,
			cancerStagingSystem: metadata.cancerStagingSystem,
			datasetAvailable: metadata.datasetAvailable,
			externalModelId: metadata.externalModelId,
			patientAgeAtInitialDiagnosis: metadata.patientAgeAtInitialDiagnosis,
			patientEthnicityAssessmentMethod:
				metadata.patientEthnicityAssessmentMethod,
			patientHistory: metadata.patientHistory,
			patientInitialDiagnosis: metadata.patientInitialDiagnosis,
			patientSampleCollectionDate: metadata.patientSampleCollectionDate,
			patientSampleCollectionEvent: metadata.patientSampleCollectionEvent,
			patientSampleId: metadata.patientSampleId,
			patientSampleMonthsSinceCollection:
				metadata.patientSampleMonthsSinceCollection1,
			patientSampleSharable: metadata.patientSampleSharable,
			patientSampleTreatedAtCollection:
				metadata.patientSampleTreatedAtCollection,
			patientSampleTreatedPriorToCollection:
				metadata.patientSampleTreatedPriorToCollection,
			patientSampleVirologyStatus: metadata.patientSampleVirologyStatus,
			pdxModelPublications: metadata.pdxModelPublications,
			projectName: metadata.projectName
		},
		extLinks,
		molecularData,
		immuneMarkers,
		engraftments,
		cellModelData,
		drugDosing,
		patientTreatment,
		qualityData,
		modelImages,
		modelRelationships,
		publications: [] as Publication[]
	};
};

function createMailToLink(emails: string, externalModelId: string) {
	const subject = `Information about ${externalModelId}`;
	return `mailto:${emails}?subject=${encodeURIComponent(subject)}`;
}
