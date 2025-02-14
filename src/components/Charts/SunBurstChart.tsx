import dynamic from "next/dynamic";
import router from "next/router";
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { getCustomColors } from "../../utils/chartConfigs";
import { ageCategories } from "../../utils/collapseEthnicity";
import { capitalizeFirstLetter } from "../../utils/dataUtils";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export const transformSunBurstData = (data: Record<string, number>) => {
	const labels: string[] = [];
	const values: number[] = [];
	const parents: string[] = [];
	let parentTotalCount = 0,
		tempChildValues: number[] = [];

	Object.entries(ageCategories).forEach(([category, categoryValues]) => {
		// assuming all of this categories are included in our models (if not, why is it even in the dictionary?)
		labels.push(capitalizeFirstLetter(category.toLowerCase()));
		parents.push("");
		parentTotalCount = 0;
		tempChildValues = [];

		Object.entries(data).forEach(([age, count]) => {
			if (categoryValues.includes(age)) {
				labels.push(age);
				tempChildValues.push(count);
				parents.push(capitalizeFirstLetter(category.toLowerCase()));
				parentTotalCount += count;
			}
		});

		values.push(parentTotalCount);
		values.push(...tempChildValues);
	});

	return { labels, values, parents };
};

type SunBurstChartProps = {
	title?: string;
	values: number[];
	labels: string[];
	parents: string[];
	dataEndPoint: string;
	provider?: string;
	onClick?: (label: string) => void;
	colors?: Record<string, string>;
};

const SunBurstChart = ({
	title,
	values,
	labels,
	parents,
	dataEndPoint,
	provider,
	colors
}: SunBurstChartProps) => {
	const plotlyContainerRef = useRef<HTMLDivElement | null>(null);
	const [plotWidth, setPlotWidth] = useState(300);
	const { windowWidth } = useWindowDimensions();
	const customColors = getCustomColors(labels, colors);

	useEffect(() => {
		setPlotWidth(plotlyContainerRef.current?.offsetWidth ?? 300);
	}, [plotlyContainerRef.current?.offsetWidth, windowWidth]);

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
					font: {
						size: 12
					},
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
