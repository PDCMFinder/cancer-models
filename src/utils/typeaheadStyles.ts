export default {
	control: (baseStyles: any) => ({
		...baseStyles,
		borderColor: "#47938a",
		borderRadius: 0,
		fontSize: "100%",
		transition: "0.3s",
		"&:hover": {
			borderColor: "#47938a",
			background: "#d4f0fb",
			color: "#fff",
			cursor: "pointer",
		},
	}),
	input: (baseStyles: any) => ({
		...baseStyles,
		marginTop: 0,
		marginBottom: 0,
	}),
	multiValueLabel: (baseStyles: any) => ({
		...baseStyles,
		backgroundColor: "#003e48",
		color: "#fff",
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
	}),
	multiValueRemove: (baseStyles: any) => ({
		...baseStyles,
		backgroundColor: "#47938a",
		color: "#fff",
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,
		"&:hover": {
			borderColor: "#003e48",
			background: "#47938a",
			color: "#fff",
			cursor: "pointer",
		},
	}),
	valueContainer: (baseStyles: any) => ({
		...baseStyles,
		lineHeight: 1,
		padding: "0.7rem 0.8rem",
	}),
	indicatorSeparator: (baseStyles: any) => ({
		...baseStyles,
		backgroundColor: "#fff",
		display: "none",
	}),
	indicatorsContainer: (baseStyles: any) => ({
		...baseStyles,
		backgroundColor: "transparent",
		color: "#fff",
		padding: 0,
		"&:hover": {
			color: "#fff",
		},
	}),
	dropdownIndicator: (baseStyles: any) => ({
		...baseStyles,
		backgroundColor: "#e9b114",
		color: "#000",
		padding: "1.1rem",
		height: "100%",
		alignItems: "center",
		"&:hover": {
			color: "#000",
		},
	}),
	clearIndicator: (baseStyles: any) => ({
		...baseStyles,
		backgroundColor: "#ffe6a6",
		color: "#000",
		padding: 0,
		height: "100%",
		alignItems: "center",
		"&:hover": {
			color: "#000",
		},
	}),
	option: (baseStyles: any) => ({
		...baseStyles,
		lineHeight: 1,
	}),
};
