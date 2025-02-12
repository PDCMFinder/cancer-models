import dynamic from "next/dynamic";
import router from "next/router";
import { PlotData } from "plotly.js";
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { getCustomColors } from "../../utils/chartConfigs";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface RadialChartProps {
	title?: string;
	data: Record<string, number>;
	dataEndPoint: string;
	colors: Record<string, string>;
	totalModelCount: number;
}

const RadialChart = ({
	title,
	data,
	dataEndPoint,
	colors,
	totalModelCount
}: RadialChartProps) => {
	const plotlyContainerRef = useRef<HTMLDivElement | null>(null);
	const [plotWidth, setPlotWidth] = useState(300);
	const { windowWidth } = useWindowDimensions();
	const customColors = getCustomColors(Object.keys(data), colors);

	useEffect(() => {
		setPlotWidth(plotlyContainerRef.current?.offsetWidth ?? 300);
	}, [plotlyContainerRef.current?.offsetWidth, windowWidth]);

	let traces: Partial<PlotData>[] = [];
	let radius = 500;

	Object.entries(data).forEach(([dataName, count], index) => {
		if (!isNaN(count)) {
			const percentage = count / totalModelCount;

			const thetaStart = 0;
			const thetaEnd = percentage * 360;
			const numPoints = 50; // More points for smoother arc

			const theta = Array.from(
				{ length: numPoints },
				(_, i) => thetaStart + (thetaEnd - thetaStart) * (i / (numPoints - 1))
			);

			traces.push({
				type: "scatterpolar",
				r: Array.from(
					{ length: numPoints },
					(_, index) => radius + index * 0.01
				),
				theta: theta,
				mode: "lines",
				name: dataName,
				line: { width: 4, color: customColors[index] },
				hovertemplate: `${count.toLocaleString()} (${Math.round(
					percentage * 100
				)}%)`
			});

			radius += 225;
		}
	});

	return (
		<div className="text-center h-100 w-100" ref={plotlyContainerRef}>
			{title && <h2 className="p mt-0 mb-3">{title}</h2>}
			{traces.length > 0 ? (
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
						showlegend: false,
						legend: {
							x: 1,
							y: 1,
							font: {
								family: "sans-serif",
								size: 10,
								color: customColors
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
					onClick={(e) => {
						let searchQuery: string = `?filters=${dataEndPoint}:${e.points[0].data.name}`;

						router.push({
							pathname: "/search",
							search: searchQuery
						});
					}}
				/>
			) : (
				<div
					className="text-center w-100 ar-1 d-flex align-center justify-content-center"
					style={{
						backgroundImage: "url(/img/no-datasets.png)",
						backgroundSize: "contain",
						backgroundPosition: "top center",
						backgroundRepeat: "no-repeat"
					}}
				>
					<h3 className="h4 m-0">No datasets for these models</h3>
				</div>
			)}
		</div>
	);
};

export default RadialChart;
