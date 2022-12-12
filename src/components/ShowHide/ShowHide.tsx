interface IShowHideProps {
	children: JSX.Element;
	windowWidth?: number;
	showOver?: number;
	hideOver?: number;
}

const ShowHide = ({ windowWidth: _windowWidth, ...props }: IShowHideProps) => {
	let windowWidth = _windowWidth || "",
		showOver = props.showOver,
		hideOver = props.hideOver;

	if (
		(hideOver && windowWidth >= hideOver) ||
		(showOver && windowWidth < showOver)
	) {
		return null;
	}

	return <>{props.children}</>;
};

export default ShowHide;
