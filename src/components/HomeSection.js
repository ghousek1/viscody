import React from "react";
import { useState, useRef, useCallback,useContext } from "react";
import Visualizer2 from "./Visualizer2";
import DataEditor from "./DataEditor";
import { DataTypeContext } from "../context/DataTypeContext";

import { getNodesAndEdges } from ".././helper/NodesAndEdgesMaker";

function HomeSection() {
  const [dataType ,] = useContext(DataTypeContext);
  const [codeText, setCodeText] = useState("");
  const [newNodes, setNewNodes] = useState([]);
  const [newEdges, setNewEdges] = useState([]);
  
  function handleEditorChange(value, event) {
    setCodeText(value);
    let [newUpdatedNodes, newUpdatedEdges] = getNodesAndEdges(dataType,value);
    setNewNodes([...newUpdatedNodes]);
    setNewEdges([...newUpdatedEdges]);
  }

  const sidebarRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(null);

  const startResizing = useCallback((mouseDownEvent) => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        setSidebarWidth(
          mouseMoveEvent.clientX -
            sidebarRef.current.getBoundingClientRect().left
        );
      }
    },
    [isResizing]
  );

  React.useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <div id="container-id" className="relative flex h-[100vh] flex-row">
      <div
        ref={sidebarRef}
        id="sidebar"
        style={{ width: sidebarWidth }}
        className="z-2 flex w-[35%] min-w-[20%]
         max-w-[70%] flex-row "
        onMouseDown={(e) => e.preventDefault()}
      >
        <div
          id="sidebar-content-id"
          className="h-[100%]
        flex-1 resize-y overflow-auto"
        >
          <DataEditor handleEditorChange={handleEditorChange} />
        </div>

        <div
          id="sidebar-resizer-id"
          className=" z-3
              basis-2 cursor-col-resize 
              hover:w-[3rem] hover:bg-gray-500"
          onMouseDown={startResizing}
        ></div>
      </div>

      <div id="content-id" className="flex-1 z-1">
        <Visualizer2
          newNodes={newNodes}
          newEdges={newEdges}
        />
      </div>
    </div>
  );
}

export default HomeSection;
