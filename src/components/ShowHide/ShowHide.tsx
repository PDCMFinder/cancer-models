type ShowHideBasics = { children: any; windowWidth: number };

interface IShowOver extends ShowHideBasics {
	showOver: number;
	hideOver?: never;
}

interface IHideOver extends ShowHideBasics {
	hideOver: number;
	showOver?: never;
}

type ShowHideProps = IShowOver | IHideOver;

const ShowHide = (props: ShowHideProps) => {
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
