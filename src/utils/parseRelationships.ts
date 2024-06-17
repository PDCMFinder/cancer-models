import { Edge, MarkerType } from "reactflow";
import { LayoutedNode } from "../components/HierarchyTree/HierarchyTree";
import { ModelRelationships } from "../types/ModelData.model";

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

const parseRelationships = (
	data: ModelRelationships,
	providerId: string,
	currentId: string,
	currentType: string,
	parsedData: { nodes: LayoutedNode[]; edges: Edge[] } = {
		nodes: [],
		edges: []
	} // don't pass as argument when calling function
): { nodes: LayoutedNode[]; edges: Edge[] } => {
	if (data) {
		if (data.external_model_id) {
			parsedData.nodes.push({
				id: data.external_model_id,
				data: {
					label: data.external_model_id,
					provider: providerId,
					type: data.type || ""
				},
				...commonNodeProperties
			});
		} else {
			// if there's no external model id, then it's the current model
			parsedData.nodes.push({
				id: currentId,
				data: {
					label: currentId,
					provider: providerId,
					type: currentType || ""
				},
				className: "current",
				...commonNodeProperties
			});
		}
		if (data.parents) {
			if (Array.isArray(data.parents)) {
				data.parents.forEach((parent: ModelRelationships) => {
					const parentId = parent.external_model_id ?? "";
					const childId = data.external_model_id ?? currentId;

					parsedData.edges.push({
						id: `e${parentId}-${childId}`,
						source: parentId,
						target: childId,
						...commonEdgeProperties
					});

					parseRelationships(
						parent,
						providerId,
						currentId,
						currentType,
						parsedData
					);
				});
			}
		}
		if (data.children) {
			if (Array.isArray(data.children)) {
				data.children.forEach((child: ModelRelationships) => {
					const parentId = data.external_model_id ?? currentId;
					const childId = child.external_model_id ?? "";

					parsedData.edges.push({
						id: `e${parentId}-${childId}`,
						source: parentId,
						target: childId,
						...commonEdgeProperties
					});
					parseRelationships(
						child,
						providerId,
						currentId,
						currentType,
						parsedData
					);
				});
			}
		}
	}

	return parsedData;
};

export default parseRelationships;
