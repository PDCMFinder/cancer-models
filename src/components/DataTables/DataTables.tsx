import DosingTable from "./DosingTable";
import EngraftmentsTable from "./EngraftmentsTable";
import MolecularDataTable from "./MolecularTable";
import PublicationsTable from "./PublicationsTable";
import QualityTable from "./QualityTable";
import TreatmentTable from "./TreatmentTable";

interface DataTablesProps {
	tableName: string;
	modelData: any;
	limited?: boolean;
}

const DataTables = (props: DataTablesProps) => {
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
		case "patientTreatment":
			tableTitle = "Patient treatment";
			break;
		case "publications":
			tableTitle = "Publications";
			break;
		default:
			break;
	}

	const getDataTable = (tableName: string, tableData: any) => {
		switch (tableName) {
			case "engraftments":
				return <EngraftmentsTable data={tableData} limited={props.limited} />;
			case "qualityData":
				return <QualityTable data={tableData} limited={props.limited} />;
			case "drugDosing":
				return <DosingTable data={tableData} limited={props.limited} />;
			case "patientTreatment":
				return <TreatmentTable data={tableData} limited={props.limited} />;
			case "publications":
				return <PublicationsTable data={tableData} limited={props.limited} />;
			default:
				break;
		}
	};

	return props.modelData?.length > 0 ? (
		<div className="row">
			<div className="col-12">
				<h2 className="h3 mb-0">{tableTitle}</h2>
			</div>
			<div className="col-12">
				{getDataTable(props.tableName, props.modelData)}
			</div>
		</div>
	) : null;
};

export default DataTables;
