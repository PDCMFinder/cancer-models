import dynamic from "next/dynamic";
import { useRef } from "react";
import { chartColors } from "../../utils/chartConfigs";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type BarChartProps = {
	title?: string;
	x: string[];
	y: string[] | number[];
};

const BarChart = ({ title, x, y }: BarChartProps) => {
	const plotlyContainerRef = useRef<HTMLDivElement | null>(null);

	return (
		<>
			<div className="text-center h-100 w-100" ref={plotlyContainerRef}>
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
						margin: { l: 30, r: 0 },
						xaxis: {
							tickangle: 90
						},
						height: 400,
						width: plotlyContainerRef?.current?.clientWidth
					}}
					config={{ displayModeBar: false, responsive: true }}
				/>
			</div>
		</>
	);
};

export default BarChart;
