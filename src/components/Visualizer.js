import React, { useContext, useState } from "react";
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
// import { nodes, edges } from '../helper/node-edges';

function Visualizer(props) {
  const [dataType, changeDataType] = useContext(DataTypeContext);
  const [userThemeMode, ] = useContext(ThemeContext);
 
  

  const nodes = [
    { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
    { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
    { id: "3", position: { x: 0, y: 150 }, data: { label: "3" } },
  ];
  const edges = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e3-1", source: "3", target: "1" },
  ];


  const darkVisMode = {
    background: '#fcfcfc',
  };

  const lightVisMode = {
    background: '#141414',
  };





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
        className=" w-full h-[100%]"
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          attributionPosition="top-right"
          elevateNodesOnSelect={true}
          fitView
        >
          <Background variant="dots" 
               style = { userThemeMode ==="dark" ? lightVisMode :  darkVisMode  } />

          <Controls position="top-right" 
              style = { userThemeMode ==="dark" ? lightVisMode :  darkVisMode } />

          <MiniMap position = "bottom-right" zoomable pannable 
              style = { userThemeMode ==="dark" ? lightVisMode :  darkVisMode  }/>
              
        </ReactFlow>

      </div>
    </>
  );
}

export default Visualizer;
