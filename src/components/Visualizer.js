import React, { useContext, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { DataTypeContext } from "../context/DataTypeContext";
import { ThemeContext } from "../context/ThemeContext";
import {convertToJson} from ".././helper/DataConverter"
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";

function Visualizer(props) {
  const [dataType, changeDataType] = useContext(DataTypeContext);
  const [userThemeMode, toggleUserThemeMode] = useContext(ThemeContext);

  const initialNodes = [
    { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
    { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
    { id: "3", position: { x: 0, y: 150 }, data: { label: "3" } },
  ];
  const initialEdges = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e3-1", source: "3", target: "1" },
  ];

  const renderVisualization = (dataType, codeText) => {
    if (dataType === "csv") {
      return <></>;
      //   <CsvToHtmlTable
      //     data={sampleData}
      //     csvDelimiter=","
      //   />
    }

    return convertToJson(codeText);
  };
  return (
    <>
      <div
        id="visualizer"
        // style={customStyle}
        className=" w-full h-[100%]  
         border-gray-500 border-[0.1rem]"
      >
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          attributionPosition="top-right"
          elevateNodesOnSelect={true}
        >
          <Background variant="dots" style={{ background: "white" }} />
          <Controls position="top-right" style={{ background: "black" }} />
          <MiniMap position = "bottom-right" zoomable pannable/>
        </ReactFlow>

      </div>
    </>
  );
}

export default Visualizer;
