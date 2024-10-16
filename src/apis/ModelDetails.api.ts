import { CamelCaseKeys } from "../../types/globalTypes";
import {
	AllModelData,
	APIEngraftment,
	APIExternalModelLink,
	APIExtLinks,
	APIKnowledgeGraph,
	APIModelMetadata,
	APIPatientTreatment,
	CellModelData,
	Engraftment,
	ExternalModelLinkByType,
	ExtLinks,
	IImmuneMarkerAPI,
	ImmuneMarker,
	KnowledgeGraph,
	Marker,
	ModelImage,
	MolecularData,
	Publication,
	QualityData
} from "../types/ModelData.model";
import { camelCase } from "../utils/dataUtils";

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
) {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/search_index?external_model_id=eq.${modelId}&data_source=eq.${providerId}`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json().then((d) => {
		if (!Array.isArray(d) || d.length === 0) {
			throw new Error("No model metadata found");
		}
		const modelMetadata: APIModelMetadata = d[0];

		return camelCase(modelMetadata);
	});
}

export async function getProviderId(modelId: string): Promise<string> {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/search_index?external_model_id=eq.${modelId}&select=data_source`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d) => {
		return d[0].data_source;
	});
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

export async function getModelKnowledgeGraph(
	modelId: string
): Promise<KnowledgeGraph> {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/model_information?external_model_id=eq.${modelId}&select=knowledge_graph`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response
		.json()
		.then((d: { knowledge_graph: APIKnowledgeGraph | null }[]) => {
			if (!d[0]?.knowledge_graph) {
				return { edges: [], nodes: [] };
			}

			const apiGraph = d[0].knowledge_graph;
			const data: KnowledgeGraph = {
				edges: apiGraph.edges.map((edge) => camelCase(edge)),
				nodes: apiGraph.nodes.map((node) => camelCase(node))
			};

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
		`${process.env.NEXT_PUBLIC_API_URL}/model_information?id=eq.${pdcmModelId}&select=contact_people(email_list),contact_form(form_url),source_database(database_url),other_model_links`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d) => {
		const extLinks = d[0] as APIExtLinks;

		const externalModelLinks =
			extLinks.other_model_links ?? ([] as APIExternalModelLink[]);

		const externalModelLinksByType = externalModelLinks.reduce(
			(acc: ExternalModelLinkByType, link: APIExternalModelLink) => {
				if (!acc[link.type]) {
					acc[link.type] = [];
				}
				acc[link.type].push({
					...link,
					resourceLabel: link.resource_label,
					linkLabel: link.link_label
				});

				return acc;
			},
			{} as ExternalModelLinkByType
		);

		const contactLink = extLinks.contact_form?.form_url
			? extLinks.contact_form.form_url
			: `mailto:${
					extLinks.contact_people?.email_list ?? ""
			  }?subject=${encodeURIComponent(modelId)}`;

		const sourceDatabaseUrl = extLinks.source_database?.database_url ?? "";

		return {
			contactLink,
			sourceDatabaseUrl,
			externalModelLinksByType
		} as ExtLinks;
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
): Promise<Engraftment[]> {
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
		return d.map((item: APIEngraftment) => {
			const {
				host_strain: hostStrain,
				engraftment_site: engraftmentSite,
				engraftment_type: engraftmentType,
				engraftment_sample_type: engraftmentSampleType,
				engraftment_sample_state: engraftmentSampleState,
				...rest
			} = item;

			return {
				...camelCase(rest),
				hostStrain: hostStrain?.name ?? "",
				hostStrainNomenclature: hostStrain?.nomenclature ?? "",
				engraftmentSite: engraftmentSite.name,
				engraftmentType: engraftmentType.name,
				engraftmentSampleType: engraftmentSampleType.name,
				engraftmentSampleState: engraftmentSampleState?.name ?? ""
			};
		});
	});
}

export const getPatientTreatment = async (pdcmModelId: number) => {
	if (pdcmModelId !== 0 && !pdcmModelId) {
		return [];
	}

	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/patient_treatment?model_id=eq.${pdcmModelId}&select=*`
	);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json().then((d: APIPatientTreatment) =>
		d.map((item) => {
			item.entries.forEach((entry) => {
				entry.response = item.response;
				entry.external_db_links?.sort((a, b) =>
					a.resource_label.localeCompare(b.resource_label)
				);
			});

			return camelCase(item.entries) as unknown as CamelCaseKeys<
				APIPatientTreatment[number]["entries"]
			>[number][];
		})
	);
};

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
	const modelProviderId = providerId ?? (await getProviderId(modelId));
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
	const knowledgeGraph = await getModelKnowledgeGraph(modelId);
	let score: number = metadata.scores.pdxMetadataScore,
		cellModelData = {} as CellModelData;

	if (modelType !== "PDX") {
		cellModelData = await getCellModelData(pdcmModelId);
		score = metadata.scores.inVitroMetadataScore;
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
			modelAvailable: metadata.modelAvailabilityBoolean,
			patientAge: metadata.patientAge,
			patientEthnicity: metadata.patientEthnicity,
			patientSex: metadata.patientSex,
			pdcmModelId,
			primarySite: metadata.primarySite,
			providerId: modelProviderId,
			providerName: metadata.providerName,
			score: score ?? 0,
			tumourType: metadata.tumourType,
			dateSubmitted: metadata.dateSubmitted,
			// Extras for metadata file
			cancerGradingSystem: metadata.cancerGradingSystem,
			cancerStagingSystem: metadata.cancerStagingSystem,
			datasetAvailable: Array.isArray(metadata.datasetAvailable)
				? metadata.datasetAvailable
				: [],
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
		knowledgeGraph,
		modelImages,
		publications: [] as Publication[]
	};
};
