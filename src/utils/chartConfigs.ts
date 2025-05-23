export const chartColors = [
	"#003e48",
	"#005363",
	"#47938a",
	"#c0ede6",
	"rgb(36, 55, 57)",
	"rgb(6, 4, 4)",
	"rgb(56, 75, 126)",
	"rgb(18, 36, 37)",
	"rgb(34, 53, 101)",
	"#e9b114",
	"#ffd86b",
	"#ffe6a6",
	"#6e550c"
];

export const getCustomColors = (
	labels: string[],
	colors?: Record<string, string>
) => {
	return [
		...(colors ? labels.map((label) => colors[label.toLowerCase()]) : []),
		...chartColors
	];
};
