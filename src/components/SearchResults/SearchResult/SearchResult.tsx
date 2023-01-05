import Card from "../../Card/Card";
import styles from "./SearchResult.module.scss";

interface ISearchResultProps {
	className?: string;
}

const SearchResult = (props: ISearchResultProps) => {
	return (
		<Card
			className={`bg-primary-tertiary ${props.className}`.trim()}
			contentClassName="masonry_content"
		>
			<Card
				className={`bg-white bc-primary-quaternary ${styles.SearchResult_titleCard}`}
				contentClassName={styles.SearchResult_titleCard_content}
			>
				<h2 className="m-0">Cutaneous Melanoma</h2>
				{/* Icon placeholder */}
			</Card>
			<div
				className={`text-white d-flex flex-column ${styles.SearchResult_dataContent}`}
			>
				<div className="row">
					<div className="col-12">
						<p className={`${styles.SearchResult_modelID}`}>CRL / CRL - 520</p>
						<p className="mb-0">Metastatic Tumour</p>
					</div>
				</div>
				<div className={`row ${styles.SearchResult_metadata}`}>
					<div className="col-6 col-lg-3">
						<p>
							<span>Primary site</span>
							<br />
							Skin
						</p>
					</div>
					<div className="col-6 col-lg-3">
						<p>
							<span>Patient age</span>
							<br />
							40-49
						</p>
					</div>
					<div className="col-6 col-lg-3">
						<p>
							<span>Patient sex</span>
							<br />
							Male
						</p>
					</div>
					<div className="col-6 col-lg-3">
						<p>
							<span>Collection site</span>
							<br />
							NA
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
						<ul className="ul-noStyle ul-twoCols m-0">
							<li>CNA</li>
							<li>Expression</li>
							<li>Cytogenetics</li>
							<li>Gene Mutation</li>
							<li>Dosing studies</li>
							<li>Patient Treatment</li>
						</ul>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default SearchResult;
