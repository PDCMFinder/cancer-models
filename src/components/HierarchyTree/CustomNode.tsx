import { memo } from "react";
import { Handle, Node, Position } from "reactflow";
import CavendishIcon from "../Icons/CavendishIcon";
import MouseIcon from "../Icons/MouseIcon";
import OrganoidIcon from "../Icons/OrganoidIcon";

const CustomNode = ({ data }: Node["data"]) => {
	let modelTypeIcon: JSX.Element;

	if (data.type === "PDX") {
		modelTypeIcon = <MouseIcon size="1em" />;
	} else if (data.type === "organoid") {
		modelTypeIcon = <OrganoidIcon size="1em" />;
	} else {
		modelTypeIcon = <CavendishIcon size="1em" />;
	}

	return (
		<div>
			<Handle
				style={{ visibility: "hidden" }}
				type="target"
				position={Position.Left}
				isConnectable={false}
			/>
			<p>
				<a
					className="px-2 py-1 d-flex align-center"
					href={`/data/models/${data.provider}/${data.label}`}
				>
					{data.label} <span className="d-flex ml-1">{modelTypeIcon}</span>
				</a>
			</p>
			<Handle
				style={{ visibility: "hidden" }}
				type="source"
				position={Position.Right}
				isConnectable={false}
			/>
		</div>
	);
};

export default memo(CustomNode);
