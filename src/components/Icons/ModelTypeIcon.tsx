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
	} else if (modelType === "cell line") {
		return <CavendishIcon size={size} />;
	} else {
		return <></>;
	}
};

export default ModelTypeIcon;
