import { ChangeEvent } from "react";
import { InputProps } from "../../../types/globalTypes";

const Input = (props: InputProps) => {
	let commonInputArgs = {
			name: props.name,
			id: props.id ?? props.name,
			placeholder: props.placeholder,
			className: props.className,
			value: props.value,
			onChange: (
				e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
			): void => {
				props.onChange && props.onChange(e);
			},
			ref: props.inputRef && props.inputRef,
			required: props.required,
			checked: props.checked,
			defaultChecked: props.defaultChecked
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
