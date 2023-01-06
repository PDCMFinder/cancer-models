import React from "react";

interface ISelectProps {
	id: string;
	options: { value?: string; option: string }[];
	className?: string;
}

const Select = (props: ISelectProps) => {
	let id = props.id;

	return (
		<select name={id} id={id} className={props.className}>
			{props.options.map((opt) => {
				let option = opt.option,
					value = opt.value ? opt.value : option;

				return (
					<option key={value} value={value}>
						{option}
					</option>
				);
			})}
		</select>
	);
};

export default Select;
