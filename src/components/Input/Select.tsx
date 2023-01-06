import React from "react";

interface ISelectProps {
	id: string;
	options: { value?: string; text: string }[];
	className?: string;
}

const Select = (props: ISelectProps) => {
	let id = props.id;

	return (
		<select name={id} id={id} className={props.className}>
			{props.options.map((opt) => {
				let text = opt.text,
					value = opt.value ? opt.value : text;

				return (
					<option key={value} value={value}>
						{text}
					</option>
				);
			})}
		</select>
	);
};

export default Select;
