import Dagre from "@dagrejs/dagre";
import { useRef } from "react";
import ReactFlow, {
	Background,
	BackgroundVariant,
	Node,
	ReactFlowRefType
} from "reactflow";
import "reactflow/dist/style.css";
import { KnowledgeGraph } from "../../types/ModelData.model";
import parseKnowledgeGraph from "../../utils/parseKnowledgeGraph";
import CustomNode from "./CustomNode";

interface IHierarchyTreeProps {
	data: KnowledgeGraph;
	providerId: string;
	modelId: string;
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
	providerId
}: IHierarchyTreeProps) => {
	const flowRef = useRef<ReactFlowRefType>(null);
	const reactFlowHeight = flowRef?.current?.scrollHeight;
	const parsedData = parseKnowledgeGraph(data, providerId, currentModelId);

	g.setGraph({ rankdir: "LR" }); // Could also be TB so the tree is vertical. Need to update custom node if using TB

	parsedData.edges.forEach((edge) => g.setEdge(edge.source, edge.target));
	parsedData.nodes.forEach((node) => g.setNode(node.id, node));

	Dagre.layout(g);

	return (
		<div style={{ height: reactFlowHeight }}>
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
				proOptions={{
					hideAttribution: true
				}}
				nodeTypes={nodeTypes}
				ref={flowRef}
			>
				<Background color="#ebebeb" variant={BackgroundVariant.Lines} />
			</ReactFlow>
		</div>
	);
};

export default HierarchyTree;
