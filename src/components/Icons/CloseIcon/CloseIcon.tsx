import styles from "./CloseIcon.module.scss";

type CloseIconProps = {
	color?: "dark" | "white";
	className?: string;
	onClick?: () => void;
};

const CloseIcon = ({ color = "white", className, onClick }: CloseIconProps) => {
	return (
		<button
			className={`${className ? className : ""} ${styles.CloseIcon} ${
				styles[`CloseIcon-${color}`]
			}`}
			onClick={onClick}
			aria-label="Close icon"
		>
			<span></span>
			<span></span>
		</button>
	);
};

export default CloseIcon;
