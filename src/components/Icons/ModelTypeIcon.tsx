import CavendishIcon, { ICavendishIconProps } from "./CavendishIcon";
import MouseIcon from "./MouseIcon";
import OrganoidIcon from "./OrganoidIcon";

interface IIconComponent {
	[key: string]: (props: ICavendishIconProps) => JSX.Element;
}

const ModelTypeIcon = ({
	modelType,
	size
}: {
	modelType: string;
	size: ICavendishIconProps["size"];
}) => {
	const icons: IIconComponent = {
		PDX: MouseIcon,
		organoid: OrganoidIcon,
		"cell line": CavendishIcon
	};

	const IconComponent = icons[modelType] || (() => <></>);
	return <IconComponent size={size} />;
};

export default ModelTypeIcon;
