import Button from "../Button/Button";
import styles from "./FloatingWidget.module.scss";

type FloatingWidgetProps = {
	link: string;
	children: string;
	onClick?: () => void;
};

const FloatingWidget = (props: FloatingWidgetProps) => {
	return (
		<Button
			href={props.link}
			priority="primary"
			color="dark"
			className={`position-fixed m-0 white-space-nowrap ${styles.FloatingWidget}`}
			htmlTag="a"
			onClick={props.onClick}
		>
			{props.children}
		</Button>
	);
};

export default FloatingWidget;
