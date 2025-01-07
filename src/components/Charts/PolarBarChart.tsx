import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type PolarBarChartProps = {
	title?: string;
	dataEndPoint: string;
	provider?: string;
	onClick?: (label: string) => void;
	data: Record<string, number>;
};

const PolarBarChart = ({ title, data }: PolarBarChartProps) => {
	const plotlyContainerRef = useRef<HTMLDivElement | null>(null);
	const [plotWidth, setPlotWidth] = useState(300);
	const { windowWidth } = useWindowDimensions();

	useEffect(() => {
		setPlotWidth(plotlyContainerRef.current?.offsetWidth ?? 300);
	}, [plotlyContainerRef.current?.offsetWidth, windowWidth]);

	return (
		<div className="text-center h-100 w-100" ref={plotlyContainerRef}>
			{title && <h2 className="p mt-0 mb-3">{title}</h2>}
			<Plot
				data={[
					{
						r: Object.values(data),
						theta: Object.keys(data),
						name: "",
						type: "scatterpolar",
						mode: "lines+markers",
						fill: "toself"
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
			/>
		</div>
	);
};

export default PolarBarChart;
