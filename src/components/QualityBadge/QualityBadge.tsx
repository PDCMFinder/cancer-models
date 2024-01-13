import { CSSProperties } from "react";
import Tooltip from "../Tooltip/Tooltip";
import styles from "./QualityBadge.module.scss";

interface IQualityBadgeProps {
	className?: string;
	id?: string;
	containerClassName?: string;
	score: number;
	style?: CSSProperties;
}

const QualityBadge = (props: IQualityBadgeProps) => {
	return (
		<div className={props.containerClassName} id={props.id}>
			<Tooltip
				content={
					<>
						<span className="text-bold">{props.score}%</span>
						<p
							className={`text-small mb-0 mt-1 ${styles.QualityBadge_toolTip_p}`}
						>
							Score related to the amount of information available about the
							model, not the quality of the model.
						</p>
					</>
				}
			>
				<meter
					className={props.className}
					min={0}
					max={100}
					value={props.score}
					high={70}
					low={30}
					optimum={90}
					style={props.style}
				></meter>
			</Tooltip>
			<p className="text-small m-0">Model characterisation</p>
		</div>
	);
};

export default QualityBadge;
