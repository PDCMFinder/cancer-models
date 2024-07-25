import Link from "next/link";
import { useQuery } from "react-query";
import { getModelsByType } from "../../apis/AggregatedData.api";
import { capitalizeFirstLetter } from "../../utils/dataUtils";
import Card from "../Card/Card";
import ModelTypeIcon from "../Icons/ModelTypeIcon";
import Loader from "../Loader/Loader";

interface IDataCountCardProps {
	layout: "vertical" | "horizontal";
}

const DataCountCard = (props: IDataCountCardProps) => {
	const isVertical = props.layout === "vertical";
	const { data } = useQuery("modelsByTypeCounts", () => getModelsByType());

	return data ? (
		<Card className="bg-primary-quaternary">
			<div
				className={`row text-center justify-content-center row-cols-1 ${
					isVertical ? "" : "row-cols-lg-3"
				}`}
			>
				{data.map((d) => (
					<div
						className={`my-3 col ${isVertical ? "" : "my-lg-0"}`}
						key={d.modelType}
					>
						<p className="mb-0">
							<Link
								href={`/search?filters=model_type:${d.modelType}`}
								className="p text-noDecoration"
							>
								<ModelTypeIcon modelType={d.modelType} size="2em" />
								<br />
								<span className="h3 mb-0">{d.count.toLocaleString()}</span>
								<br />
								<span className={"text-underline"}>
									{capitalizeFirstLetter(d.modelType)} models
								</span>
							</Link>
						</p>
					</div>
				))}
			</div>
		</Card>
	) : (
		<Loader />
	);
};

export default DataCountCard;
