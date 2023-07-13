import styles from "./TreatmentTable.module.scss";

interface ITreatmentTableProps {
	data: any;
	limited?: boolean;
}

const TreatmentTable = (props: ITreatmentTableProps) => {
	return (
		<div id="patient-treatment" className="row mb-5 pt-1">
			<div className="col-12 mb-1">
				<div className="overflow-scroll showScrollbar-vertical">
					<table>
						<caption>Patient treatment</caption>
						<thead>
							<tr>
								<th>TREATMENT</th>
								<th>DOSE</th>
								<th>RESPONSE</th>
							</tr>
						</thead>
						<tbody>
							{props.data.map(
								({
									treatmentName: name,
									treatmentDose: dose,
									treatmentResponse: response,
								}: {
									treatmentName: string;
									treatmentDose: string;
									treatmentResponse: string;
								}) => (
									<tr key={name}>
										<td className="white-space-unset">{name}</td>
										<td className="text-capitalize">{dose}</td>
										<td>{response}</td>
									</tr>
								)
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default TreatmentTable;
