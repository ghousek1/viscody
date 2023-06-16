import React, { ReactElement, useContext } from "react";
import { DataTypeContext, IDataTypeContextType } from "../context/DataTypeContext";
import GraphVisualizer from "./GraphVisualizer";
import CsvVisualizer from "./CsvVisualizer";
import { Edge } from "../models/Edge";
import { Node } from "../models/Node";

interface IVisualizerProps{
  codeText: string;
  newNodes: Node[];
  newEdges: Edge[];
}

const Visualizer = ({ codeText, newNodes, newEdges }: IVisualizerProps): ReactElement => {

  const dataTypeContext = useContext<IDataTypeContextType>(DataTypeContext);

  if (dataTypeContext.dataType === "csv") {
    return <CsvVisualizer codeText={codeText} />;
  }

  return (
    <GraphVisualizer
      codeText={codeText}
      newNodes={newNodes}
      newEdges={newEdges}
    />
  );
}

export default Visualizer;
