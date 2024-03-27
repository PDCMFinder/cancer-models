import { memo } from "react";
import { Handle, Position } from "reactflow";
import { INodeData } from "./HierarchyTree";

const Test = ({ data }: { data: INodeData }) => {
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
						className="px-1 py-2"
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

export default memo(Test);
