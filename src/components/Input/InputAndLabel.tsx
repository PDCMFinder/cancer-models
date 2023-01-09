import Input from "./Input";
import Label from "./Label";
import { IInputProps, ILabelProps } from "../../../globalTypes";
import styles from "./InputAndLayout.module.scss";

interface IInputAndLabel extends IInputProps, ILabelProps {
	className?: string;
	labelClassName?: string;
	inputClassName?: string;
	value?: string;
	onChange?: IInputProps["onChange"];
}

const InputAndLabel = (props: IInputAndLabel) => {
	let name = props.name,
		type = props.type,
		alternateLayout =
			type === "radio" || type === "checkbox" ? "InputAndLabel-alt" : "",
		className = props.className ? props.className : "";

	return (
		<div className={`${styles[alternateLayout]} ${className}`.trim()}>
			<Label name={name} label={props.label} className={props.labelClassName} />
			<Input
				name={name}
				type={type}
				placeholder={props.placeholder}
				className={props.inputClassName}
				onChange={props.onChange}
				value={props.value}
			/>
		</div>
	);
};

export default InputAndLabel;
