import { Edge, MarkerType } from "reactflow";
import { LayoutedNode } from "../components/HierarchyTree/HierarchyTree";
import { KnowledgeGraph } from "../types/ModelData.model";

const commonNodeProperties = {
	x: 0,
	y: 0,
	position: { x: 0, y: 0 },
	type: "custom",
	width: 230,
	height: 45
};

const commonEdgeProperties = {
	markerEnd: {
		type: MarkerType.ArrowClosed,
		width: 17,
		height: 17,
		color: "#003e48" // $color-primary-primary
	},
	labelBgPadding: [5, 5] as [number, number]
};

const parseKnowledgeGraph = (
	data: KnowledgeGraph,
	providerId: string,
	currentModelId: string
): { nodes: LayoutedNode[]; edges: Edge[] } => {
	return {
		nodes: data.nodes.map((node) => ({
			id: node.id.toString(),
			data: {
				label: node.nodeLabel,
				provider: providerId,
				type: node.data?.type || ""
			},
			className: `${
				node.nodeLabel === currentModelId && node.data?.type ? "current" : ""
			} ${node.data?.type ? `type-${node.data.type}` : ""}`,
			...commonNodeProperties
		})),
		edges: data.edges.map((edge) => ({
			id: `e${edge.source}-${edge.target}`,
			source: edge.source.toString(),
			target: edge.target.toString(),
			label: edge.label.replace("_", " "),
			...commonEdgeProperties
		}))
	};
};

export default parseKnowledgeGraph;
