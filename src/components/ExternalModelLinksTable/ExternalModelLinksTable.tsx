import { ExternalModelLink, ExtLinks } from "../../types/ModelData.model";

const RowContent = ({
	link,
	type
}: {
	link: ExternalModelLink;
	type: ExternalModelLink["type"];
}) => {
	if (type === "supplier") {
		return (
			<td>
				Visit{" "}
				<a href={link.link} target="_blank" rel="noreferrer">
					{link.resourceLabel}: {link.linkLabel}
				</a>{" "}
				to purchase
			</td>
		);
	} else {
		return (
			<td>
				{link.resourceLabel}:{" "}
				<a href={link.link} target="_blank" rel="noreferrer">
					{link.linkLabel}
				</a>
			</td>
		);
	}
};

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
							<RowContent link={link} type={type} />
						</tr>
					))}
			</tbody>
		</table>
	);
};

export default ExternalModelLinksTable;
