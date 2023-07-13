import { ReactElement, useContext, useEffect } from "react";
import { DataTypeContext, IDataTypeContextType } from "../context/DataTypeContext";
import { EdgeModel } from "../models/EdgeModel";
import { NodeModel } from "../models/NodeModel";
import CsvVisualizer from "./CsvVisualizer";
import GraphVisualizer from "./GraphVisualizer";

import ErrorBoundry from "./ErrorBoundry";
import ErrorPage from "./ErrorPage";

interface IVisualizerProps{
  codeText: string;
  newNodes: NodeModel[];
  newEdges: EdgeModel[];
  getVisualizerRef(value: any|null): void;
}

const Visualizer = ({ codeText, newNodes, newEdges,getVisualizerRef }: IVisualizerProps): ReactElement => {



  const dataTypeContext = useContext<IDataTypeContextType>(DataTypeContext);

  useEffect(()=>{
    console.log("new nodes: ",newNodes);
  },[codeText])

  if (dataTypeContext.dataType === "csv") {
    return <CsvVisualizer codeText={codeText} />;
  }

  return (<>
    <ErrorBoundry fallback={<ErrorPage/>}>
    <GraphVisualizer
      codeText={codeText}
      newNodes={newNodes}
      newEdges={newEdges}
      getVisualizerRef={getVisualizerRef}
    />
    </ErrorBoundry>
    </>);
}

export default Visualizer;
