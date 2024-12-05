import dynamic from "next/dynamic";
import { chartColors } from "../../utils/chartConfigs";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type BarChartProps = {
	title?: string;
	x: string[];
	y: string[] | number[];
};

const BarChart = ({ title, x, y }: BarChartProps) => {
	return (
		<>
			<div className="text-center h-100 w-100">
				{title && <h2 className="h3">{title}</h2>}
				<Plot
					data={[
						{
							y,
							x,
							type: "bar",
							hoverinfo: "x+y",
							marker: {
								color: chartColors[2]
							},
							automargin: true
						}
					]}
					layout={{
						height: 400,
						width: 500
					}}
					config={{ displayModeBar: false, responsive: true }}
				/>
			</div>
		</>
	);
};

export default BarChart;
