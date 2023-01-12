interface IShowHideBasics {
	children: any;
	windowWidth: number;
}

interface IShowOver extends IShowHideBasics {
	showOver: number;
	hideOver?: never;
}

interface IHideOver extends IShowHideBasics {
	hideOver: number;
	showOver?: never;
}

type IShowHideProps = IShowOver | IHideOver;

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
