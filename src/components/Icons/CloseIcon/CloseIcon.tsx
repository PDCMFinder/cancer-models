import styles from "./CloseIcon.module.scss";

interface ICloseIconProps {
	color?: "dark" | "white";
	onClick?: () => void;
}

const defaultProps: ICloseIconProps = {
	color: "white",
};

const CloseIcon = (props: ICloseIconProps) => {
	return (
		<button
			className={`${styles.CloseIcon} ${styles[`CloseIcon-${props.color}`]}`}
			onClick={props.onClick}
			aria-label="Close icon"
		>
			<span></span>
			<span></span>
		</button>
	);
};

CloseIcon.defaultProps = defaultProps;

export default CloseIcon;
