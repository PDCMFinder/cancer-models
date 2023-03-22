import styles from "./DataCountCard.module.scss";
import Card from "../Card/Card";
import Link from "next/link";
import { getModelsByType } from "../../apis/AggregatedData.api";
import { useQuery } from "react-query";
import { capitalizeFirstLetter } from "../../utils/dataUtils";
import Loader from "../Loader/Loader";

interface IDataCountCardProps {}

const DataCountCard = (props: IDataCountCardProps) => {
	let modelsByTypeCountsQuery = useQuery("modelsByTypeCounts", () => {
		return getModelsByType();
	});

	return (
		<div className="col-12 col-lg-3 col-xl-2 offset-lg-1 offset-xl-2">
			{modelsByTypeCountsQuery.data ? (
				<Card className="bg-primary-quaternary">
					<div className="row text-center justify-content-center">
						{modelsByTypeCountsQuery.data
							?.filter((d) => d.modelType !== "other")
							.map((d) => (
								<div
									className={`${styles.DataCountCard_item} col-6 col-lg-12`}
									key={d.modelType}
								>
									<Link
										href={`/search?filters=model_type:${d.modelType}`}
										className="p text-noDecoration"
									>
										<p className="h2 mb-0">
											{parseFloat(d.count).toLocaleString()}
										</p>
										<p className="text-underline">
											{capitalizeFirstLetter(d.modelType)} models
										</p>
									</Link>
								</div>
							))}
					</div>
				</Card>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default DataCountCard;
