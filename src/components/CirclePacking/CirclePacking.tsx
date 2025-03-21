import { ResponsiveCirclePacking } from "@nivo/circle-packing";
import styles from "./CirclePacking.module.scss";

type CirclePackingProps = {
	data: any;
	onCircleClick: (circleId: string, circleDepth: number) => void;
};

const CirclePacking = ({ data, onCircleClick }: CirclePackingProps) => {
	return (
		<ResponsiveCirclePacking
			data={data}
			margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
			id="search_terms"
			value="count"
			colors={[
				styles["color-graph"],
				styles["color-graph2"],
				styles["color-graph3"],
				styles["color-graph4"]
			].reverse()}
			//colors={{ scheme: "blue_green" }}
			//inheritColorFromParent={true}
			childColor={{ from: "color", modifiers: [["darker", 0.2]] }}
			padding={5}
			enableLabels={true}
			labelsFilter={function (e) {
				return 1 === e.node.depth;
			}}
			theme={{
				labels: {
					text: {
						fontSize: "18px",
						fontWeight: "medium",
						letterSpacing: "1px",
						stroke: "#000",
						strokeWidth: "2px",
						paintOrder: "stroke",
						fontFamily: "var(--type-secondary)"
					}
				}
			}}
			labelsSkipRadius={10}
			labelTextColor={{ from: "color", modifiers: [["brighter", 100]] }}
			animate={false}
			motionConfig="slow"
			onClick={(node) => {
				onCircleClick(node.id, node.depth);
			}}
			//borderWidth={1}
			borderColor={{ from: "color", modifiers: [["brighter", 0.5]] }}
		/>
	);
};

export default CirclePacking;
