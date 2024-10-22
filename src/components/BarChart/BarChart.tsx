import { ResponsiveBar } from "@nivo/bar";

type BarChartProps = {
	indexKey: string;
	chartTitle: string;
	data: any;
	rotateTicks?: boolean;
	onBarClick: (node: any, filterId: string, onClickFilters?: boolean) => void;
};

const BarChart = (props: BarChartProps) => {
	return (
		<ResponsiveBar
			data={props.data}
			keys={["count"]}
			indexBy={props.indexKey}
			margin={{
				top: 0,
				right: 60,
				bottom: 150,
				left: 60
			}}
			padding={0.3}
			valueScale={{ type: "linear" }}
			indexScale={{ type: "band", round: true }}
			colors={["#48938A"]}
			layout="vertical"
			borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
			axisTop={null}
			axisRight={null}
			axisBottom={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: props.rotateTicks ? 25 : 0
			}}
			axisLeft={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0
			}}
			labelSkipWidth={12}
			labelSkipHeight={12}
			colorBy="id"
			labelTextColor={"#fff"}
			role="application"
			ariaLabel={props.chartTitle}
			onClick={(node: any) => {
				if (node.data.onClickFilters?.length > 0) {
					props.onBarClick(node, props.indexKey, true);
				} else {
					props.onBarClick(node, props.indexKey);
				}
			}}
		/>
	);
};

export default BarChart;
