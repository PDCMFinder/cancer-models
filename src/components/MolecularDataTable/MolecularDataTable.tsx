import { IMolecularData } from "../../pages/data/models/[providerId]/[modelId]";
import Button from "../Button/Button";
import { useQuery } from "react-query";
import {
	getAvailableDataColumns,
	getModelMolecularDataDetails,
} from "../../apis/ModelDetails.api";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";
import { useState } from "react";
import InputAndLabel from "../Input/InputAndLabel";
import Link from "next/link";
import ReactGA from "react-ga4";

interface IMolecularDataTableProps {
	data: IMolecularData;
	handleDownload: (data: IMolecularData) => void;
}

interface DataDetailsRow {
	hgnc_symbol: string | null;
	rnaseq_coverage: string | null;
	rnaseq_fpkm: string | null;
	rnaseq_tpm: string | null;
	rnaseq_count: string | null;
	affy_hgea_probe_id: string | null;
	affy_hgea_expression_value: string | null;
	illumina_hgea_probe_id: string | null;
	illumina_hgea_expression_value: string | null;
	z_score: string | null;
	non_harmonised_symbol: string | null;
	external_db_links: any[] | null;
}

const MolecularDataTable = (props: IMolecularDataTableProps) => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	let columnsToDisplay: { key: string; name: string }[] = [];
	const data = props.data ?? {},
		pageSize = 10;

	const [filter, setFilter] = useState<string>("");
	const [sortColumn, setSortSortColumn] = useState<string>("");
	const [sortDirection, setSortDirection] = useState<string>("");
	const { data: columns } = useQuery(
		["get-molecular-data-detail-cols", data.dataSource, data.dataType],
		() => getAvailableDataColumns(data.dataSource, data.dataType)
	);
	const { data: dataDetails, isLoading } = useQuery(
		[
			"get-molecular-data-detail",
			data.molecularCharacterizationId,
			data.dataType,
			filter,
			currentPage,
			pageSize,
			sortColumn,
			sortDirection,
		],
		() =>
			getModelMolecularDataDetails(
				data.molecularCharacterizationId,
				data.dataType,
				filter,
				currentPage,
				pageSize,
				sortColumn,
				sortDirection
			)
	);

	if (columns) {
		switch (data.dataType) {
			case "mutation":
				columnsToDisplay = [
					{ key: "hgnc_symbol", name: "HGNC Symbol" },
					{ key: "amino_acid_change", name: "Amino Acid Change" },
					{ key: "consequence", name: "Consequence" },
					{ key: "read_depth", name: "Read Depth" },
					{ key: "allele_frequency", name: "Allele Frequency" },
					{ key: "seq_start_position", name: "Seq. Start Position" },
					{ key: "ref_allele", name: "Ref. Allele" },
					{ key: "alt_allele", name: "Alt. Allele" },
				].filter((column) => columns.includes(column.key));
				break;
			case "expression":
				columnsToDisplay = [
					{ key: "hgnc_symbol", name: "HGNC Symbol" },
					{ key: "rnaseq_coverage", name: "RNA Seq. Coverage" },
					{ key: "rnaseq_fpkm", name: "RNA Seq. FPKM" },
					{ key: "rnaseq_tpm", name: "RNA Seq. TPM" },
					{ key: "rnaseq_count", name: "RNA Seq. Count" },
					{ key: "affy_hgea_probe_id", name: "Affy HGEA Probe" },
					{ key: "affy_hgea_expression_value", name: "Affy HGEA Exp. Value" },
					{ key: "illumina_hgea_probe_id", name: "Illumina HGEA Probe" },
					{
						key: "illumina_hgea_expression_value",
						name: "Illumina HGEA Exp. Value",
					},
					{ key: "z_score", name: "Z Score" },
				].filter(
					(column) =>
						columns.includes(column.key) || column.key === "hgnc_symbol"
				);
				break;
			case "copy number alteration":
				columnsToDisplay = [
					{ key: "hgnc_symbol", name: "HGNC Symbol" },
					{ key: "log10r_cna", name: "log10  CNA" },
					{ key: "log2r_cna", name: "log2  CNA" },

					{ key: "copy_number_status", name: "Copy Number Status" },
					{ key: "gistic_value", name: "GISTIC Value" },
					{ key: "picnic_value", name: "PICNIC Value" },
					{ key: "amino_acid_change", name: "Amino Acid Change" },
					{ key: "consequence", name: "Consequence" },
					{ key: "read_depth", name: "Read Depth" },
					{ key: "allele_frequency", name: "Allele Frequency" },
					{ key: "seq_start_position", name: "Seq. Start Position" },
					{ key: "ref_allele", name: "Ref. Allele" },
					{ key: "alt_allele", name: "Alt. Allele" },
				].filter((column) => columns.includes(column.key));
				break;
			case "bio markers":
				columnsToDisplay = [
					{ key: "biomarker", name: "Biomarker" },
					{ key: "result", name: "Result" },
				].filter((column) => columns.includes(column.key));
				break;
		}
	}

	const handleSortChange = (key: string, sortDirection: string): void => {
		if (key === sortColumn && sortDirection === "asc") {
			sortDirection = "desc";
		} else {
			sortDirection = "asc";
		}

		setSortSortColumn(key);
		setSortDirection(sortDirection);
	};

	return (
		<>
			<div className="d-flex flex-column-reverse flex-md-row justify-content-between mb-3 align-center">
				<InputAndLabel
					forId="filterData"
					name="filterData-input"
					type="text"
					label="Filter"
					labelClassName="mb-0 mr-1"
					className="d-flex mt-1 mb-md-0 align-center"
					inputClassName="mb-0"
					onChange={(e) => setFilter(e.target.value)}
				/>
				<Button
					priority="primary"
					color="dark"
					className="m-0"
					onClick={() => props.handleDownload(data)}
				>
					Download Data
				</Button>
			</div>
			<div className="overflow-scroll showScrollbar-vertical mb-3">
				<table className="table-verticalBorder">
					<thead>
						<tr>
							{columnsToDisplay?.map(
								({ key, name }: { key: string; name: string }) => (
									<th key={key}>
										<Button
											priority="secondary"
											color="dark"
											className="text-underline text-left m-0 p-0 link-text"
											aria-label={`Sort by ${name} column`}
											onClick={() => handleSortChange(key, sortDirection)}
											arrow={sortColumn === key}
											arrowDirection={sortDirection === "asc" ? "down" : "up"}
										>
											{name}
										</Button>
									</th>
								)
							)}
						</tr>
					</thead>
					<tbody>
						{isLoading ? (
							<tr>
								<td colSpan={100}>
									<Loader />
								</td>
							</tr>
						) : (
							dataDetails &&
							dataDetails[1]?.map((row: DataDetailsRow, i: number) => (
								<tr key={`page-${currentPage}-row-${i}`}>
									{Object.keys(row)
										.filter((k) =>
											columnsToDisplay.map((i) => i.key).includes(k)
										)
										.map((key, j) => {
											const columnLinks = row.external_db_links?.filter(
												(l) => l.column === key
											);
											const validKey =
												key === "hgnc_symbol" && !row[key]
													? "non_harmonised_symbol"
													: key;
											let columnContent = row[validKey as keyof DataDetailsRow];
											if (!columnContent && key === "amino_acid_change")
												columnContent = "-";
											return (
												<td key={`page-${currentPage}-row-${i}-column-${j}`}>
													{columnContent}
													{
														<>
															<br />
															{columnLinks?.length
																? columnLinks.map((l, k) => (
																		<span key={k}>
																			<Link
																				href={l.link}
																				target="_blank"
																				rel="noopener noreferrer"
																				onClick={() =>
																					ReactGA.event("external_provider", {
																						category: "event",
																						resource: l.resource,
																					})
																				}
																			>
																				{l.resource}
																			</Link>{" "}
																		</span>
																  ))
																: null}
														</>
													}
												</td>
											);
										})}
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
			<Pagination
				totalPages={
					dataDetails && dataDetails[0] >= 1
						? Math.ceil(dataDetails[0] / pageSize)
						: 1
				}
				currentPage={currentPage}
				onPageChange={(page: number) => setCurrentPage(page)}
			/>
		</>
	);
};

export default MolecularDataTable;
