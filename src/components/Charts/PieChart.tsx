import dynamic from "next/dynamic";
import { chartColors } from "../../utils/chartConfigs";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type PieChartProps = {
	title?: string;
	values: string[] | number[];
	labels: string[];
	hole?: number;
};

const PieChart = ({ title, values, labels, hole }: PieChartProps) => {
	return (
		<>
			<div className="text-center h-100">
				{title && <h2 className="h3">{title}</h2>}
				<Plot
					data={[
						{
							values: values,
							labels: labels,
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
						margin: { t: 0, b: 0, l: 0, r: 0 },

						height: 300,
						width: 300
					}}
					config={{ displayModeBar: false, responsive: true }}
				/>
			</div>
		</>
	);
};

export default PieChart;
