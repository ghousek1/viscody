import React, { useCallback, useContext } from "react";
import ReactFlow, {
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  Background,
} from "reactflow";
import dagre from "dagre";

import "reactflow/dist/style.css";
import { ThemeContext } from "../context/ThemeContext";
import { useEffect,useState } from "react";


const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 160;
const nodeHeight = 36;


const initialNodes = [];
const initialEdges = [];

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? "left" : "top";
    node.sourcePosition = isHorizontal ? "right" : "bottom";

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

function Visualizer2({ newNodes, newEdges }) {
  const [userThemeMode, ] = useContext(ThemeContext);
  const [layoutDirection, ] = useState("TB");

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  useEffect(() => {
    rerenderLayout(newNodes, newEdges);
  }, [newNodes, newEdges]);

  const rerenderLayout = (newNodes, newEdges) => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = 
        getLayoutedElements(newNodes,newEdges,layoutDirection);
      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
  };

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: false },
          eds
        )
      ),
    []
  );

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  const darkVisMode = {
    background: "#fcfcfc",
  };

  const lightVisMode = {
    background: "#141414",
  };

  return (
    <>
      <div id="visualizer" className=" h-[100%] w-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
        >
          <Background
            variant="dots"
            style={userThemeMode === "dark" ? lightVisMode : darkVisMode}
          />

          <Controls
            position="top-right"
            style={userThemeMode === "dark" ? lightVisMode : darkVisMode}
          />

          <MiniMap
            position="bottom-right"
            zoomable
            pannable
            style={userThemeMode === "dark" ? lightVisMode : darkVisMode}
          />

          {/* <Panel position="top-right">
        <button onClick={() => onLayout('TB')}>vertical layout</button>
        <button onClick={() => onLayout('LR')}>horizontal layout</button>
      </Panel> */}
        </ReactFlow>
      </div>
    </>
  );
}

export default Visualizer2;
