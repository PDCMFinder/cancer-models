interface IFormProps {
	children: string | JSX.Element | JSX.Element[];
	className?: string;
	onSubmit: Function;
}

const Form = (props: IFormProps) => {
	const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		props.onSubmit();
	};

	return (
		<form className={props.className} onSubmit={handleOnSubmit}>
			{props.children}
		</form>
	);
};

export default Form;
