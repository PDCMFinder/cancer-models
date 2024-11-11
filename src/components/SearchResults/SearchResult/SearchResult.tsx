import Link from "next/link";
import { ChangeEvent } from "react";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { SearchResult as SearchResultType } from "../../../types/Search.model";
import breakPoints from "../../../utils/breakpoints";
import Card from "../../Card/Card";
import InputAndLabel from "../../Input/InputAndLabel";
import ModelNotAvailable from "../../ModelNotAvailable/ModelNotAvailable";
import QualityBadge from "../../QualityBadge/QualityBadge";
import ShowHide from "../../ShowHide/ShowHide";
import styles from "./SearchResult.module.scss";

const dataTypes = [
	{
		key: "copy number alteration",
		name: "CNA",
		sectionLink: "molecular-data"
	},
	{
		key: "expression",
		name: "Expression",
		sectionLink: "molecular-data"
	},
	{
		key: "bio markers",
		name: "Bio Markers",
		sectionLink: "molecular-data"
	},
	{
		key: "mutation",
		name: "Gene Mutation",
		sectionLink: "molecular-data"
	},
	{
		key: "model treatment",
		name: "Model Treatment",
		sectionLink: "model-treatment"
	},
	{
		key: "patient treatment",
		name: "Patient Treatment",
		sectionLink: "patient-treatment"
	}
];

type SearchResultProps = {
	className?: string;
	data: SearchResultType;
	addModelToCompare: (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) => void;
	compareCheck: boolean;
};

const SearchResult = (props: SearchResultProps) => {
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
		score,
		modelAvailable
	} = props.data;

	const metadata = [
		{ name: "Model Type", data: modelType },
		{ name: "Tumor Type", data: tumourType },
		{ name: "Primary Site", data: primarySite },
		{ name: "Collection Site", data: collectionSite },
		{ name: "Patient Sex", data: patientSex },
		{ name: "Patient Age", data: patientAge }
	];

	const modelLink = `/data/models/${sourceId}/${pdcmId}`;

	return (
		<Card
			className={`${styles.SearchResult} ${
				modelAvailable ? "" : styles.modelNotAvailable
			}`}
			id="tour_searchResult"
		>
			<div className="row">
				<div className="col-12 col-md-6 col-lg-4 d-lg-flex flex-column justify-content-between">
					<div>
						<h2 className="h3 m-0">
							<Link href={modelLink}>{pdcmId}</Link>
						</h2>
						<p className="text-capitalize mb-0">
							<Link
								href={`/about/providers/${sourceId?.toLowerCase()}`}
								title={providerName}
							>
								{`${providerName?.substring(0, 50)}${
									providerName?.length > 50 ? "..." : ""
								}`}
							</Link>
						</p>
						{!modelAvailable && <ModelNotAvailable />}
					</div>
					<ShowHide showOver={bpLarge} windowWidth={windowWidth}>
						{score > 0 && (
							<QualityBadge
								score={score}
								containerClassName="text-muted"
								style={{ width: "10em" }}
								className="w-50"
							/>
						)}
					</ShowHide>
					<p>{histology}</p>
					<ShowHide hideOver={bpLarge} windowWidth={windowWidth}>
						{score > 0 && (
							<QualityBadge
								score={score}
								containerClassName="text-muted"
								style={{ width: "10em" }}
								className="w-50"
							/>
						)}
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
				<div className="col-12 col-md-12 col-lg-4 mt-3 mt-lg-0 d-flex flex-column">
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
								<div key={dt.key} className="col-6 h-fit">
									<p className={`mb-0 ${!hasData ? "text-muted" : ""}`.trim()}>
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
						<ShowHide showOver={bpLarge} windowWidth={windowWidth}>
							<InputAndLabel
								forId={pdcmId}
								id={pdcmId}
								name={`${pdcmId}-name`}
								type="checkbox"
								label="Add to compare"
								className="text-smaller mt-2"
								onChange={props.addModelToCompare}
								checked={props.compareCheck}
							/>
						</ShowHide>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default SearchResult;
