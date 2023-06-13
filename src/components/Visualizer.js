import React, { useContext,useEffect } from "react";

import { DataTypeContext } from "../context/DataTypeContext";
import GraphVisualizer from "./GraphVisualizer";
import CsvVisualizer from "./CsvVisualizer";

function Visualizer({ codeText, newNodes, newEdges }) {

  const [dataType,] = useContext(DataTypeContext);

  if (dataType === "csv") {
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
