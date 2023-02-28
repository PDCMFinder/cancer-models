import { useState } from "react";
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
				className="d-inline position-relative"
			>
				{isHovering && (
					<>
						<div className={styles.Tooltip_content}>{props.content}</div>
						<div className={styles["arrow-left"]}></div>
					</>
				)}
				<span className={styles.Tooltip_children}>{props.children}</span>
			</div>
		</div>
	);
};

export default Tooltip;
