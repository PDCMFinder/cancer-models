import Card from "../../Card/Card";
import styles from "./SearchResult.module.scss";
import Image from "next/image";
import Link from "next/link";

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
		<Link
			href={`data/${data_source}/${external_model_id}`}
			className={`${props.className}`.trim()}
		>
			<Card className={styles.SearchResult} contentClassName="masonry_content">
				<Card
					className={`bg-white ${styles.SearchResult_titleCard}`}
					contentClassName={`d-flex align-center justify-content-between ${styles.SearchResult_titleCard_content}`}
				>
					<>
						<h2 className="m-0">{histology}</h2>
						<Image
							src={`/${model_type}_icon-small.svg`}
							alt={`Icon for ${model_type} model type`}
							width={28}
							height={28}
						/>
					</>
				</Card>
				<div
					className={`d-flex flex-column ${styles.SearchResult_dataContent}`}
				>
					<div className="row">
						<div className="col-12">
							<p className={`${styles.SearchResult_modelID}`}>
								{data_source} / {external_model_id}
							</p>
							<p className="mb-0">{tumour_type}</p>
						</div>
					</div>
					<div className={`row ${styles.SearchResult_metadata}`}>
						<div className="col-6 col-lg-3">
							<p className="text-capitalize">
								<span>Primary site</span>
								<br />
								{primary_site}
							</p>
						</div>
						<div className="col-6 col-lg-3">
							<p className="text-capitalize">
								<span>Patient age</span>
								<br />
								{patient_age}
							</p>
						</div>
						<div className="col-6 col-lg-3">
							<p className="text-capitalize">
								<span>Patient sex</span>
								<br />
								{patient_sex}
							</p>
						</div>
						<div className="col-6 col-lg-3">
							<p className="text-capitalize">
								<span>Collection site</span>
								<br />
								{collection_site.replaceAll("/", " / ")}
							</p>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<p
								className={`text-center ${styles.SearchResult_availableData_title}`}
							>
								Available data
							</p>
							<ul className="ul-noStyle ul-twoCols m-0 text-capitalize">
								{dataset_available.map((dataset) => (
									<li key={dataset}>{dataset}</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</Card>
		</Link>
	);
};

export default SearchResult;
