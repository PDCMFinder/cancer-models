import { LabelProps } from "../../../types/globalTypes";

const Label = (props: LabelProps) => {
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
