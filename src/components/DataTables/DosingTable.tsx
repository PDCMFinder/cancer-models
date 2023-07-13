import styles from "./DosingTable.module.scss";

interface IDosingTableProps {
	data: any;
	limited?: boolean;
}

const DosingTable = (props: IDosingTableProps) => {
	return (
		<div id="dosing-studies" className="row mb-5 pt-3">
			<div className="col-12 mb-1">
				<div className="overflow-scroll showScrollbar-vertical">
					<table>
						<caption>Dosing studies</caption>
						<thead>
							<tr>
								<th>DRUG</th>
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
										<td>{name}</td>
										<td>{dose}</td>
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

export default DosingTable;
