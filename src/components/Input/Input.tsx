import { IInputProps } from "../../../globalTypes";

const Input = (props: IInputProps) => {
	let name = props.name,
		commonInputArgs = {
			name: props.name,
			id: name,
			placeholder: props.placeholder,
			className: props.className,
			value: props.value,
			onChange: props.onChange,
			ref: props.inputRef && props.inputRef,
			required: props.required,
		},
		InputElement =
			props.type === "textarea" ? (
				<textarea {...commonInputArgs} />
			) : (
				<input type={props.type} {...commonInputArgs} />
			);

	return InputElement;
};

export default Input;
