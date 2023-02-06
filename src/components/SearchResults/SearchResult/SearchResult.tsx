import Card from "../../Card/Card";
import styles from "./SearchResult.module.scss";
import Link from "next/link";
import { SearchResult } from "../../../types/Search.model";

const dataTypes = [
	{
		key: "copy number alteration",
		name: "CNA",
		sectionLink: "molecular-data",
	},
	{
		key: "expression",
		name: "Expression",
		sectionLink: "molecular-data",
	},
	{
		key: "cytogenetics",
		name: "Cytogenetics",
		sectionLink: "molecular-data",
	},
	{
		key: "mutation",
		name: "Gene Mutation",
		sectionLink: "molecular-data",
	},
	{
		key: "dosing studies",
		name: "Dosing Studies",
	},
	{
		key: "patient treatment",
		name: "Patient Treatment",
	},
];

interface ISearchResultProps {
	className?: string;
	data: SearchResult;
}

const SearchResult = (props: ISearchResultProps) => {
	let {
		pdcmId,
		sourceId,
		datasource,
		histology,
		primarySite,
		collectionSite,
		tumourType,
		dataAvailable,
		modelType,
		patientAge,
		patientSex,
	} = props.data;

	return (
		<Card className={styles.SearchResult}>
			<div className="container w-100">
				<div className="row">
					<div className="col-12 col-md-6 col-lg-4 d-lg-flex flex-column justify-content-between">
						<div>
							<h2 className="h3 m-0">
								<Link href={`/data/models/${sourceId}/${pdcmId}`}>
									{pdcmId}
								</Link>
							</h2>
							<p>
								<Link href={`/about/provider/${sourceId?.toLowerCase()}`}>
									full provider_name
								</Link>
							</p>
						</div>
						<p>{histology}</p>
					</div>
					<div className="col-12 col-md-6 col-lg-4 mt-3 mt-md-0">
						<div className={`row ${styles.SearchResult_metadata}`}>
							<div className="col-6">
								<p className="text-capitalize">
									<span>Model type</span>
									<br />
									{modelType}
								</p>
							</div>
							<div className="col-6">
								<p className="text-capitalize">
									<span>Tumor type</span>
									<br />
									{tumourType}
								</p>
							</div>
							<div className="col-6">
								<p className="text-capitalize">
									<span>Primary site</span>
									<br />
									{primarySite}
								</p>
							</div>
							<div className="col-6">
								<p className="text-capitalize">
									<span>Collection site</span>
									<br />
									{collectionSite?.replaceAll("/", " / ")}
								</p>
							</div>
							<div className="col-6">
								<p className="text-capitalize">
									<span>Patient sex</span>
									<br />
									{patientSex}
								</p>
							</div>
							<div className="col-6">
								<p className="text-capitalize">
									<span>Patient age</span>
									<br />
									{patientAge}
								</p>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-12 col-lg-4 mt-3 mt-lg-0">
						<p
							className={`text-center ${styles.SearchResult_availableData_title}`}
						>
							Available data
						</p>
						<div className={`row ${styles.testGrid}`}>
							{dataTypes.map((dt) => {
								const hasData = dataAvailable?.includes(dt.key),
									name = dt.name;

								return (
									<div key={dt.key} className={!hasData ? "text-muted" : ""}>
										<p className="mb-0">
											{hasData ? (
												<Link
													href={`/data/models/${sourceId}/${pdcmId}#${
														dt.sectionLink
															? dt.sectionLink
															: dt.key.replace(" ", "-")
													}`}
												>
													{name}
												</Link>
											) : (
												name
											)}
										</p>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default SearchResult;
