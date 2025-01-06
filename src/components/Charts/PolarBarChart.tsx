import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ProviderDataCounts } from "../../apis/AggregatedData.api";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { capitalizeFirstLetter } from "../../utils/dataUtils";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type PolarBarChartProps = {
	title?: string;
	// data: ProviderDataCounts["patient_age"];
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

const PolarBarChart = ({
	title,
	// data,
	dataEndPoint,
	provider
}: PolarBarChartProps) => {
	const plotlyContainerRef = useRef<HTMLDivElement | null>(null);
	const [plotWidth, setPlotWidth] = useState(300);
	const { windowWidth } = useWindowDimensions();

	useEffect(() => {
		setPlotWidth(plotlyContainerRef.current?.offsetWidth ?? 300);
	}, [plotlyContainerRef.current?.offsetWidth, windowWidth]);

	// const { labels, values, parents } = transformData(data);

	return (
		<div className="text-center h-100 w-100" ref={plotlyContainerRef}>
			{title && <h2 className="p mt-0 mb-3">{title}</h2>}
			<Plot
				data={[
					{
						r: [5, 4, 2, 4, 5],
						theta: ["melanoma", "other", "cancer", "d", "a"],
						name: "",
						type: "scatterpolar",
						automargin: true,
						fill: "toself"
					}
				]}
				layout={{
					polar: {
						domain: {
							x: [0, 0.46],
							y: [0.56, 1]
						},
						radialaxis: {
							angle: 45
						}
					}
				}}
				config={{ displayModeBar: false, responsive: true }}
				// onClick={(e) => {
				// 	// @ts-ignore
				// 	let searchQuery: string = `?filters=${dataEndPoint}:${e.points[0].label}`;
				// 	// @ts-ignore
				// 	if (!parents.includes(e.points[0].label)) {
				// 		if (provider) {
				// 			searchQuery += `+AND+data_source:${provider}`;
				// 		}

				// 		router.push({
				// 			pathname: "/search",
				// 			search: searchQuery
				// 		});
				// 	}
				// }}
			/>
		</div>
	);
};

export default PolarBarChart;
