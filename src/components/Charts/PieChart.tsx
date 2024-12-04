import dynamic from "next/dynamic";
import router from "next/router";
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import breakPoints from "../../utils/breakpoints";
import { getCustomColors } from "../../utils/chartConfigs";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type PieChartProps = {
	title?: string;
	data: Record<string, number>;
	dataEndPoint: string;
	holeRadius?: number;
	provider?: string;
	onClick?: (label: string) => void;
	colors?: Record<string, string>;
};

const PieChart = ({
	title,
	data,
	dataEndPoint,
	holeRadius,
	provider,
	colors
}: PieChartProps) => {
	const plotlyContainerRef = useRef<HTMLDivElement | null>(null);
	const [plotWidth, setPlotWidth] = useState(300);
	const { windowWidth } = useWindowDimensions();
	const customColors = getCustomColors(Object.keys(data), colors);
	const bpLarge = breakPoints.large;

	useEffect(() => {
		setPlotWidth(plotlyContainerRef.current?.offsetWidth ?? 300);
	}, [plotlyContainerRef.current?.offsetWidth, windowWidth]);

	return (
		<div className="text-center h-100 w-100" ref={plotlyContainerRef}>
			{title && <h2 className="p mt-0 mb-3">{title}</h2>}
			<Plot
				className="cursor-pointer"
				data={[
					{
						values: Object.values(data),
						labels: Object.keys(data),
						name: "",
						hoverinfo: "label+percent",
						textinfo: "none",
						textposition: "inside",
						hole: holeRadius ?? 0.5,
						type: "pie",
						automargin: true,
						marker: {
							colors: customColors
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
					legend: {
						orientation: "h",
						y: -0,
						x: 0.5,
						xanchor: "center"
					},
					showlegend: windowWidth && windowWidth < bpLarge ? true : false,
					margin: { t: 0, b: 0, l: 0, r: 0 },
					height: plotWidth,
					width: plotWidth
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
	);
};

export default PieChart;
