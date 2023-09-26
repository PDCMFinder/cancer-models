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

const DataCountCard = (props: IDataCountCardProps) => {
	const isVertical = props.layout === "vertical";
	let modelsByTypeCountsQuery = useQuery("modelsByTypeCounts", () => {
		return getModelsByType();
	});

	return modelsByTypeCountsQuery.data ? (
		<Card className="bg-primary-quaternary">
			<div
				className={`row text-center justify-content-center row-cols-1 ${
					isVertical ? "" : "row-cols-lg-3"
				}`}
			>
				{modelsByTypeCountsQuery.data
					?.filter((d) => d.modelType !== "other")
					.map((d) => (
						<div
							className={`my-3 col ${isVertical ? "" : "my-lg-0"}`}
							key={d.modelType}
						>
							<Link
								href={`/search?filters=model_type:${d.modelType}`}
								className="p text-noDecoration"
							>
								<p className="h2 mb-0">
									{parseFloat(d.count).toLocaleString()}
								</p>
								<p
									className={`text-underline ${
										isVertical ? "" : "mb-0"
									}`.trim()}
								>
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
