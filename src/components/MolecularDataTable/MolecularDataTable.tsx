import styles from "./MolecularDataTable.module.scss";
import { MolecularData } from "../../pages/data/models/[providerId]/[modelId]";
import Button from "../Button/Button";
import { useQuery } from "react-query";
import {
	getAvailableDataColumns,
	getModelMolecularDataDetails,
} from "../../apis/ModelDetails.api";
import Loader from "../Loader/Loader";
import { useState } from "react";

interface IMolecularDataTableProps {
	data: MolecularData;
	filter: string;
	page: number;
	sortColumn: string;
	sortDirection: string;
	pageSize: number;
	handleDownload: (data: MolecularData) => void;
}

const MolecularDataTable = (props: IMolecularDataTableProps) => {
	const data = props.data ?? {};

	const { data: columns } = useQuery(
		["get-molecular-data-detail-cols", data.dataSource, data.dataType],
		() => getAvailableDataColumns(data.dataSource, data.dataType)
	);

	const { data: dataDetails, isLoading } = useQuery(
		[
			"get-molecular-data-detail",
			data.id,
			data.dataType,
			props.filter,
			props.page,
			props.pageSize,
			props.sortColumn,
			props.sortDirection,
		],
		() =>
			getModelMolecularDataDetails(
				data.id,
				data.dataType,
				props.filter,
				props.page,
				props.pageSize,
				props.sortColumn,
				props.sortDirection
			)
	);

	let columnsToDisplay: any[] = [];
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
			case "cytogenetics":
				columnsToDisplay = [
					{ key: "hgnc_symbol", name: "HGNC Symbol" },
					{ key: "result", name: "Result" },
				];
				break;
		}
	}

	return (
		<div>
			<div className="text-right">
				<Button
					priority="primary"
					color="dark"
					className="m-0"
					onClick={() => props.handleDownload(data)}
				>
					Download Data
				</Button>
			</div>
			<table className="table-verticalBorder">
				<thead>
					<tr>
						{columnsToDisplay?.map(
							({ key, name }: { key: string; name: string }) => (
								<th key={key}>
									<button
										className="text-underline text-left"
										// onClick={() =>
										// 	onSortChange(
										// 		key,
										// 		getSortDirection(key, sortColumn, sortDirection)
										// 	)
										// }
									>
										{name}
										{/* {sortColumn === key &&
											(sortDirection === "asc" ? "faArrowUp" : "faArrowDown")} */}
									</button>
								</th>
							)
						)}
					</tr>
				</thead>
				<tbody>
					{isLoading ? (
						<tr>
							<td>
								<Loader />
							</td>
						</tr>
					) : (
						dataDetails[1]?.map((row) => {
							return (
								<tr key={row.hgnc_symbol}>
									{Object.keys(row)
										.filter((k) =>
											columnsToDisplay.map((i) => i.key).includes(k)
										)
										.map((key, index) => {
											if (key === "hgnc_symbol") {
												return row[key] ? (
													<td key={index}>{row[key]}</td>
												) : (
													<td key={index}>{row["non_harmonised_symbol"]}</td>
												);
											} else {
												return <td key={index}>{row[key]}</td>;
											}
										})}
								</tr>
							);
						})
					)}
				</tbody>
			</table>
		</div>
	);
};

export default MolecularDataTable;
