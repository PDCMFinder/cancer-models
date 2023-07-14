import {
	ExtLinks,
	MolecularDataRestrictions,
} from "../../pages/data/models/[providerId]/[modelId]";
import DosingTable from "./DosingTable";
import EngraftmentsTable from "./EngraftmentsTable";
import MolecularTable from "./MolecularTable";
import PublicationsTable from "./PublicationsTable";
import QualityTable from "./QualityTable";
import TreatmentTable from "./TreatmentTable";

interface DataTablesProps {
	tableName: string;
	modelData: any;
	limited?: boolean;
	molecularDataRestrictions?: MolecularDataRestrictions[];
	extLinks?: ExtLinks[];
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

	const getDataTable = (
		tableName: string,
		tableData: any,
		molecularDataRestrictions: MolecularDataRestrictions[] = [],
		extLinks: ExtLinks = {}
	) => {
		const commonProps = { data: tableData, limited: props.limited };
		switch (tableName) {
			case "molecularData":
				return (
					<MolecularTable
						{...commonProps}
						molecularDataRestrictions={molecularDataRestrictions}
						extLinks={extLinks}
					/>
				);
			case "engraftments":
				return <EngraftmentsTable {...commonProps} />;
			case "qualityData":
				return <QualityTable {...commonProps} />;
			case "drugDosing":
				return <DosingTable {...commonProps} />;
			case "patientTreatment":
				return <TreatmentTable {...commonProps} />;
			case "publications":
				return <PublicationsTable {...commonProps} />;
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
