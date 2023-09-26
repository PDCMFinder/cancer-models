import styles from "./DataCountCard.module.scss";
import Card from "../Card/Card";
import Link from "next/link";
import { getModelsByType } from "../../apis/AggregatedData.api";
import { useQuery } from "react-query";
import { capitalizeFirstLetter } from "../../utils/dataUtils";
import Loader from "../Loader/Loader";

interface IDataCountCardProps {
	layout: "vertical" | "horizontal";
}

const DataCountCard = ({ layout }: IDataCountCardProps) => {
	let modelsByTypeCountsQuery = useQuery("modelsByTypeCounts", () => {
		return getModelsByType();
	});

	return modelsByTypeCountsQuery.data ? (
		<Card className="bg-primary-quaternary">
			<div className="row text-center justify-content-center">
				{modelsByTypeCountsQuery.data
					?.filter((d) => d.modelType !== "other")
					.map((d) => (
						<div
							className={`${styles.DataCountCard_item} col-6 ${
								layout === "vertical" ? "col-lg-12" : "col-lg-4"
							}`}
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
	);
};

export default DataCountCard;
