import dynamic from "next/dynamic";
import { PlotData } from "plotly.js";
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { chartColors } from "../../utils/chartConfigs";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface RadialChartProps {
	title?: string;
	data: Record<string, number>;
}

const RadialChart = ({ title, data }: RadialChartProps) => {
	const plotlyContainerRef = useRef<HTMLDivElement | null>(null);
	const [plotWidth, setPlotWidth] = useState(300);
	const { windowWidth } = useWindowDimensions();

	useEffect(() => {
		setPlotWidth(plotlyContainerRef.current?.offsetWidth ?? 300);
	}, [plotlyContainerRef.current?.offsetWidth, windowWidth]);

	let traces: Partial<PlotData>[] = [];
	let radius = 500;

	const totalModels =
		Object.values(data).reduce((sum, count) => sum + count, 0) / 3;

	Object.entries(data).forEach(([dataName, count], index) => {
		if (!isNaN(count)) {
			const theta = Array.from(
				{ length: count },
				(_, index) => 360 * (count / totalModels) * (index / count)
			);

			traces.push({
				type: "scatterpolar",
				r: Array.from({ length: count }, (_, index) => radius + index * 0.01),
				theta: theta,
				mode: "lines",
				name: dataName,
				line: { width: 4, color: chartColors[index] },
				hovertemplate: `${count.toLocaleString()}`
			});

			radius += 225;
		}
	});

	return (
		<div className="text-center h-100 w-100" ref={plotlyContainerRef}>
			{title && <h2 className="p mt-0 mb-3">{title}</h2>}
			<Plot
				data={traces}
				layout={{
					polar: {
						radialaxis: {
							range: [0, data.length * 260],
							showticklabels: false,
							showgrid: false,
							visible: false
						},
						angularaxis: {
							showticklabels: false,
							direction: "clockwise",
							showline: false
						}
					},
					showlegend: true,
					legend: {
						x: 1,
						y: 1,
						font: {
							family: "sans-serif",
							size: 10,
							color: chartColors[0]
						},
						bgcolor: "transparent",
						bordercolor: "transparent",
						borderwidth: 2,
						orientation: "h"
					},
					margin: { t: 0, r: 0, b: 0, l: 0 },
					height: plotWidth,
					width: plotWidth
				}}
				config={{ displayModeBar: false, responsive: true }}
			/>
		</div>
	);
};

export default RadialChart;
