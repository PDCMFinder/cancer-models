interface IShowHideProps {
	children: any;
	windowWidth: number;
	showOver?: number;
	hideOver?: number;
}

const ShowHide = (props: IShowHideProps) => {
	let windowWidth = props.windowWidth,
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
