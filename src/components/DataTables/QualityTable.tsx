interface IEngraftmentsTableProps {
	data: any;
	limited?: boolean;
}

const EngraftmentsTable = (props: IEngraftmentsTableProps) => {
	const isLimited = props.limited;

	return (
		<div id="quality-control" className="row mb-5 pt-3">
			<div className="col-12 mb-1">
				<div className="overflow-scroll showScrollbar-vertical">
					<table>
						<caption>Model quality control</caption>
						<thead>
							<tr>
								<th>TECHNIQUE</th>
								<th>DESCRIPTION</th>
								{!isLimited && <th>PASSAGE</th>}
							</tr>
						</thead>
						<tbody>
							{props.data.map(
								({
									validationTechnique,
									description,
									passagesTested,
								}: {
									validationTechnique: string;
									description: string;
									passagesTested: string;
								}) => (
									<tr key={validationTechnique}>
										<td>{validationTechnique}</td>
										<td>{description}</td>
										{!isLimited && <td>{passagesTested}</td>}
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

export default EngraftmentsTable;
