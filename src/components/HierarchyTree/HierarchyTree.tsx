import Dagre from "@dagrejs/dagre";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, {
	Background,
	BackgroundVariant,
	MiniMap,
	Node,
	useReactFlow
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

const HierarchyTree = ({
	data,
	modelId: currentModelId,
	providerId
}: IHierarchyTreeProps) => {
	const [reactFlowHeight, setReactFlowHeight] = useState<number>(500); // set initial height so it doesnt bug out when changing model pages
	const { fitView } = useReactFlow();
	const containerRef = useRef<HTMLDivElement>(null);
	const parsedData = useMemo(
		() => parseKnowledgeGraph(data, providerId, currentModelId),
		[data, providerId, currentModelId]
	);

	const updateHeight = useCallback(() => {
		if (containerRef.current) {
			setReactFlowHeight(containerRef.current.scrollHeight);
		}
	}, []);

	useEffect(() => {
		updateHeight();
		window.addEventListener("resize", updateHeight);
		return () => {
			window.removeEventListener("resize", updateHeight);
		};
	}, [updateHeight]);

	useEffect(() => {
		fitView();
	}, [fitView, parsedData.nodes, parsedData.edges]);

	const layoutGraph = useMemo(() => {
		const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
		g.setGraph({ rankdir: "LR" }); // Could also be TB so the tree is vertical. Need to update custom node if using TB

		parsedData.edges.forEach((edge) => g.setEdge(edge.source, edge.target));
		parsedData.nodes.forEach((node) => g.setNode(node.id, node));

		Dagre.layout(g);

		return g;
	}, [parsedData]);

	return (
		<div
			ref={containerRef} // Use the ref here
			style={{ height: reactFlowHeight + "px", width: "100%" }}
		>
			<ReactFlow
				nodes={parsedData.nodes.map((node) => ({
					...node,
					position: {
						x: node.x - node.width / 2,
						y: node.y - node.height / 2
					}
				}))}
				edges={parsedData.edges}
				proOptions={{
					hideAttribution: true
				}}
				nodeTypes={nodeTypes}
			>
				<Background color="#ebebeb" variant={BackgroundVariant.Lines} />
				<MiniMap />
			</ReactFlow>
		</div>
	);
};

export default HierarchyTree;
