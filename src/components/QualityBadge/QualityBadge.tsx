import styles from "./QualityBadge.module.scss";

interface IQualityBadgeProps {
	className?: string;
	containerClassName?: string;
	score: number;
}

const QualityBadge = (props: IQualityBadgeProps) => {
	return (
		<div className={props.containerClassName}>
			<meter
				className={props.className}
				min={0}
				max={100}
				value={props.score}
				high={50}
				low={20}
				optimum={60}
			></meter>
			<p className="text-small m-0">Data amount score</p>
		</div>
	);
};

export default QualityBadge;
