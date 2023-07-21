import Link from "next/link";
import {
	ExtLinks,
	IMolecularData,
	MolecularDataRestrictions,
	TypesMap,
} from "../../pages/data/models/[providerId]/[modelId]";
import { useRef, useState } from "react";
import { getMolecularDataDownload } from "../../apis/ModelDetails.api";
import { CSVLink } from "react-csv";
import Modal from "../Modal/Modal";
import Card from "../Card/Card";
import CloseIcon from "../CloseIcon/CloseIcon";
import MolecularDataTable from "../MolecularDataTable/MolecularDataTable";
import { createPortal } from "react-dom";

const typesMap: TypesMap = {
	expression_molecular_data: "expression",
	cna_molecular_data: "copy number alteration",
	mutation_measurement_data: "mutation",
	cytogenetics_molecular_data: "cytogenetics",
};

interface IMolecularTableProps {
	data: any;
	molecularDataRestrictions: MolecularDataRestrictions[];
	extLinks: ExtLinks;
	limited?: boolean;
}

const MolecularTable = (props: IMolecularTableProps) => {
	const isLimited = props.limited;
	const downloadBtnRef =
		useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);
	const [selectedMolecularData, setSelectedMolecularData] =
		useState<IMolecularData>();
	const [downloadData, setDownloadData] = useState<{
		data: IMolecularData[];
		filename: string;
	}>({
		data: [],
		filename: "",
	});

	const getDownloadData = (data: IMolecularData): void => {
		getMolecularDataDownload(data, data.dataType)
			.then((d) => {
				setDownloadData({
					data: d,
					filename: `CancerModelsOrg_${data.dataType ?? ""}_${
						data.patientSampleId ?? data.xenograftModelId ?? ""
					}_${data.platformName ?? ""}.csv`,
				});
			})
			.catch((error) => {});
	};

	const restrictedTypes = props.molecularDataRestrictions?.map(
		(d: any) => typesMap[d.molecularDataTable as keyof TypesMap]
	);

	return (
		<div id="molecular-data" className="row mb-5 pt-1">
			<div className="col-12 mb-1">
				<div className="overflow-scroll showScrollbar-vertical">
					<table>
						<caption>Molecular data</caption>
						<thead>
							<tr>
								<th>SAMPLE ID</th>
								{!isLimited && <th>SAMPLE TYPE</th>}
								{!isLimited && <th>ENGRAFTED TUMOUR PASSAGE</th>}
								<th>DATA TYPE</th>
								<th>DATA AVAILABLE</th>
								{!isLimited && <th>PLATFORM USED</th>}
								{!isLimited && <th>RAW DATA</th>}
							</tr>
						</thead>
						<tbody>
							{props.data &&
								props.data.map((data: any) => {
									const sampleId =
										data.xenograftSampleId ||
										data.patientSampleId ||
										data.cellSampleId;
									const sampleType = data.xenograftSampleId
										? "Engrafted Tumour"
										: "Patient Tumour";
									const rawDataExternalLink = data.externalDbLinks?.find(
										(data: any) => data.column === "raw_data_url"
									)?.link;

									return (
										<tr key={data.id}>
											<td className="white-space-nowrap">{sampleId}</td>
											{!isLimited && <td>{sampleType}</td>}
											{!isLimited && <td>{data.xenograftPassage || "N/A"}</td>}
											{!isLimited && (
												<td className="text-capitalize">{data.dataType}</td>
											)}
											<td>
												{!restrictedTypes.includes(data.dataType) &&
												data.dataAvailability === "TRUE" ? (
													<>
														<button
															className="text-left link-text mr-3 mb-md-1 mr-xxx-3"
															onClick={() => setSelectedMolecularData(data)}
														>
															VIEW DATA
														</button>
														<button
															className="text-left link-text mr-3 mr-md-0 mb-md-1 mr-xxx-3"
															onClick={() => getDownloadData(data)}
														>
															DOWNLOAD DATA
														</button>
													</>
												) : (
													<Link
														href={props.extLinks.contactLink || ""}
														target="_blank"
														rel="noreferrer noopener"
													>
														REQUEST DATA
													</Link>
												)}
											</td>
											<td>{data.platformName}</td>
											{!isLimited && (
												<td>
													{data.rawDataUrl ? (
														<a
															href={rawDataExternalLink}
															target="_blank"
															rel="noopener noreferrer"
														>
															{data.rawDataUrl.split(",")[0]}
														</a>
													) : (
														"Not available"
													)}
												</td>
											)}
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</div>
			<CSVLink
				data={downloadData.data}
				filename={downloadData.filename}
				className="hideElement-accessible"
				ref={downloadBtnRef}
			/>
			{selectedMolecularData &&
				createPortal(
					<Modal
						verticalAlign="top"
						handleClose={() => setSelectedMolecularData(undefined)}
					>
						<Card
							className="bg-white"
							contentClassName="py-3"
							header={
								<header className="d-flex justify-content-between">
									<h3 className="m-0">
										{selectedMolecularData.platformName} data
									</h3>
									<CloseIcon
										color="dark"
										onClick={() => setSelectedMolecularData(undefined)}
									/>
								</header>
							}
						>
							<MolecularDataTable
								data={selectedMolecularData}
								handleDownload={getDownloadData}
							/>
						</Card>
					</Modal>,
					document.body
				)}
		</div>
	);
};

export default MolecularTable;
