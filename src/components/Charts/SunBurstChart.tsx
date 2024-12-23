import dynamic from "next/dynamic";
import router from "next/router";
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { chartColors } from "../../utils/chartConfigs";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type SunBurstChartProps = {
	title?: string;
	data: Record<string, [Record<string, number>, number]>;
	dataEndPoint: string;
	onClick?: (label: string) => void;
};

const SunBurstChart = ({ title, data, dataEndPoint }: SunBurstChartProps) => {
	const plotlyContainerRef = useRef<HTMLDivElement | null>(null);
	const [plotWidth, setPlotWidth] = useState(300);
	const { windowWidth } = useWindowDimensions();

	useEffect(() => {
		setPlotWidth(plotlyContainerRef.current?.offsetWidth ?? 300);
	}, [plotlyContainerRef.current?.offsetWidth, windowWidth]);

	const transformData = () => {
		const labels: string[] = [];
		const values: number[] = [];
		const parents: string[] = [];

		Object.entries(data).forEach(([parent, [children, parentValue]]) => {
			labels.push(parent);
			values.push(parentValue);
			parents.push("");

			Object.entries(children).forEach(([child, value]) => {
				labels.push(child);
				values.push(value);
				parents.push(parent);
			});
		});

		return { labels, values, parents };
	};

	const { labels, values, parents } = transformData();

	return (
		<div className="text-center h-100 w-100" ref={plotlyContainerRef}>
			{title && <h2 className="p">{title}</h2>}
			<Plot
				data={[
					{
						values,
						labels,
						parents,
						branchvalues: "total",
						name: "",
						textinfo: "none",
						type: "sunburst",
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

export default SunBurstChart;
