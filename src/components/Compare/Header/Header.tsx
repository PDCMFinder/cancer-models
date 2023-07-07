import Card from "../../Card/Card";
import QualityBadge from "../../QualityBadge/QualityBadge";

interface IHeaderProps {
	modelId: string;
	histology: string;
	score: number;
}

const Header = ({ modelId, histology, score }: IHeaderProps) => {
	return (
		<Card
			style={{ backgroundColor: "#F2FBFA" }}
			className="py-3"
			contentClassName="py-0"
		>
			<div className="d-flex align-baseline">
				<h2 className="m-0">{modelId}</h2>
				<h3 className="h4 ml-3 mb-0">{histology}</h3>
			</div>
			<QualityBadge score={score} />
		</Card>
	);
};

export default Header;
