import Tooltip from "../Tooltip/Tooltip";
import styles from "./InformationIcon.module.scss";

interface IInformationIconProps {
	information: string;
}

const InformationIcon = ({ information }: IInformationIconProps) => {
	return (
		<Tooltip
			className="d-inline-block ml-1"
			content={
				<p
					className="text-small m-0"
					style={{ width: "max-content", maxWidth: "300px" }}
				>
					{information}
				</p>
			}
		>
			<span
				className={`${styles.InformationIcon} d-inline-block text-center br-round`}
			>
				i
			</span>
		</Tooltip>
	);
};

export default InformationIcon;
