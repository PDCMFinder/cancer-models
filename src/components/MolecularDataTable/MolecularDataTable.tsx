import styles from "./MolecularDataTable.module.scss";
import { MolecularData } from "../../pages/data/models/[providerId]/[modelId]";
import Button from "../Button/Button";
import { useState, useRef } from "react";

interface IMolecularDataTableProps {
	data: MolecularData;
}

const MolecularDataTable = (props: IMolecularDataTableProps) => {
	const data = props.data;

	return (
		<div>
			<Button priority="primary" color="dark">
				Download Data
			</Button>
			{data.xenograftModelId}
		</div>
	);
};

export default MolecularDataTable;
