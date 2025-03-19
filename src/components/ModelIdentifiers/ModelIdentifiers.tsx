import { Fragment, memo, ReactNode } from "react";
import ReactGA from "react-ga4";
import {
	ExternalModelLink,
	ExternalModelLinkByType
} from "../../types/ModelData.model";

type Props = {
	externalModelLinks: ExternalModelLinkByType;
};

const showTypeSeparator = (
	externalModelLinks: ExternalModelLinkByType,
	index: number
) =>
	externalModelLinks.supplier?.length > 0
		? true
		: index !== externalModelLinks.external_id.length - 1;

const renderLinkElement = (link: ExternalModelLink) => {
	return (
		<>
			{" "}
			{link.resourceLabel}:{" "}
			<a
				className="text-white"
				href={link.link}
				target="_blank"
				rel="noreferrer"
				onClick={() => {
					ReactGA.event("model_identifier_click", {
						category: "event",
						label: link.linkLabel
					});
				}}
			>
				{link.linkLabel}
			</a>
		</>
	);
};

const joinElements = (
	elements: JSX.Element[] | JSX.Element[][],
	separator = ", "
) => {
	const flattenedElements: JSX.Element[] = elements.flat();

	const interleavedElements = flattenedElements.reduce<ReactNode[]>(
		(acc, element, index) => {
			if (index > 0) {
				acc.push(separator);
			}

			acc.push(element);

			return acc;
		},
		[]
	);

	return <>{interleavedElements}</>;
};

const renderExternalLinks = (
	externalModelLinks: ExternalModelLinkByType
): ReactNode => {
	const identifiers: JSX.Element[] = [];
	for (const [_, links] of Object.entries(externalModelLinks)) {
		for (const link of links) {
			identifiers.push(
				<Fragment key={link.link}>{renderLinkElement(link)}</Fragment>
			);
		}
	}

	return <>{joinElements(identifiers)}</>;
};

const ModelIdentifiers = ({ externalModelLinks }: Props) => {
	return (
		<div className="mt-2">
			<p className="mb-0">
				<b>Identifiers:</b>
				{renderExternalLinks(externalModelLinks)}
			</p>
		</div>
	);
};

export default memo(ModelIdentifiers);
