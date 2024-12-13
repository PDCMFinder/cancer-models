import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { chartColors } from "../../utils/chartConfigs";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type BarChartProps = {
	title?: string;
	x: string[] | number[];
	y: string[] | number[];
};

const BarChart = ({ title, x, y }: BarChartProps) => {
	const plotlyContainerRef = useRef<HTMLDivElement | null>(null);
	const [plotWidth, setPlotWidth] = useState(300);
	const { windowWidth } = useWindowDimensions();

	useEffect(() => {
		setPlotWidth(plotlyContainerRef.current?.offsetWidth ?? 300);
	}, [plotlyContainerRef.current?.offsetWidth, windowWidth]);

	return (
		<>
			<div className="text-center h-100 w-100" ref={plotlyContainerRef}>
				{title && <h2 className="p">{title}</h2>}
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
						width: plotWidth
					}}
					config={{ displayModeBar: false, responsive: true }}
				/>
			</div>
		</>
	);
};

export default BarChart;
