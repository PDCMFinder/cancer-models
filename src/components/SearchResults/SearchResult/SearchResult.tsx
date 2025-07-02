import Link from "next/link";
import { ChangeEvent } from "react";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { SearchResult as SearchResultType } from "../../../types/Search.model";
import breakPoints from "../../../utils/breakpoints";
import Card from "../../Card/Card";
import ModelTypeIcon from "../../Icons/ModelTypeIcon";
import InputAndLabel from "../../Input/InputAndLabel";
import ModelNotAvailable from "../../ModelNotAvailable/ModelNotAvailable";
import QualityBadge from "../../QualityBadge/QualityBadge";
import ShowHide from "../../ShowHide/ShowHide";
import Tooltip from "../../Tooltip/Tooltip";
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
				<div className="col-12 col-md-6 col-lg-4 row-gap-2 d-flex flex-column">
					<div>
						<h2 className="h3 m-0">
							<Link href={modelLink}>{pdcmId}</Link>
						</h2>
						<p className="text-capitalize mb-0">
							<Link href={`/about/providers/${sourceId}`} title={providerName}>
								{`${providerName?.substring(0, 50)}${
									providerName?.length > 50 ? "..." : ""
								}`}
							</Link>
						</p>
					</div>
					{!modelAvailable && <ModelNotAvailable />}
					<p className="mb-0">{histology}</p>
					{score > 0 && (
						<div className="d-flex align-center">
							<Tooltip
								content={
									<p
										className="text-small m-0 text-capitalize"
										style={{ width: "max-content", maxWidth: "300px" }}
									>
										{modelType} model
									</p>
								}
								className="w-max"
							>
								<ModelTypeIcon
									modelType={modelType}
									size="2.5rem"
									hideOther={true}
									id="tour_model-type"
									className="d-block"
								/>
							</Tooltip>
							<QualityBadge
								score={score}
								containerClassName="text-muted"
								style={{ width: "10em" }}
							/>
						</div>
					)}
					<ShowHide showOver={bpLarge} windowWidth={windowWidth}>
						<InputAndLabel
							forId={pdcmId}
							id={pdcmId}
							name={`${pdcmId}-name`}
							type="checkbox"
							label="Add to compare"
							style={{
								padding: ".2rem .8rem",
								alignItems: "center !important"
							}}
							labelClassName="cursor-pointer"
							inputClassName="cursor-pointer"
							className={`border-xs w-max text-small cursor-pointer mt-2 br-common ${styles["SearchResult_compare-button"]}`}
							onChange={props.addModelToCompare}
							checked={props.compareCheck}
						/>
					</ShowHide>
				</div>
				<div className="col-12 col-md-6 col-lg-4 d-flex">
					<div
						className={`row row-cols-2 align-content-between ${styles.SearchResult_metadata}`}
					>
						{metadata.map((data) => {
							data.data =
								typeof data.data === "string"
									? data.data.replace("/", " / ")
									: data.data ?? "NA";

							return (
								<div className="col h-fit" key={data.name}>
									<p className="text-capitalize mb-0">
										<span>{data.name}</span>
										<br />
										{data.data}
									</p>
								</div>
							);
						})}
					</div>
				</div>
				<div className="col-12 col-md-6 col-lg-4 d-flex flex-column">
					<p
						className={`text-center ${styles.SearchResult_availableData_title}`}
					>
						Available data
					</p>
					<div
						className={"row row-cols-2 align-content-between"}
						style={{ flex: "1" }}
					>
						{dataTypes.map((dt) => {
							const hasData = dataAvailable?.includes(dt.key),
								name = dt.name;

							return (
								<div key={dt.key} className="col h-fit">
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
					</div>
				</div>
			</div>
		</Card>
	);
};

export default SearchResult;
