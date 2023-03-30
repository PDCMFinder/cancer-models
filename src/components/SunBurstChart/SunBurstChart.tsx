import { ResponsiveSunburst } from "@nivo/sunburst";

interface SunBurstChartProps {
	keyId: string;
	data: any;
}

const SunBurstChart: React.FC<SunBurstChartProps> = ({ keyId, data }) => {
	return (
		<ResponsiveSunburst
			data={data}
			margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
			id={keyId}
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
		/>
	);
};

export default SunBurstChart;
