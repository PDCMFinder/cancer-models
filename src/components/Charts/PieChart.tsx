import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { chartColors } from "../../utils/chartConfigs";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type PieChartProps = {
	title?: string;
	values: string[] | number[];
	labels: string[];
	holeRadius?: number;
};

const PieChart = ({ title, values, labels, holeRadius }: PieChartProps) => {
	const plotlyContainerRef = useRef<HTMLDivElement | null>(null);
	const [plotWidth, setPlotWidth] = useState(300);
	const { windowWidth } = useWindowDimensions();

	useEffect(() => {
		setPlotWidth(plotlyContainerRef.current?.offsetWidth ?? 300);
	}, [plotlyContainerRef.current?.offsetWidth, windowWidth]);

	return (
		<div className="text-center h-100 w-100" ref={plotlyContainerRef}>
			{title && <h2 className="h3">{title}</h2>}
			<Plot
				data={[
					{
						values: values,
						labels: labels,
						name: "",
						hoverinfo: "label+percent",
						textinfo: "none",
						hole: holeRadius ?? 0.5,
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
					width: plotWidth
				}}
				config={{ displayModeBar: false, responsive: true }}
			/>
		</div>
	);
};

export default PieChart;
