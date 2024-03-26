import ReactFlow from "reactflow";
// import "reactflow/dist/style.css";
import "reactflow/dist/base.css";

const initialNodes = [
	{ id: "1", data: { label: "Grandfather" }, position: { x: 0, y: 0 } },
	{ id: "2", data: { label: "Grandmother" }, position: { x: 100, y: 0 } },
	{ id: "3", data: { label: "Father" }, position: { x: 0, y: 100 } },
	{ id: "4", data: { label: "Mother" }, position: { x: 100, y: 100 } },
	{ id: "5", data: { label: "You" }, position: { x: 50, y: 200 } },
];

const initialEdges = [
	{ id: "e1-2", source: "1", target: "3" },
	{ id: "e2-1", source: "2", target: "3" },
	{ id: "e3-4", source: "3", target: "5" },
	{ id: "e4-5", source: "4", target: "5" },
];

function Flow() {
	return (
		<div style={{ height: "300px", width: "50%" }}>
			<ReactFlow
				nodes={initialNodes}
				edges={initialEdges}
				fitView
				proOptions={{
					hideAttribution: true,
				}}
				preventScrolling={false}
				zoomOnScroll={false}
				zoomOnPinch={false}
				zoomOnDoubleClick={false}
				selectNodesOnDrag={false}
				connectOnClick={false}
				nodesConnectable={false}
				nodesDraggable={false}
				nodesFocusable={false}
				elementsSelectable={false}
			></ReactFlow>
		</div>
	);
}

export default Flow;
