import dynamic from "next/dynamic";
import router from "next/router";
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { chartColors } from "../../utils/chartConfigs";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type BarChartProps = {
	title?: string;
	x: string[] | number[];
	y: string[] | number[];
	dataEndPoint: string;
	provider?: string;
};

const BarChart = ({ title, x, y, dataEndPoint, provider }: BarChartProps) => {
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
						margin: { l: 30, r: 0, t: 0, b: 120 },
						xaxis: {
							tickangle: -30
						},
						width: plotWidth,
						height: plotWidth / 2.3
					}}
					config={{ displayModeBar: false, responsive: true }}
					onClick={(e) => {
						// @ts-ignore
						let searchQuery: string = `?filters=${dataEndPoint}:${e.points[0].label}`;

						if (provider) {
							searchQuery += `+AND+data_source:${provider}`;
						}

						router.push({
							pathname: "/search",
							search: searchQuery
						});
					}}
				/>
			</div>
		</>
	);
};

export default BarChart;
