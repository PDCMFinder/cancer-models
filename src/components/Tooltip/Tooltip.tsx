import { useState } from "react";
import ArrowIcon from "../ArrowIcon/ArrowIcon";
import styles from "./Tooltip.module.scss";

type TooltipProps = { content: any; children: any; className?: string };

const Tooltip = (props: TooltipProps) => {
	const [isHovering, setIsHovering] = useState(false);

	return (
		<div className={`${props.className ?? ""} ${styles.Tooltip}`}>
			<div
				onMouseOver={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
				className="w-min pr-2 position-md-relative"
			>
				{isHovering && (
					<>
						<div className={styles.Tooltip_content}>{props.content}</div>
						<ArrowIcon className={styles.Tooltip_arrow} />
					</>
				)}
				<span className={styles.Tooltip_children}>{props.children}</span>
			</div>
		</div>
	);
};

export default Tooltip;
