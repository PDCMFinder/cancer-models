import dynamic from "next/dynamic";
import router from "next/router";
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { chartColors } from "../../utils/chartConfigs";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type PolarBarChartProps = {
	title?: string;
	dataEndPoint: string;
	provider?: string;
	onClick?: (label: string) => void;
	data: Record<string, number>;
};

const PolarBarChart = ({ title, data, dataEndPoint }: PolarBarChartProps) => {
	const plotlyContainerRef = useRef<HTMLDivElement | null>(null);
	const [plotWidth, setPlotWidth] = useState(300);
	const { windowWidth } = useWindowDimensions();

	useEffect(() => {
		setPlotWidth(plotlyContainerRef.current?.offsetWidth ?? 300);
	}, [plotlyContainerRef.current?.offsetWidth, windowWidth]);

	const sortedData = Object.keys(data)
		.sort()
		.reduce<Record<string, number>>((obj, key) => {
			obj[key] = data[key];

			return obj;
		}, {});

	return (
		<div className="text-center h-100 w-100" ref={plotlyContainerRef}>
			{title && <h2 className="p mt-0 mb-3">{title}</h2>}
			<Plot
				data={[
					{
						r: Object.values(sortedData),
						theta: Object.keys(sortedData),
						name: "",
						type: "barpolar",
						fill: "toself",
						marker: {
							color: chartColors
						},
						text: Object.keys(sortedData),
						hovertemplate: "%{text} %{r}"
					}
				]}
				layout={{
					polar: {
						radialaxis: {
							visible: false
						},
						angularaxis: {
							direction: "clockwise"
						}
					},
					margin: {
						t: 0,
						b: 0,
						l: 50,
						r: 50
					},
					showlegend: false,
					height: plotWidth,
					width: plotWidth
				}}
				config={{ displayModeBar: false, responsive: true }}
				onClick={(e) => {
					// @ts-ignore
					let searchQuery: string = `?filters=${dataEndPoint}:${e.points[0].theta}`;

					router.push({
						pathname: "/search",
						search: searchQuery
					});
				}}
			/>
		</div>
	);
};

export default PolarBarChart;
