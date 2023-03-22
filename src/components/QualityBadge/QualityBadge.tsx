import styles from "./QualityBadge.module.scss";

interface IQualityBadgeProps {
	className?: string;
	score: number;
}

const QualityBadge = (props: IQualityBadgeProps) => {
	return (
		<meter
			className={props.className}
			min={0}
			max={100}
			value={props.score}
			high={50}
			low={20}
			optimum={60}
		></meter>
	);
};

export default QualityBadge;
