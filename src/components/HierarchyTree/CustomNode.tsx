import { memo } from "react";
import { Handle, Position } from "reactflow";
import ModelTypeIcon from "../Icons/ModelTypeIcon";

type CustomNodeData = {
	provider: string;
	label: string;
	type?: string;
};

const NodeContent = ({
	label,
	type,
	provider
}: CustomNodeData): JSX.Element => {
	const containerClassName = "px-2 py-1 d-flex align-center";
	const content = (
		<>
			{label}
			{type && (
				<span className="d-flex ml-1">
					<ModelTypeIcon modelType={type} size="1em" />
				</span>
			)}
		</>
	);

	return type ? (
		<a
			className={containerClassName}
			href={`/data/models/${provider}/${label}`}
		>
			{content}
		</a>
	) : (
		<span className={containerClassName}>{content}</span>
	);
};

const CustomNode = ({ data }: { data: CustomNodeData }): JSX.Element => (
	<div>
		<Handle
			style={{ visibility: "hidden" }}
			type="target"
			position={Position.Left}
			isConnectable={false}
		/>
		<p className="text-smaller">
			<NodeContent {...data} />
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
