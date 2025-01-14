import dynamic from "next/dynamic";
import router from "next/router";
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import breakPoints from "../../utils/breakpoints";
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
	const [plotHeight, setPlotHeight] = useState(300);
	const { windowWidth } = useWindowDimensions();
	const bpLarge = breakPoints.large;

	useEffect(() => {
		setPlotWidth(plotlyContainerRef.current?.offsetWidth ?? 300);

		if (windowWidth && windowWidth < bpLarge) {
			setPlotHeight(plotlyContainerRef.current?.offsetWidth ?? 300);
		} else {
			setPlotHeight((plotlyContainerRef.current?.offsetWidth ?? 300) / 2.3);
		}
	}, [plotlyContainerRef.current?.offsetWidth, windowWidth]);

	return (
		<>
			<div className="text-center h-100 w-100" ref={plotlyContainerRef}>
				{title && <h2 className="p mt-0 mb-3">{title}</h2>}
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
							automargin: true,
							text: y.map(String),
							textinfo: "label",
							textposition: "auto"
						}
					]}
					layout={{
						margin: { l: 50, r: 0, t: 0, b: 120 },
						xaxis: {
							tickangle: -30
						},
						width: plotWidth,
						height: plotHeight,
						font: {
							size: 12
						}
					}}
					config={{ displayModeBar: false, responsive: true }}
					onClick={(e) => {
						// @ts-ignore
						const searchQuery: string = `?filters=${dataEndPoint}:${e.points[0].label}`;

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
