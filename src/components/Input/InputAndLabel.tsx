import Input from "./Input";
import Label from "./Label";
import { IInputProps, ILabelProps } from "../../../types/globalTypes";
import styles from "./InputAndLabel.module.scss";
import { RefObject } from "react";

interface IInputAndLabel extends IInputProps, ILabelProps {
	className?: string;
	labelClassName?: string;
	inputClassName?: string;
	value?: string;
	onChange?: IInputProps["onChange"];
	inputRef?: RefObject<HTMLInputElement>;
}

const InputAndLabel = (props: IInputAndLabel) => {
	let name = props.name,
		type = props.type,
		isAlternateLayout =
			type === "radio" || type === "checkbox"
				? styles["InputAndLabel-alt"]
				: type === "search"
				? styles["InputAndLabel-search"]
				: "",
		className = props.className ?? "";

	return (
		<div className={`${isAlternateLayout} ${className}`.trim()}>
			<Label
				forId={props.id ?? name}
				name={props.name}
				label={props.label}
				className={props.labelClassName}
			/>
			<Input
				name={name}
				type={type}
				placeholder={props.placeholder}
				className={props.inputClassName}
				onChange={(e) => props.onChange && props.onChange(e)}
				value={props.value}
				checked={props.checked}
				defaultChecked={props.defaultChecked}
				id={props.id}
				inputRef={props.inputRef && props.inputRef}
				required={props.required}
			/>
			{type === "search" ? (
				<>
					<button>O</button>
				</>
			) : null}
		</div>
	);
};

export default InputAndLabel;
