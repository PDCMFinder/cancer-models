import React, { FC } from "react";
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
		>
			<span></span>
			<span></span>
		</button>
	);
};

CloseIcon.defaultProps = defaultProps;

export default CloseIcon;
