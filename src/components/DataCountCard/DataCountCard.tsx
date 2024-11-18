import Link from "next/link";
import { useQuery } from "react-query";
import { CSSSize } from "../../../types/globalTypes";
import { getModelsByType } from "../../apis/AggregatedData.api";
import { capitalizeFirstLetter } from "../../utils/dataUtils";
import Card from "../Card/Card";
import ModelTypeIcon from "../Icons/ModelTypeIcon";
import Loader from "../Loader/Loader";

type DataCountCardProps = {
	layout: "vertical" | "horizontal";
	iconSize?: CSSSize;
};

const DataCountCard = (props: DataCountCardProps) => {
	const isVertical = props.layout === "vertical";
	const { data } = useQuery("modelsByTypeCounts", () => getModelsByType());

	return data ? (
		<Card className="bg-primary-quaternary h-100" contentClassName="py-2 h-100">
			<div
				className={`row h-100 text-center justify-content-center row-cols-1 ${
					isVertical ? "" : "row-cols-lg-3"
				}`}
			>
				{data.map((d) => (
					<div
						className={`my-3 col ${isVertical ? "" : "my-lg-0"}`}
						key={d.modelType}
					>
						<Link
							href={`/search?filters=model_type:${d.modelType}`}
							className="p text-noDecoration"
						>
							<div className="d-flex align-center">
								<ModelTypeIcon
									modelType={d.modelType}
									size={props.iconSize ?? "1em"}
									className="mr-3"
								/>
								<p className="mb-0 lh-1">
									<span
										className="text-family-primary mb-1 d-block"
										style={{ fontSize: "3.4rem" }}
									>
										{d.count.toLocaleString()}
									</span>
									<span className={"text-underline"}>
										{capitalizeFirstLetter(d.modelType)}s
									</span>
								</p>
							</div>
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
