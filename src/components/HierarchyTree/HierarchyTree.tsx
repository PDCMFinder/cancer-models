import ReactFlow, { Position, Node, Panel, MarkerType } from "reactflow";
import CustomNode from "./CustomNode";
// import "reactflow/dist/style.css";
import "reactflow/dist/base.css";

export interface INode {
	id: string;
	data: INodeData;
	position: INodePosition;
	type: string;
	className: string;
}

export interface INodeData {
	label: string;
	provider: string;
}

export interface INodePosition {
	x: number;
	y: number;
}

const initialNodes: Node[] = [
	{
		id: "1",
		data: { label: "SIDM01263", provider: "asdf" },
		position: { x: 0, y: 50 },
		type: "custom",
	},
	{
		id: "4",
		data: { label: "SIDM01263", provider: "asdf" },
		position: { x: 0, y: 150 },
		type: "custom",
	},
	{
		id: "2",
		data: { label: "SIDM01244", provider: "asdf" },
		position: { x: 350, y: 50 },
		type: "custom",
		className: "current",
	},
	{
		id: "3",
		data: { label: "SIDM01016", provider: "asdf" },
		position: { x: 700, y: 50 },
		type: "custom",
	},
	{
		id: "5",
		data: { label: "SIDM01016", provider: "asdf" },
		position: { x: 350, y: 150 },
		type: "custom",
	},
];

const initialEdges = [
	{
		id: "e1-2",
		source: "1",
		target: "2",
		markerEnd: {
			type: MarkerType.ArrowClosed,
		},
	},
	{
		id: "e2-3",
		source: "2",
		target: "3",
		markerEnd: {
			type: MarkerType.ArrowClosed,
		},
	},
	{
		id: "e4-2",
		source: "4",
		target: "2",
		markerEnd: {
			type: MarkerType.ArrowClosed,
		},
	},
	{
		id: "e4-5",
		source: "4",
		target: "5",
		markerEnd: {
			type: MarkerType.ArrowClosed,
		},
	},
];

const nodeTypes = {
	custom: CustomNode,
};

function HierarchyTree() {
	return (
		<div style={{ height: "300px", width: "100%" }}>
			<ReactFlow
				nodes={initialNodes}
				edges={initialEdges}
				fitView
				proOptions={{
					hideAttribution: true,
				}}
				draggable={false}
				panOnDrag={false}
				preventScrolling={false}
				zoomOnScroll={false}
				zoomOnPinch={false}
				zoomOnDoubleClick={false}
				selectNodesOnDrag={false}
				connectOnClick={false}
				nodesConnectable={false}
				nodesDraggable={false}
				nodesFocusable={false}
				// elementsSelectable={false} // need this to be true so user can click link
				nodeTypes={nodeTypes}
			>
				{/* <Panel position="top-left">top-left</Panel> */}
			</ReactFlow>
		</div>
	);
}

export default HierarchyTree;
