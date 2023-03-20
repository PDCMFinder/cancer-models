import Card from "../../Card/Card";
import styles from "./SearchResult.module.scss";
import Link from "next/link";
import { SearchResult } from "../../../types/Search.model";
import QualityBadge from "../../QualityBadge/QualityBadge";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import breakPoints from "../../../utils/breakpoints";
import ShowHide from "../../ShowHide/ShowHide";

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
		sectionLink: "dosing-studies",
	},
	{
		key: "patient treatment",
		name: "Patient Treatment",
		sectionLink: "patient-treatment",
	},
];

interface ISearchResultProps {
	className?: string;
	data: SearchResult;
}

const SearchResult = (props: ISearchResultProps) => {
	const { windowWidth = 0 } = useWindowDimensions();
	const bpLarge = breakPoints.large;
	const {
		pdcmId,
		sourceId,
		providerName,
		histology,
		primarySite,
		collectionSite,
		tumourType,
		dataAvailable,
		modelType,
		patientAge,
		patientSex,
	} = props.data;

	const metadata = [
		{ name: "Model Type", data: modelType },
		{ name: "Tumor Type", data: tumourType },
		{ name: "Primary Site", data: primarySite },
		{ name: "Collection Site", data: collectionSite },
		{ name: "Patient Sex", data: patientSex },
		{ name: "Patient Age", data: patientAge },
	];

	const modelLink = `/data/models/${sourceId}/${pdcmId}`;

	return (
		<Card className={styles.SearchResult}>
			<div className="container w-100">
				<div className="row">
					<div className="col-12 col-md-6 col-lg-4 d-lg-flex flex-column justify-content-between">
						<div>
							<h2 className="h3 m-0">
								<Link href={modelLink}>{pdcmId}</Link>
							</h2>
							<p className="text-capitalize mb-0">
								<Link href={`/about/provider/${sourceId?.toLowerCase()}`}>
									{`${providerName?.substring(0, 50)}${
										providerName?.length > 50 ? "..." : ""
									}`}
								</Link>
							</p>
						</div>
						<ShowHide showOver={bpLarge} windowWidth={windowWidth}>
							<QualityBadge className="w-50" />
						</ShowHide>
						<p>{histology}</p>
						<ShowHide hideOver={bpLarge} windowWidth={windowWidth}>
							<QualityBadge className="w-50" />
						</ShowHide>
					</div>
					<div className="col-12 col-md-6 col-lg-4 mt-3 mt-md-0">
						<div className={`row ${styles.SearchResult_metadata}`}>
							{metadata.map((data) => {
								data.data =
									typeof data.data === "string"
										? data.data.replace("/", " / ")
										: data.data ?? "NA";

								return (
									<div className="col-6" key={data.name}>
										<p className="text-capitalize">
											<span>{data.name}</span>
											<br />
											{data.data}
										</p>
									</div>
								);
							})}
						</div>
					</div>
					<div className="col-12 col-md-12 col-lg-4 mt-3 mt-lg-0">
						<p
							className={`text-center ${styles.SearchResult_availableData_title}`}
						>
							Available data
						</p>
						<div className={`row ${styles.dataAvailable_grid}`}>
							{dataTypes.map((dt) => {
								const hasData = dataAvailable?.includes(dt.key),
									name = dt.name;

								return (
									<div key={dt.key} className={!hasData ? "text-muted" : ""}>
										<p className="mb-0">
											{hasData ? (
												<Link
													href={`${modelLink}#${
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
