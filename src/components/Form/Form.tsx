interface IFormProps {
	children: string | JSX.Element | JSX.Element[];
	className?: string;
}

const Form = (props: IFormProps) => {
	const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<form className={props.className} onSubmit={handleOnSubmit}>
			{props.children}
		</form>
	);
};

export default Form;
