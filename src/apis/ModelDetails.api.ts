import {
	ExtLinks,
	IPublication,
	IImmuneMarkers,
	IImmuneMarker,
} from "../pages/data/models/[providerId]/[modelId]";
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

const mockData = [
	{
		model_id: "CRL-2499",
		data_source: "CRL",
		source: "xenograft",
		sample_id: "Oncotest-R0103",
		marker_type: "HLA type",
		marker_name: "HLA-B",
		marker_value: "HLA-B*7:2, HLA-B*8:20",
		essential_or_additional_details: null,
	},
	{
		model_id: "CRL-2499",
		data_source: "CRL",
		source: "xenograft",
		sample_id: "Oncotest-R0103",
		marker_type: "HLA type",
		marker_name: "HLA-C",
		marker_value: "HLA-C*7:2, HLA-C*1:2",
		essential_or_additional_details: null,
	},
	{
		model_id: "CRL-2499",
		data_source: "CRL",
		source: "xenograft",
		sample_id: "2499",
		marker_type: "HLA type",
		marker_name: "HLA-B",
		marker_value: "HLA-B*7:2, HLA-B*8:20",
		essential_or_additional_details: null,
	},
	{
		model_id: "CRL-2499",
		data_source: "CRL",
		source: "xenograft",
		sample_id: "2499",
		marker_type: "HLA type",
		marker_name: "HLA-C",
		marker_value: "HLA-C*7:2, HLA-C*1:2",
		essential_or_additional_details: null,
	},
	{
		model_id: "CRL-2499",
		data_source: "CRL",
		source: "xenograft",
		sample_id: "2499",
		marker_type: "HLA type",
		marker_name: "HLA-A",
		marker_value: "HLA-A*24:2, HLA-A*3:1",
		essential_or_additional_details: null,
	},
	{
		model_id: "CRL-2499",
		data_source: "CRL",
		source: "xenograft",
		sample_id: "A2355-02",
		marker_type: "HLA type",
		marker_name: "HLA-A",
		marker_value: "HLA-A*24:2, HLA-A*3:1",
		essential_or_additional_details: null,
	},
	{
		model_id: "CRL-2499",
		data_source: "CRL",
		source: "xenograft",
		sample_id: "A2355-02",
		marker_type: "HLA type",
		marker_name: "HLA-B",
		marker_value: "HLA-B*7:2, HLA-B*8:20",
		essential_or_additional_details: null,
	},
	{
		model_id: "CRL-2499",
		data_source: "CRL",
		source: "xenograft",
		sample_id: "A2355-02",
		marker_type: "HLA type",
		marker_name: "HLA-C",
		marker_value: "HLA-C*7:2, HLA-C*1:2",
		essential_or_additional_details: null,
	},
	{
		model_id: "CRL-2499",
		data_source: "CRL",
		source: "xenograft",
		sample_id: "Oncotest-2001",
		marker_type: "HLA type",
		marker_name: "HLA-B",
		marker_value: "HLA-B*7:2, HLA-B*8:20",
		essential_or_additional_details: null,
	},
	{
		model_id: "CRL-2499",
		data_source: "CRL",
		source: "xenograft",
		sample_id: "Oncotest-2001",
		marker_type: "HLA type",
		marker_name: "HLA-A",
		marker_value: "HLA-A*24:2, HLA-A*3:1",
		essential_or_additional_details: null,
	},
	{
		model_id: "CRL-2499",
		data_source: "CRL",
		source: "xenograft",
		sample_id: "Oncotest-2001",
		marker_type: "HLA type",
		marker_name: "HLA-A",
		marker_value: "HLA-A*7:2, HLA-A*1:2",
		essential_or_additional_details: null,
	},
	{
		model_id: "CRL-2499",
		data_source: "CRL",
		source: "xenograft",
		sample_id: "A2671-33",
		marker_type: "HLA type",
		marker_name: "HLA-C",
		marker_value: "HLA-C*7:2, HLA-C*1:2",
		essential_or_additional_details: null,
	},
	{
		model_id: "CRL-2499",
		data_source: "CRL",
		source: "xenograft",
		sample_id: "A2671-33",
		marker_type: "HLA type",
		marker_name: "HLA-A",
		marker_value: "HLA-A*24:2, HLA-A*3:1",
		essential_or_additional_details: null,
	},
];

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

