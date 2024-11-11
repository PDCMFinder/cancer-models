import CavendishIcon, { CavendishIconProps } from "./CavendishIcon";
import MouseIcon from "./MouseIcon";
import OrganoidIcon from "./OrganoidIcon";

type IconComponent = {
	[key: string]: (props: CavendishIconProps) => JSX.Element;
};

const ModelTypeIcon = ({
	modelType,
	size,
	...props
}: {
	modelType: string;
	size: CavendishIconProps["size"];
	className?: string;
}) => {
	const icons: IconComponent = {
		PDX: MouseIcon,
		organoid: OrganoidIcon,
		"cell line": CavendishIcon
	};

	const IconComponent = icons[modelType] || (() => <></>);

	return <IconComponent size={size} {...props} />;
};

export default ModelTypeIcon;
