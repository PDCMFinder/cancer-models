import React, { useRef } from "react";
import Dagre from "@dagrejs/dagre";
import ReactFlow, { MarkerType, Node, Edge, ReactFlowRefType } from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";

interface IHierarchyTreeProps {
	data: { nodes: LayoutedNode[]; edges: Edge[] }; // TODO Update
}

export type LayoutedNode = Node & {
	x: number;
	y: number;
	width: number;
	height: number;
	data: {
		label: string;
		provider: string;
	};
};

const commonNodeProperties = {
	x: 0,
	y: 0,
	position: { x: 0, y: 0 },
	type: "custom",
	width: 100,
	height: 45,
};

const commonEdgeProperties = {
	markerEnd: {
		type: MarkerType.ArrowClosed,
	},
	type: "smoothstep",
};

const initialNodes: LayoutedNode[] = [
	{
		id: "SIDM01016",
		data: {
			label: "SIDM01016",
			provider: "CMP",
		},
		x: 0,
		y: 0,
		position: {
			x: 0,
			y: 0,
		},
		type: "custom",
		width: 100,
		height: 45,
	},
	{
		id: "SIDM01263",
		data: {
			label: "SIDM01263",
			provider: "CMP",
		},
		x: 0,
		y: 0,
		position: {
			x: 0,
			y: 0,
		},
		type: "custom",
		width: 100,
		height: 45,
	},
];

const initialEdges: Edge[] = [
	{
		id: "eSIDM01016-SIDM01244",
		source: "SIDM01016",
		target: "SIDM01263",
		markerEnd: {
			type: MarkerType.ArrowClosed,
		},
		type: "smoothstep",
	},
];

const nodeTypes = {
	custom: CustomNode,
};

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const HierarchyTree = ({ data }: IHierarchyTreeProps) => {
	const flowRef = useRef<ReactFlowRefType>(null);
	const reactFlowHeight = flowRef?.current?.scrollHeight;

	g.setGraph({ rankdir: "LR" });

	data.edges.forEach((edge) => g.setEdge(edge.source, edge.target));
	data.nodes.forEach((node) => g.setNode(node.id, node));

	Dagre.layout(g);

	return (
		<div style={{ height: reactFlowHeight, width: "100%" }} className="w-100">
			<ReactFlow
				nodes={data.nodes.map((node) => {
					return {
						...node,
						position: {
							x: node.x - node.width / 2,
							y: node.y - node.height / 2,
						},
					};
				})}
				edges={data.edges}
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
				nodeTypes={nodeTypes}
				ref={flowRef}
			></ReactFlow>
		</div>
	);
};

export default HierarchyTree;
