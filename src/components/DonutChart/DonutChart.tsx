import { ResponsivePie } from "@nivo/pie";

interface DonutChartProps {
	keyId: string;
	data: any;
}

const DonutChart: React.FC<DonutChartProps> = ({ keyId, data }) => {
	return (
		<ResponsivePie
			data={data}
			id={keyId}
			value="count"
			arcLinkLabel={(d: any) => d.id}
			margin={{ top: 80, right: 80, bottom: 80, left: 80 }}
			innerRadius={0.5}
			padAngle={0.7}
			cornerRadius={3}
			activeOuterRadiusOffset={8}
			borderWidth={1}
			colors={{ scheme: "purple_blue_green" }}
			borderColor={{
				from: "color",
				modifiers: [["darker", 0.2]],
			}}
			arcLinkLabelsSkipAngle={10}
			arcLinkLabelsTextColor="#333333"
			arcLinkLabelsThickness={2}
			arcLinkLabelsColor={{ from: "color", modifiers: [["darker", 0.2]] }}
			arcLabelsSkipAngle={10}
			arcLabelsTextColor={{
				from: "color",
				modifiers: [["darker", 2]],
			}}
		/>
	);
};

export default DonutChart;
