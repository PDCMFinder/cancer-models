import CavendishIcon, { ICavendishIconProps } from "./CavendishIcon";
import MouseIcon from "./MouseIcon";
import OrganoidIcon from "./OrganoidIcon";

interface IIconComponent {
	[key: string]: (props: ICavendishIconProps) => JSX.Element;
}

const ModelTypeIcon = ({
	modelType,
	size,
	...props
}: {
	modelType: string;
	size: ICavendishIconProps["size"];
	className?: string;
}) => {
	const icons: IIconComponent = {
		PDX: MouseIcon,
		organoid: OrganoidIcon,
		"cell line": CavendishIcon
	};

	const IconComponent = icons[modelType] || (() => <></>);

	return <IconComponent size={size} {...props} />;
};

export default ModelTypeIcon;
