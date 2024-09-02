import { memo } from "react";
import { Handle, Node, Position } from "reactflow";
import ModelTypeIcon from "../Icons/ModelTypeIcon";

const CustomNode = ({ data }: Node["data"]) => (
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
				{data.label}{" "}
				<span className="d-flex ml-1">
					<ModelTypeIcon modelType={data.type} size="1em" />
				</span>
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

export default memo(CustomNode);
