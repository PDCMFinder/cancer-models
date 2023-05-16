import { ResponsiveSunburst } from "@nivo/sunburst";

interface SunBurstChartProps {
	keyId: string;
	data: any;
	onSliceClick: (node: any, filterId: string) => void;
}

const SunBurstChart = (props: SunBurstChartProps) => {
	return (
		<ResponsiveSunburst
			data={props.data}
			margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
			id={props.keyId}
			value="count"
			cornerRadius={2}
			//borderColor={{ theme: "background" }}
			colors={{ scheme: "set3" }}
			childColor={{
				from: "color",
				modifiers: [["brighter", 0.05]],
			}}
			enableArcLabels={true}
			arcLabelsSkipAngle={10}
			arcLabelsTextColor={{
				from: "color",
				modifiers: [["darker", 2.0]],
			}}
			onClick={(node) => props.onSliceClick(node, props.keyId)}
		/>
	);
};

export default SunBurstChart;
