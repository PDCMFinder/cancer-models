import dynamic from "next/dynamic";
import router from "next/router";
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { chartColors } from "../../utils/chartConfigs";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type PieChartProps = {
	title?: string;
	values: string[] | number[];
	labels: string[];
	dataEndPoint: string;
	holeRadius?: number;
	onClick?: (label: string) => void;
};

const PieChart = ({
	title,
	values,
	labels,
	dataEndPoint,
	holeRadius
}: PieChartProps) => {
	const plotlyContainerRef = useRef<HTMLDivElement | null>(null);
	const [plotWidth, setPlotWidth] = useState(300);
	const { windowWidth } = useWindowDimensions();

	useEffect(() => {
		setPlotWidth(plotlyContainerRef.current?.offsetWidth ?? 300);
	}, [plotlyContainerRef.current?.offsetWidth, windowWidth]);

	return (
		<div className="text-center h-100 w-100" ref={plotlyContainerRef}>
			{title && <h2 className="p">{title}</h2>}
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
					height: plotWidth,
					width: plotWidth
				}}
				config={{ displayModeBar: false, responsive: true }}
				onClick={(e) =>
					router.push({
						pathname: "/search",
						// @ts-ignore
						search: `?filters=${dataEndPoint}:${e.points[0].label}`
					})
				}
			/>
		</div>
	);
};

export default PieChart;
