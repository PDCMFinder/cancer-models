import styles from "./PublicationsTable.module.scss";
import Link from "next/link";

interface IPublicationsTableProps {
	data: any;
	limited?: boolean;
}

const PublicationsTable = (props: IPublicationsTableProps) => {
	return (
		<div id="publications" className="row mb-5 pt-3">
			<div className="col-12">
				{props.data?.map((publication: any, idx: number) => {
					const needsSeparator =
						props.data.length > 1 && idx !== props.data.length - 1;

					return (
						<div key={publication.pmid}>
							{publication.title && (
								<h3>{publication.title.replace(/<[^>]+>/g, " ")}</h3>
							)}
							<p className="text-muted text-small">
								{publication.authorString}
							</p>
							<p className="mb-3 text-small">
								{publication.journalTitle} - {publication.pubYear}
							</p>
							<ul className="ul-noStyle text-small d-md-flex">
								{publication.pmid && (
									<li className="mr-md-3">
										<Link
											href={`https://europepmc.org/article/MED/${publication.pmid}`}
										>
											View at EuropePMC
										</Link>
									</li>
								)}
								{publication.doi && (
									<li className="mr-md-3">
										<Link href={`https://doi.org/${publication.doi}`}>
											DOI:{publication.doi}
										</Link>
									</li>
								)}
								{publication.pmid && (
									<li>
										<Link
											href={`https://pubmed.ncbi.nlm.nih.gov/${publication.pmid}`}
										>
											PubMed
										</Link>
									</li>
								)}
							</ul>
							{needsSeparator && <hr style={{ backgroundColor: "#d2d2d2" }} />}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default PublicationsTable;
