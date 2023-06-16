import React, { ReactElement,FC } from "react";
import {
  useState,
  useRef,
  useCallback,
  useContext,
  useEffect,
  MouseEvent,
} from "react";
import Visualizer from "./Visualizer";
import DataEditor from "./DataEditor";
import {
  DataTypeContext,
  IDataTypeContextType,
} from "../context/DataTypeContext";
import SplitPane from "react-split-pane";
import { Split } from "react-split-pane";

import { getNodesAndEdges } from "../helper/NodesAndEdgesMaker";
import { Node } from "../models/Node";
import { Edge } from "../models/Edge";

const HomeSection = (): ReactElement => {
  const dataTypeContext = useContext<IDataTypeContextType>(DataTypeContext);

  const [codeText, setCodeText] = useState<string>("");
  const [newNodes, setNewNodes] = useState<Node[]>([]);
  const [newEdges, setNewEdges] = useState<Edge[]>([]);

  function handleEditorChange(value: string): void {
    setCodeText(value);
  }

  useEffect(() => {
    let [newUpdatedNodes, newUpdatedEdges] = getNodesAndEdges(
      dataTypeContext.dataType,
      codeText
    );
    setNewNodes([...newUpdatedNodes]);
    setNewEdges([...newUpdatedEdges]);
  }, [codeText]);

  // const sidebarRef = useRef(null);

  return (
    <div id="container-id" className="relative flex h-[100vh] flex-row">
    
      
      {/* <SplitPane split="vertical" minSize={200} defaultSize={200} maxSize={4}/> */}
        <div
          id="sidebar-content-id"
          className="h-[100%]
        flex-1 resize-y overflow-auto"
        >
          <DataEditor handleEditorChange={handleEditorChange} />
        </div>

        <div id="content-id" className="flex-1 z-1">
          <Visualizer
            codeText={codeText}
            newNodes={newNodes}
            newEdges={newEdges}
          />
        </div>
      {/* </SplitPane> */}
    </div>
  );
}

export default HomeSection;
