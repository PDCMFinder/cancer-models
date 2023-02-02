import Card from "../../Card/Card";
import styles from "./SearchResult.module.scss";
import Link from "next/link";

const dataTypes = [
	{
		key: "copy number alteration",
		name: "CNA",
	},
	{
		key: "expression",
		name: "Expression",
	},
	{
		key: "cytogenetics",
		name: "Cytogenetics",
	},
	{
		key: "mutation",
		name: "Gene Mutation",
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
	data: {
		patient_age: string;
		patient_sex: string;
		external_model_id: string;
		model_type: string;
		data_source: string;
		histology: string;
		primary_site: string;
		collection_site: string;
		tumour_type: string;
		dataset_available: string[];
	};
}

const SearchResult = (props: ISearchResultProps) => {
	let {
		patient_age,
		patient_sex,
		external_model_id,
		model_type,
		data_source,
		histology,
		primary_site,
		collection_site,
		tumour_type,
		dataset_available,
	} = props.data;

	return (
		<Card className={`${styles.SearchResult} mb-2`}>
			<div className="container w-100">
				<div className="row">
					<div className="col-12 col-md-4 d-flex flex-column justify-content-between">
						<div>
							<h2 className="h3 m-0">
								<Link href={`/data/models/${data_source}/${external_model_id}`}>
									{external_model_id}
								</Link>
							</h2>
							<p>
								<Link href={`/about/provider/${data_source}`}>
									full provider_name
								</Link>
							</p>
						</div>
						<p>{histology}</p>
					</div>
					<div className="col-12 col-md-4">
						<div className={`row ${styles.SearchResult_metadata}`}>
							<div className="col-6">
								<p className="text-capitalize">
									<span>Model type</span>
									<br />
									{model_type}
								</p>
							</div>
							<div className="col-6">
								<p className="text-capitalize">
									<span>Tumor type</span>
									<br />
									{tumour_type}
								</p>
							</div>
							<div className="col-6">
								<p className="text-capitalize">
									<span>Primary site</span>
									<br />
									{primary_site}
								</p>
							</div>
							<div className="col-6">
								<p className="text-capitalize">
									<span>Collection site</span>
									<br />
									{collection_site.replaceAll("/", " / ")}
								</p>
							</div>
							<div className="col-6">
								<p className="text-capitalize">
									<span>Patient sex</span>
									<br />
									{patient_sex}
								</p>
							</div>
							<div className="col-6">
								<p className="text-capitalize">
									<span>Patient age</span>
									<br />
									{patient_age}
								</p>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-4">
						<p
							className={`text-center ${styles.SearchResult_availableData_title}`}
						>
							Available data
						</p>
						<div className={`row ${styles.testGrid}`}>
							{dataTypes.map((dt) => {
								const hasData = dataset_available?.includes(dt.key),
									name = dt.name;

								return (
									<div
										key={dt.key}
										className={`col-6 ${!hasData ? "text-muted" : ""}`.trim()}
									>
										<p className="mb-0">
											{hasData ? (
												<Link
													href={`/data/models/${data_source}/${external_model_id}#${dt}`}
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
