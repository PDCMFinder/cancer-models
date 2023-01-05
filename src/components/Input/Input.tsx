import { IInputProps } from "../../../globalTypes";

const Input = (props: IInputProps) => {
	let name = props.name,
		commonInputArgs = {
			name: props.name,
			id: name,
			placeholder: props.placeholder,
			className: props.className,
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
