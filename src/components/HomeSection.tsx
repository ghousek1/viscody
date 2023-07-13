import { useResizeObserver } from "@react-hookz/web";
import type { TabsProps } from "antd";
import { Tabs } from "antd";
import {
  ReactElement, useContext,
  useEffect, useRef, useState
} from "react";
import SplitPane, { SplitPaneProps } from "react-split-pane";
import {
  DataTypeContext,
  IDataTypeContextType,
} from "../context/DataTypeContext";
import DataEditor from "./DataEditor";
import "./HomeSection.css";
import Visualizer from "./Visualizer";

import { getNodesAndEdges } from "../helper/NodesAndEdgesMaker";
import { EdgeModel } from "../models/EdgeModel";
import { NodeModel } from "../models/NodeModel";

interface HomeSectionProps {
  getVisualizerRef(value: any | null): void;
}
const HomeSection = ({ getVisualizerRef }: HomeSectionProps): ReactElement => {
  const dataTypeContext = useContext<IDataTypeContextType>(DataTypeContext);

  const containerRef = useRef(null);

  const [mobileView, setMobileView] = useState<boolean>(false);
  const [codeText, setCodeText] = useState<string>("");
  const [newNodes, setNewNodes] = useState<NodeModel[]>([]);
  const [newEdges, setNewEdges] = useState<EdgeModel[]>([]);


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


  useResizeObserver(containerRef, (resizeObserver) => {
    const containerWidth = resizeObserver?.contentRect?.width;
    if (containerWidth <= 768) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  });

 


  const MobileViewDataEditor = (
    <div
      id="sidebar-content-id"
      className="h-[100vh] w-[100%] resize-y overflow-auto"
    >
      <DataEditor handleEditorChange={handleEditorChange} />
    </div>
  );
  const MobileViewVisualizer = (
    <div id="content-id" className="w-[100%] h-[100vh] z-1">
      <Visualizer
        codeText={codeText}
        newNodes={newNodes}
        newEdges={newEdges}
        getVisualizerRef={getVisualizerRef}
      />
    </div>
  );
  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: `Editor`,
      children: MobileViewDataEditor,
    },
    {
      key: "2",
      label: `Visualizer`,
      children: MobileViewVisualizer,
    },
  ];

 

  const splitPaneProps: SplitPaneProps = {
    split: "vertical",
    minSize: 300,
    defaultSize: "30%",
    maxSize: -300,
  };


  
  if (mobileView) {
    return (
      <div id="container-id" className="relative w-[100%] h-[100vh] " ref={containerRef}>
        <Tabs defaultActiveKey="1" items={tabItems}  />
      </div>
    );
  } else {
    return (
      <div id="container-id" className="relative h-[100vh]" ref={containerRef}>
        <SplitPane {...splitPaneProps}>
          <div
            id="sidebar-content-id"
            className="h-[100%] resize-y overflow-auto"
          >
            <DataEditor handleEditorChange={handleEditorChange} />
          </div>

          <div id="content-id" className=" h-[100%] z-1">
            <Visualizer
              codeText={codeText}
              newNodes={newNodes}
              newEdges={newEdges}
              getVisualizerRef={getVisualizerRef}
            />
          </div>
        </SplitPane>
      </div>
    );
  }
};

export default HomeSection;
