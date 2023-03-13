import { IInputProps } from "../../../globalTypes";

const Input = (props: IInputProps) => {
	let commonInputArgs = {
			name: props.name,
			id: props.id ?? props.name,
			placeholder: props.placeholder,
			className: props.className,
			value: props.value,
			onChange: props.onChange,
			checked: props.checked,
			defaultChecked: props.defaultChecked,
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
