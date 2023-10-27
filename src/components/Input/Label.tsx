import React from "react";
import { ILabelProps } from "../../../types/globalTypes";

const Label = (props: ILabelProps) => {
	return (
		<label
			style={props.style}
			htmlFor={props.forId}
			className={props.className}
		>
			{props.label}
		</label>
	);
};

export default Label;
