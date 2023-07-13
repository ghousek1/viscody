import { getMasterNodesAndEdges } from "./JsonHelper";
import { getElements } from "./DataConverter";
import { DataTypeValue } from "../util/DataTypeUtil";
import { NodeModel } from "../models/NodeModel";
import { EdgeModel } from "../models/EdgeModel";


export const getNodesAndEdges = (
  dataType: DataTypeValue,
  value: string
): [NodeModel[], EdgeModel[]] => {
  const emptyData: [NodeModel[], EdgeModel[]] = [[], []];
  const element: any = getElements(dataType, value);

  if (element === null) {
    return emptyData;
  }

  const [nodes, edges] = getMasterNodesAndEdges(element);
  if (nodes === undefined || edges === undefined) {
    return emptyData;
  }

  const newNodes: NodeModel[] = [];
  for (let node of nodes) {
    node.text=node.data.label;
    // node.height=150;
    newNodes.push(node);
  }

  const newEdges: EdgeModel[] = [];
  for (let edge of edges) {
    edge.from = edge.source;
    edge.to = edge.target;
    newEdges.push(edge);
  }
  
  return [newNodes, newEdges];
};
