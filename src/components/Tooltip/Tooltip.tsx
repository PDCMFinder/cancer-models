import { useState } from "react";
import ArrowIcon from "../ArrowIcon/ArrowIcon";
import styles from "./Tooltip.module.scss";

interface ITooltipProps {
	content: any;
	children: any;
}

const Tooltip = (props: ITooltipProps) => {
	const [isHovering, setIsHovering] = useState(false);

	return (
		<div className={styles.Tooltip}>
			<div
				onMouseOver={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
				className="w-min position-relative pr-2"
			>
				{isHovering && (
					<>
						<div className={styles.Tooltip_content}>{props.content}</div>
						<ArrowIcon className={styles.Tooltip_arrow} direction="left" />
					</>
				)}
				<span className={styles.Tooltip_children}>{props.children}</span>
			</div>
		</div>
	);
};

export default Tooltip;
