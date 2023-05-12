import { ResponsiveBar } from "@nivo/bar";

interface BarChartProps {
	indexKey: string;
	chartTitle: string;
	data: any;
	rotateTicks?: boolean;
	onClick: (node: any, filterId: string) => void;
}

const BarChart = ({
	data,
	indexKey,
	chartTitle,
	rotateTicks,
	onClick,
}: BarChartProps) => {
	return (
		<ResponsiveBar
			data={data}
			keys={["count"]}
			indexBy={indexKey}
			margin={{
				top: 0,
				right: 60,
				bottom: 150,
				left: 60,
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
				tickRotation: rotateTicks ? 25 : 0,
			}}
			axisLeft={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
			}}
			labelSkipWidth={12}
			labelSkipHeight={12}
			colorBy="id"
			labelTextColor={"#fff"}
			role="application"
			ariaLabel={chartTitle}
			onClick={(node: any) => {
				onClick(node, indexKey);
			}}
			barAriaLabel={function (e) {
				return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
			}}
		/>
	);
};

export default BarChart;
