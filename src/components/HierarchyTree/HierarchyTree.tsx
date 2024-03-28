import React, { useEffect, useRef } from "react";
import Dagre from "@dagrejs/dagre";
import ReactFlow, { MarkerType, Node, Edge, ReactFlowRefType } from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import { IModelRelationships } from "../../pages/data/models/[providerId]/[modelId]";

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
		id: "14234",
		data: { label: "input", provider: "string" },
		...commonNodeProperties,
	},
	{
		id: "1b",
		data: { label: "input", provider: "string" },
		...commonNodeProperties,
	},
	{
		id: "2",
		data: { label: "node 2", provider: "string" },
		...commonNodeProperties,
	},
	{
		id: "3",
		data: { label: "node 2", provider: "string" },
		...commonNodeProperties,
	},
];

const initialEdges: Edge[] = [
	{
		id: "e12",
		source: "14234",
		target: "2",
		...commonEdgeProperties,
	},
	{
		id: "e1b2",
		source: "1b",
		target: "2",
		...commonEdgeProperties,
	},
	{
		id: "e23",
		source: "2",
		target: "3",
		...commonEdgeProperties,
	},
];

const nodeTypes = {
	custom: CustomNode,
};

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const HierarchyTree = (props: IHierarchyTreeProps) => {
	const flowRef = useRef<ReactFlowRefType>(null);
	const reactFlowHeight = flowRef?.current?.scrollHeight;

	g.setGraph({ rankdir: "LR" });

	initialEdges.forEach((edge) => g.setEdge(edge.source, edge.target));
	initialNodes.forEach((node) => g.setNode(node.id, node));

	Dagre.layout(g);

	return (
		<div style={{ height: reactFlowHeight, width: "100%" }} className="w-100">
			<ReactFlow
				nodes={initialNodes.map((node) => {
					return {
						...node,
						position: {
							x: node.x - node.width / 2,
							y: node.y - node.height / 2,
						},
					};
				})}
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
				nodeTypes={nodeTypes}
				ref={flowRef}
			></ReactFlow>
		</div>
	);
};

export default HierarchyTree;
