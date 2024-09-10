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
	type: "smoothstep"
};

const parseKnowledgeGraph = (
	data: KnowledgeGraph,
	providerId: string,
	currentId: string,
	currentType: string
): { nodes: LayoutedNode[]; edges: Edge[] } => {
	const parsedData: { nodes: LayoutedNode[]; edges: Edge[] } = {
		nodes: [],
		edges: []
	};

	data.nodes.forEach((node) => {
		parsedData.nodes.push({
			id: node.id.toString(),
			data: {
				label: node.nodeLabel,
				provider: providerId,
				type: node.nodeType || ""
			},
			...commonNodeProperties
		});
	});

	data.edges.forEach((edge) => {
		parsedData.edges.push({
			id: "e" + edge.source + "-" + edge.target,
			source: edge.source.toString(),
			target: edge.target.toString(),
			...commonEdgeProperties
		});
	});

	return parsedData;
};

export default parseKnowledgeGraph;
