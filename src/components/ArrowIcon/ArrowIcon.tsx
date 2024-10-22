import styles from "./ArrowIcon.module.scss";

export type IArrowIconProps = {
	direction?: "up" | "right" | "down" | "left";
	className?: string;
};

const ArrowIcon = (props: IArrowIconProps) => {
	return (
		<svg
			viewBox="0 0 9 8"
			xmlns="http://www.w3.org/2000/svg"
			className={`${styles.ArrowIcon} ${
				styles[`ArrowIcon-${props.direction}`]
			} ${props.className || ""}`.trim()}
		>
			<path
				d="M4.33003 8L-9.98378e-05 0.500001L8.66016 0.5L4.33003 8Z"
				fill="white"
			/>
		</svg>
	);
};

export default ArrowIcon;
