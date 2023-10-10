import Tooltip from "../Tooltip/Tooltip";
import styles from "./InformationIcon.module.scss";

interface IInformationIconProps {
	information: string;
}

const InformationIcon = (props: IInformationIconProps) => {
	return (
		<Tooltip
			className={`d-inline ${styles.InformationIcon}`}
			content={props.information}
		>
			<span className={styles.InformationIcon_Icon}>I</span>
		</Tooltip>
	);
};

export default InformationIcon;
