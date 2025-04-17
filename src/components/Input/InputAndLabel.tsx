import { RefObject } from "react";
import { InputProps, LabelProps } from "../../../types/globalTypes";
import Input from "./Input";
import styles from "./InputAndLabel.module.scss";
import Label from "./Label";

interface IInputAndLabel extends InputProps, LabelProps {
	className?: string;
	labelClassName?: string;
	inputClassName?: string;
	value?: string;
	onChange?: InputProps["onChange"];
	inputRef?: RefObject<HTMLInputElement>;
	hjAllow?: boolean;
	style?: React.CSSProperties;
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
		<div
			className={`${isAlternateLayout} ${className}`.trim()}
			style={props.style}
		>
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
				data-hj-allow={props.hjAllow}
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
