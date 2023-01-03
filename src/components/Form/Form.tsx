interface IFormProps {
	children: string | JSX.Element | JSX.Element[];
}

const Form = (props: IFormProps) => {
	const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return <form onSubmit={handleOnSubmit}>{props.children}</form>;
};

export default Form;
