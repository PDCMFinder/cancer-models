import { CSSProperties } from "react";
import Tooltip from "../Tooltip/Tooltip";

interface IQualityBadgeProps {
	className?: string;
	containerClassName?: string;
	score: number;
	style?: CSSProperties;
}

const QualityBadge = (props: IQualityBadgeProps) => {
	return (
		<div className={props.containerClassName}>
			<Tooltip content={<span className="text-small">{props.score}</span>}>
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
