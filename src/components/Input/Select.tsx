import React, { useState } from "react";

interface ISelectProps {
	id: string;
	options: { value?: string; text: string }[];
	className?: string;
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = (props: ISelectProps) => {
	let options = props.options,
		id = props.id;

	const [selected, setSelected] = useState(options[0].value);

	return (
		<select
			name={id}
			id={id}
			className={props.className}
			value={selected}
			onChange={props.onChange}
		>
			{options.map((opt) => {
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
