import { IGitlabRelease } from "../../../types/releaseTypes";
import Card from "../Card/Card";
import styles from "./index.module.scss";

type Props = {
	releases: IGitlabRelease[];
};

const ReleasesList = ({ releases }: Props) => {
	return (
		<>
			{releases.map((data: IGitlabRelease) => {
				const repository = data.repository === "data" ? "Data" : "UI";
				return (
					<div className="row mb-5" key={data.released_at + data.tag_name}>
						<div className="col-12 col-lg-8 offset-lg-2">
							<Card
								headerClassName="py-1"
								header={
									<div className="d-flex align-center justify-content-between">
										<h2 className="p-0 m-0 h3">
											{repository}:{" "}
											<span className="text-bold">{data.tag_name}</span>
										</h2>
										<p className="h4 m-0">{data.released_at}</p>
									</div>
								}
								contentClassName="py-2"
							>
								<div
									className={styles.Releases_release_content}
									// we trust gitlab and github, dont we? Nothing dangerous here
									dangerouslySetInnerHTML={{ __html: data.description }}
								/>
							</Card>
						</div>
					</div>
				);
			})}
		</>
	);
};

export default ReleasesList;
