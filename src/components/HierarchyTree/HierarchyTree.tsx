import ReactFlow, {
	Node,
	MarkerType,
	Edge,
	Panel,
	useReactFlow,
	useNodesState,
	useEdgesState,
	ReactFlowProvider,
} from "reactflow";
import Dagre from "@dagrejs/dagre";
import CustomNode from "./CustomNode";
// import "reactflow/dist/style.css";
import "reactflow/dist/base.css";
import { useCallback, useEffect } from "react";

export interface INode {
	id: string;
	data: INodeData;
	position: INodePosition;
	type: string;
	className: string;
}

export interface INodeData {
	label: string;
	provider: string;
}

export interface INodePosition {
	x: number;
	y: number;
}

const initialNodes: Node[] = [
	{
		id: "1",
		type: "custom",
		data: { label: "input" },
		position: { x: 0, y: 0 },
	},
	{
		id: "2",
		type: "custom",
		data: { label: "node 2" },
		position: { x: 0, y: 0 },
		className: "current",
	},
	{
		id: "3",
		type: "custom",
		data: { label: "node 3" },
		position: { x: 0, y: 0 },
	},
];

const initialEdges = [
	{
		id: "e12",
		source: "1",
		target: "2",
		markerEnd: {
			type: MarkerType.ArrowClosed,
		},
	},
	{
		id: "e13",
		source: "2",
		target: "3",
		markerEnd: {
			type: MarkerType.ArrowClosed,
		},
	},
];

const nodeTypes = {
	custom: CustomNode,
};

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const LayoutFlow = () => {
	const { fitView } = useReactFlow();
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	useEffect(() => {
		// horizontal layout - less empty space than vertical since we currently don't have many nodes
		g.setGraph({ rankdir: "LR" });

		edges.forEach((edge) => g.setEdge(edge.source, edge.target));
		nodes.forEach((node) => g.setNode(node.id, node));

		Dagre.layout(g);

		setNodes(
			nodes.map((node) => {
				const { x, y } = g.node(node.id);

				return { ...node, position: { x, y } };
			})
		);
		setEdges(edges);

		window.requestAnimationFrame(() => {
			fitView();
		});
	}, [nodes, edges]);

	return (
		<ReactFlow
			nodes={nodes}
			edges={edges}
			onNodesChange={onNodesChange}
			onEdgesChange={onEdgesChange}
			nodeTypes={nodeTypes}
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
		></ReactFlow>
	);
};

const HierarchyTree = () => {
	return (
		<div style={{ height: "300px", width: "100%" }}>
			<ReactFlowProvider>
				<LayoutFlow />
			</ReactFlowProvider>
		</div>
	);
};

export default HierarchyTree;
