import Dagre from "@dagrejs/dagre";
import { useRef } from "react";
import ReactFlow, { Node, ReactFlowRefType } from "reactflow";
import "reactflow/dist/style.css";
import { ModelRelationships } from "../../types/ModelData.model";
import parseRelationships from "../../utils/parseRelationships";
import CustomNode from "./CustomNode";

interface IHierarchyTreeProps {
	data: ModelRelationships;
	providerId: string;
	modelId: string;
	modelType: string;
}

export type LayoutedNode = Node & {
	x: number;
	y: number;
	width: number;
	height: number;
	data: {
		label: string;
		provider: string;
		type: string;
	};
	classname?: string;
};

const nodeTypes = {
	custom: CustomNode
};

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const HierarchyTree = ({
	data,
	modelId: currentModelId,
	providerId,
	modelType: currentModelType
}: IHierarchyTreeProps) => {
	const flowRef = useRef<ReactFlowRefType>(null);
	const reactFlowHeight = flowRef?.current?.scrollHeight;
	const parsedData = parseRelationships(
		data,
		providerId,
		currentModelId,
		currentModelType
	);

	g.setGraph({ rankdir: "LR" }); // Could also be TB so the tree is vertical. Need to update custom node if using TB

	parsedData.edges.forEach((edge) => g.setEdge(edge.source, edge.target));
	parsedData.nodes.forEach((node) => g.setNode(node.id, node));

	Dagre.layout(g);

	return (
		<div style={{ height: reactFlowHeight, width: "100%" }} className="w-100">
			<ReactFlow
				nodes={parsedData.nodes.map((node) => {
					return {
						...node,
						position: {
							x: node.x - node.width / 2,
							y: node.y - node.height / 2
						}
					};
				})}
				edges={parsedData.edges}
				fitView
				proOptions={{
					hideAttribution: true
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
