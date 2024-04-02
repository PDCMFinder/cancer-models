import React, { useRef } from "react";
import Dagre from "@dagrejs/dagre";
import ReactFlow, { Node, Edge, ReactFlowRefType } from "reactflow";
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
	classname?: string;
};

const nodeTypes = {
	custom: CustomNode,
};

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const HierarchyTree = ({ data }: IHierarchyTreeProps) => {
	const flowRef = useRef<ReactFlowRefType>(null);
	const reactFlowHeight = flowRef?.current?.scrollHeight;

	g.setGraph({ rankdir: "LR" }); // Could also be TB so the tree is vertical. Need to update custom node if using TB

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
