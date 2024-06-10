import Link from "next/link";
import { Publication as IPublication } from "../../types/ModelData.model";

interface IPublicationProps {
	data: IPublication;
	needsSeparator?: boolean;
}

const Publication = ({ data, needsSeparator }: IPublicationProps) => {
	return (
		<div key={data.pmid}>
			{data.title && <h3>{data.title.replace(/<[^>]+>/g, " ")}</h3>}
			<p className="text-muted text-small">{data.authorString}</p>
			<p className="mb-3 text-small">
				{data.journalTitle} - {data.pubYear}
			</p>
			<ul className="ul-noStyle text-small d-md-flex">
				{data.pmid && (
					<li className="mr-md-3">
						<Link
							href={`https://europepmc.org/article/MED/${data.pmid}`}
							target="_blank"
							rel="noreferrer noopener"
						>
							View at EuropePMC
						</Link>
					</li>
				)}
				{data.doi && (
					<li className="mr-md-3">
						<Link
							href={`https://doi.org/${data.doi}`}
							target="_blank"
							rel="noreferrer noopener"
						>
							DOI:{data.doi}
						</Link>
					</li>
				)}
				{data.pmid && (
					<li>
						<Link
							href={`https://pubmed.ncbi.nlm.nih.gov/${data.pmid}`}
							target="_blank"
							rel="noreferrer noopener"
						>
							PubMed
						</Link>
					</li>
				)}
			</ul>
			{needsSeparator && <hr style={{ backgroundColor: "#d2d2d2" }} />}
		</div>
	);
};

export default Publication;
