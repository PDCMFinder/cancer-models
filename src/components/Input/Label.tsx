import React from "react";
import { ILabelProps } from "../../../globalTypes";

const Label = (props: ILabelProps) => {
	return (
		<label style={props.style} htmlFor={props.name} className={props.className}>
			{props.label}
		</label>
	);
};

export default Label;
