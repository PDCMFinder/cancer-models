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
				high={70}
				low={30}
				optimum={90}
			></meter>
			<p className="text-small m-0">Model characterisation</p>
		</div>
	);
};

export default QualityBadge;
