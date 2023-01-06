import Input from "./Input";
import Label from "./Label";
import { IInputProps, ILabelProps } from "../../../globalTypes";

interface IInputAndLabel extends IInputProps, ILabelProps {
	className?: string;
	labelClassName?: string;
	inputClassName?: string;
	value?: string;
	onChange?: IInputProps["onChange"];
}

const InputAndLabel = (props: IInputAndLabel) => {
	let name = props.name;

	return (
		<div className={props.className}>
			<Label name={name} label={props.label} className={props.labelClassName} />
			<Input
				name={name}
				type={props.type}
				placeholder={props.placeholder}
				className={props.inputClassName}
				onChange={props.onChange}
				value={props.value}
			/>
		</div>
	);
};

export default InputAndLabel;
