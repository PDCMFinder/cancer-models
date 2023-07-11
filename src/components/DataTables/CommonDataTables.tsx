import DosingTable from "./DosingTable";
import EngraftmentsTable from "./EngraftmentsTable";
import MolecularDataTable from "./MolecularDataTable";
import QualityTable from "./QualityTable";

interface ICommonDataTablesProps {
	tableName: string;
	firstModelData: any;
	secondModelData?: any;
	limited?: boolean;
}

const CommonDataTables = (props: ICommonDataTablesProps) => {
	let tableTitle: string = "";

	switch (props.tableName) {
		case "engraftments":
			tableTitle = "PDX model engraftment";
			break;
		case "qualityData":
			tableTitle = "Model quality control";
			break;
		case "drugDosing":
			tableTitle = "Dosing studies";
			break;
		default:
			break;
	}

	const getDataTable = (tableName: string, tableData: any) => {
		switch (tableName) {
			case "molecularData":
				return <MolecularDataTable />;
			case "engraftments":
				return <EngraftmentsTable data={tableData} limited={props.limited} />;
			case "qualityData":
				return <QualityTable data={tableData} limited={props.limited} />;
			case "drugDosing":
				return <DosingTable data={tableData} limited={props.limited} />;
			default:
				break;
		}
	};

	return (
		<div className="row">
			<div className="col-12">
				<h2 className="h3 mb-0">{tableTitle}</h2>
			</div>
			{props.firstModelData.length > 0 && (
				<div className="col-6">
					{getDataTable(props.tableName, props.firstModelData)}
				</div>
			)}
			{props.secondModelData.length > 0 && (
				<div
					className={`col-6 ${
						props.firstModelData.length === 0 ? "offset-6" : ""
					}`}
				>
					{getDataTable(props.tableName, props.secondModelData)}
				</div>
			)}
		</div>
	);
};

export default CommonDataTables;
