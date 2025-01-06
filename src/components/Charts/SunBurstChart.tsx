import dynamic from "next/dynamic";
import router from "next/router";
import { useEffect, useRef, useState } from "react";
import { ProviderDataCounts } from "../../apis/AggregatedData.api";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { chartColors } from "../../utils/chartConfigs";
import { capitalizeFirstLetter } from "../../utils/dataUtils";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type SunBurstChartProps = {
	title?: string;
	data: ProviderDataCounts["patient_age"];
	dataEndPoint: string;
	provider?: string;
	onClick?: (label: string) => void;
};

const transformData = (data: ProviderDataCounts["patient_age"]) => {
	const labels: string[] = [];
	const values: number[] = [];
	const parents: string[] = [];

	Object.entries(data).forEach(([parent, [children, parentValue]]) => {
		if (parentValue) {
			labels.push(capitalizeFirstLetter(parent));
			values.push(parentValue);
			parents.push("");

			Object.entries(children).forEach(([child, value]) => {
				labels.push(capitalizeFirstLetter(child));
				values.push(value);
				parents.push(capitalizeFirstLetter(parent));
			});
		}
	});

	return { labels, values, parents };
};

const SunBurstChart = ({
	title,
	data,
	dataEndPoint,
	provider
}: SunBurstChartProps) => {
	const plotlyContainerRef = useRef<HTMLDivElement | null>(null);
	const [plotWidth, setPlotWidth] = useState(300);
	const { windowWidth } = useWindowDimensions();

	useEffect(() => {
		setPlotWidth(plotlyContainerRef.current?.offsetWidth ?? 300);
	}, [plotlyContainerRef.current?.offsetWidth, windowWidth]);

	const { labels, values, parents } = transformData(data);

	return (
		<div className="text-center h-100 w-100" ref={plotlyContainerRef}>
			{title && <h2 className="p mt-0 mb-3">{title}</h2>}
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
				onClick={(e) => {
					// @ts-ignore
					let searchQuery: string = `?filters=${dataEndPoint}:${e.points[0].label}`;
					// @ts-ignore
					if (!parents.includes(e.points[0].label)) {
						if (provider) {
							searchQuery += `+AND+data_source:${provider}`;
						}

						router.push({
							pathname: "/search",
							search: searchQuery
						});
					}
				}}
			/>
		</div>
	);
};

export default SunBurstChart;