export async function getProviderId(modelId: string) {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/search_index?external_model_id=eq.${modelId}&select=data_source`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json();
}

export async function getModelPubmedIds(
	modelId: string = "",
	providerId: string
): Promise<any> {
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
		return {};
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
			sourceDatabaseUrl: extLinks.sourceDatabase.databaseUrl,
		};
		return modelExtLinks;
	});
}

export async function getModelQualityData(pdcmModelId: number) {
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
		return d.map((item: any) => camelCase(item));
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

export async function getModelMolecularDataColumns(
	molecularCharacterizationId: number,
	dataType: string
) {
	if (!molecularCharacterizationId || dataType === "biomarker") {
		return [];
	}
	const typeEndpointMap: any = {
		mutation: "mutation_data_table_columns",
		expression: "expression_data_table_columns",
		"copy number alteration": "cna_data_table_columns",
		biomarker: "biomarker_data_table_columns",
	};
	const endpoint = typeEndpointMap[dataType];
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}?molecular_characterization_id=eq.${molecularCharacterizationId}`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d) => {
		return d[0].not_empty_cols;
	});
}

export async function getAvailableDataColumns(
	dataSource: string,
	molecularCharacterizationType: string
) {
	molecularCharacterizationType =
		molecularCharacterizationType == "copy number alteration"
			? "cna"
			: molecularCharacterizationType;
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
		biomarker: "biomarker_data_table",
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
			}),
		];
	});
}

export async function getMolecularDataDownload(
	molecularCharacterization: any,
	dataType: string
) {
	if (!molecularCharacterization.id) {
		return [];
	}
	const typeEndpointMap: any = {
		mutation: "mutation_data_table",
		expression: "expression_data_table",
		"copy number alteration": "cna_data_table",
		biomarker: "biomarker_data_table",
	};
	const endpoint = typeEndpointMap[dataType];
	let request = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}?molecular_characterization_id=eq.${molecularCharacterization.id}`;
	let response = await fetch(request, { headers: { Prefer: "count=exact" } });
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json().then((d) => {
		return d.map((item: any) => {
			delete item.molecular_characterization_id;
			delete item.text;
			delete item.external_db_links;
			item["sampleID"] =
				molecularCharacterization.patientSampleId ||
				molecularCharacterization.xenograftSampleId;
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
				treatmentResponse: itemCamelCase.response,
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
				treatmentResponse: itemCamelCase.response,
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

async function getModelImmuneMarkers(modelId: string) {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/immunemarker_data_extended?model_id=eq.${modelId}`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	// TODO Parse code to new structure
	return response.json().then((d) => {
		const uniqueNames: string[] = [
			...new Set<string>(d.map((item: IImmuneMarkerAPI) => item.marker_name)),
		];

		const parsedImmuneMarkers: IImmuneMarkers[] = d.reduce(
			(result: IImmuneMarkers[], current: IImmuneMarkerAPI) => {
				const existingSampleId = result.find(
					(item: IImmuneMarkers) => item.sampleId === current.sample_id
				);

				if (existingSampleId) {
					// Check if column exists in sample id
					const existingName = existingSampleId.markers.find(
						(item: IImmuneMarker) => item.name === current.marker_name
					);

					// push to same (marker), add value
					if (existingName && existingName.value) {
						existingName.value.push(current.marker_value);
					} else {
						// new name (marker)
						existingSampleId.markers.push({
							details: current.essential_or_additional_details,
							name: current.marker_name,
							value: [current.marker_value],
						});
					}
				} else {
					result.push({
						sampleId: current.sample_id,
						type: current.marker_type,
						markers: [
							{
								details: current.essential_or_additional_details, // tooltip
								name: current.marker_name,
								value: [current.marker_value],
							},
						],
					});
				}

				return result;
			},
			[]
		);

		// Add all missing names for table structure
		uniqueNames.forEach((uniqueName: string) => {
			parsedImmuneMarkers.forEach((immuneMarker: IImmuneMarkers) => {
				if (
					immuneMarker.markers.some(
						(marker: IImmuneMarker) => marker.name === uniqueName
					)
				) {
					// if it already includes the marker, don't add it again
				} else {
					immuneMarker.markers.push({
						details: null,
						name: uniqueName,
						value: null,
					});
				}

				immuneMarker.markers.sort((a, b) => a.name.localeCompare(b.name));
			});
		});

		return parsedImmuneMarkers;
	});
}

export const getAllModelData = async (modelId: string, providerId?: string) => {
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
			licenseName: metadata.licenseName ?? "",
			licenseUrl: metadata.licenseUrl ?? "",
			score: metadata.scores.pdx_metadata_score ?? 0,
			pdcmModelId,
			modelId,
			providerId: modelProviderId,
		},
		extLinks,
		molecularData,
		immuneMarkers,
		engraftments,
		drugDosing,
		patientTreatment,
		qualityData,
		publications: [] as IPublication[],
	};
};

function createMailToLink(emails: string, externalModelId: string) {
	const subject = `Information about ${externalModelId}`;
	return `mailto:${emails}?subject=${encodeURIComponent(subject)}`;
}
