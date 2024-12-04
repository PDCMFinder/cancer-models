import dynamic from "next/dynamic";
import { chartColors } from "../../utils/chartConfigs";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type PieChartProps = {
	values: string[] | number[];
	labels: string[];
	hole?: number;
};

const PieChart = ({ values, labels, hole }: PieChartProps) => {
	return (
		<>
			<div className="text-center">
				<h2 className="h3">Models by</h2>
				<Plot
					data={[
						{
							values,
							labels,
							name: "",
							hoverinfo: "label+percent",
							textinfo: "none",
							hole: hole ?? 0.5,
							type: "pie",
							automargin: true,
							marker: {
								colors: chartColors
							}
						}
					]}
					layout={{
						annotations: [
							{
								showarrow: false,
								text: ""
							}
						],
						showlegend: false,
						margin: { t: 0, b: 0, l: 0, r: 0 }
					}}
					config={{ displayModeBar: false, responsive: true }}
				/>
			</div>
		</>
	);
};

export default PieChart;
