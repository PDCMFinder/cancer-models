import { memo } from "react";
import { Handle, Node, Position } from "reactflow";

const CustomNode = ({ data }: Node["data"]) => {
	return (
		<>
			<div>
				<Handle
					style={{ visibility: "hidden" }}
					type="target"
					position={Position.Left}
					isConnectable={false}
				/>
				<p>
					<a
						className="px-2 py-1"
						href={`/data/models/${data.provider}/${data.label}`}
					>
						{data.label}
					</a>
				</p>
				<Handle
					style={{ visibility: "hidden" }}
					type="source"
					position={Position.Right}
					isConnectable={false}
				/>
			</div>
		</>
	);
};

export default memo(CustomNode);
