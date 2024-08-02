import { ExternalModelLink, ExtLinks } from "../../types/ModelData.model";

const ExternalModelLinksTable = ({
	externalModelLinksByType,
	type,
	columnHeader
}: {
	externalModelLinksByType: ExtLinks["externalModelLinksByType"];
	type: ExternalModelLink["type"];
	columnHeader: string;
}) => {
	return (
		<table>
			<caption>External resources: {columnHeader}</caption>
			<thead>
				<tr>
					<th>{columnHeader}</th>
				</tr>
			</thead>
			<tbody>
				{externalModelLinksByType[type] &&
					externalModelLinksByType[type].map((link) => (
						<tr key={link.linkLabel + link.resourceLabel}>
							<td>
								{link.resourceLabel}:{" "}
								<a href={link.link} target="_blank" rel="noreferrer">
									{link.linkLabel}
								</a>
							</td>
						</tr>
					))}
			</tbody>
		</table>
	);
};

export default ExternalModelLinksTable;
