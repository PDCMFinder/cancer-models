import { Edge, MarkerType } from "reactflow";
import { LayoutedNode } from "../components/HierarchyTree/HierarchyTree";
import { IModelRelationships } from "../pages/data/models/[providerId]/[modelId]";

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

const parseRelationships = (
	data: IModelRelationships,
	providerId: string,
	parsedData: { nodes: LayoutedNode[]; edges: Edge[] } = {
		nodes: [],
		edges: [],
	}
): { nodes: LayoutedNode[]; edges: Edge[] } => {
	if (data) {
		if (data.external_model_id) {
			parsedData.nodes.push({
				id: data.external_model_id,
				data: {
					label: data.external_model_id,
					provider: providerId,
				},
				...commonNodeProperties,
			});
		}
		if (data.parents) {
			if (Array.isArray(data.parents)) {
				data.parents.forEach((parent: IModelRelationships) =>
					parseRelationships(parent, providerId, parsedData)
				);
			} else {
				parseRelationships(data.parents, providerId, parsedData);
			}
		}
		if (data.children) {
			if (Array.isArray(data.children)) {
				data.children.forEach((child: IModelRelationships) =>
					parseRelationships(child, providerId, parsedData)
				);
			} else {
				parseRelationships(data.children, providerId, parsedData);
			}
		}
	}

	return parsedData;
};

export default parseRelationships;
