import CavendishIcon from "./CavendishIcon";
import MouseIcon from "./MouseIcon";
import OrganoidIcon from "./OrganoidIcon";

const ModelTypeIcon = ({
	modelType,
	size
}: {
	modelType: string;
	size: string;
}) => {
	if (modelType === "PDX") {
		return <MouseIcon size={size} />;
	} else if (modelType === "organoid") {
		return <OrganoidIcon size={size} />;
	} else {
		return <CavendishIcon size={size} />;
	}
};

export default ModelTypeIcon;
