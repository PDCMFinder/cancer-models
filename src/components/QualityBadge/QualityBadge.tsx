import Tooltip from "../Tooltip/Tooltip";
import styles from "./QualityBadge.module.scss";

interface IQualityBadgeProps {
	className?: string;
	score: number;
}

const QualityBadge = (props: IQualityBadgeProps) => {
	return (
		<Tooltip
			content={<p className="text-small mb-0 lh-1">Metadata richness score</p>}
		>
			<meter
				className={props.className}
				min={0}
				max={100}
				value={props.score}
				high={50}
				low={20}
				optimum={60}
			></meter>
		</Tooltip>
	);
};

export default QualityBadge;
