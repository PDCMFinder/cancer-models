import dynamic from "next/dynamic";
import { Data } from "plotly.js";
import { chartColors } from "../../utils/chartConfigs";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const data = [
	{
		// hoverinfo: "none",
		// text: yValue.map(String),
		// y: yValue,
		y: [20, 14, 23, 20, 14, 23, 20, 14, 23, 20, 14, 23],
		x: [
			"giraffes",
			"orangutans",
			"monkeys",
			"girafdfes",
			"orangsutans",
			"monkaeys",
			"girafdfdes",
			"orangsuatans",
			"monkaseys"
		],
		type: "bar",
		hoverinfo: "label",
		marker: {
			color: chartColors[2]
		}
	}
];

const BarChart = () => {
	return (
		<>
			<div className="text-center">
				<h2 className="h3">Models by</h2>
				<Plot
					data={data as Data[]}
					layout={{}}
					config={{ displayModeBar: false }}
				/>
			</div>
		</>
	);
};

export default BarChart;
