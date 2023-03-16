import styles from "./QualityBadge.module.scss";

interface IQualityBadgeProps {
	className?: string;
}

const QualityBadge = (props: IQualityBadgeProps) => {
	return (
		<meter
			className={props.className}
			min={0}
			max={42}
			value={37}
			high={39}
			low={34}
			optimum={42}
		></meter>
	);
};

export default QualityBadge;
