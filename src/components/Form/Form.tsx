import { FormEvent } from "react";

type FormProps = {
	children: string | JSX.Element | JSX.Element[];
	className?: string;
	onSubmit: Function;
};

const Form = (props: FormProps) => {
	const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		props.onSubmit(e);
	};

	return (
		<form className={props.className} onSubmit={handleOnSubmit}>
			{props.children}
		</form>
	);
};

export default Form;
