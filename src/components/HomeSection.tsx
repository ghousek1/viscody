import React, { ReactElement } from "react";
import './HomeSection.css';
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
import { SplitPaneProps} from "react-split-pane";

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

  const splitPaneProps: SplitPaneProps ={
     split:"vertical",
     minSize:300,
     defaultSize:"30%",
     maxSize:-300
  }

  const mobileViewSplitPaneProps: SplitPaneProps ={
    split:"horizontal",
    minSize:200,
    defaultSize:"25%",
    maxSize:-200
 }

  return (
    <div id="container-id" className="relative h-[100vh]">
    
      <SplitPane {...splitPaneProps} >
        <div
          id="sidebar-content-id"
                    className="h-[100%] flex-1 resize-y overflow-auto"
        >
          <DataEditor handleEditorChange={handleEditorChange} />
        </div>

        <div id="content-id" className="flex-1 h-[100%] z-1">
          <Visualizer
            codeText={codeText}
            newNodes={newNodes}
            newEdges={newEdges}
          />
        </div>
      </SplitPane>
      
     </div>
  );
}

export default HomeSection;
