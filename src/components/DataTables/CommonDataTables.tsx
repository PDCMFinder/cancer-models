import DosingTable from "./DosingTable";
import EngraftmentsTable from "./EngraftmentsTable";
import MolecularTable from "./MolecularTable";
import PublicationsTable from "./PublicationsTable";
import QualityTable from "./QualityTable";
import TreatmentTable from "./TreatmentTable";

interface ICommonDataTablesProps {
	tableName: string;
	firstModelData: any;
	secondModelData?: any;
	limited?: boolean;
	firstModelMolecularDataRestrictions?: any;
	firstModelExtLinks?: any;
	secondModelMolecularDataRestrictions?: any;
	secondModelExtLinks?: any;
}

const CommonDataTables = (props: ICommonDataTablesProps) => {
	let tableTitle: string = "";

	switch (props.tableName) {
		case "molecularData":
			tableTitle = "Molecular data";
			break;
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
		molecularDataRestrictions: any = [],
		extLinks: any = []
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
				return <></>;
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

	return (
		<div className="row">
			<div className="col-12">
				<h2 className="h3 mb-0">{tableTitle}</h2>
			</div>
			{props.firstModelData.length > 0 && (
				<div className="col-6">
					{getDataTable(
						props.tableName,
						props.firstModelData,
						props.firstModelMolecularDataRestrictions,
						props.firstModelExtLinks
					)}
				</div>
			)}
			{props.secondModelData.length > 0 && (
				<div className="col-6">
					{getDataTable(
						props.tableName,
						props.secondModelData,
						props.secondModelMolecularDataRestrictions,
						props.secondModelExtLinks
					)}
				</div>
			)}
		</div>
	);
};

export default CommonDataTables;
