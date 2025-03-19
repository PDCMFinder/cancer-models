import CavendishIcon, { type CavendishIconProps } from "./CavendishIcon";
import MouseIcon from "./MouseIcon";
import OrganoidIcon from "./OrganoidIcon";

type IconComponent = {
	[key: string]: (props: CavendishIconProps) => JSX.Element;
};

const ModelTypeIcon = ({
	modelType,
	size,
  hideOther,
	...props
}: {
	modelType: string;
	size: CavendishIconProps["size"];
	className?: string;
	hideOther?: boolean;
}) => {
	const icons: IconComponent = {
		PDX: MouseIcon,
		organoid: OrganoidIcon,
		"cell line": CavendishIcon
	};

	const IconComponent = icons[modelType] || (() => <></>);

	if (modelType.toLowerCase() === "other" && !hideOther) {
		return (
			<p className="m-0" style={{ fontSize: "1em" }}>
				Other
			</p>
		);
	}

	return <IconComponent size={size} {...props} />;
};

export default ModelTypeIcon;
