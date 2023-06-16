import { getMasterNodesAndEdges } from "./JsonHelper";
import { getElements } from "./DataConverter";
import { DataTypeValue } from "../util/DataTypeUtil";
import { Node } from "../models/Node";
import { Edge } from "../models/Edge";

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

export const newNodes = [
  {
    id: '1',
    data: { label: 'node 1 ' },
    position,
  },
  {
    id: '2',
    data: { label: 'node 2' },
    position,
  },
];

export const newEdges = [
  { id: 'e12', source: '1', target: '2', type: edgeType  ,extra1: edgeType , extra2: edgeType}
];




export const getNodesAndEdges = (dataType: DataTypeValue ,value:string): [Node[],Edge[]] =>{
  const emptyData: [Node[],Edge[]] = [[], []];
  const element: any = getElements(dataType,value);

  if(element === null){
    return emptyData;
  }

  const [nodes,edges] = getMasterNodesAndEdges(element);
  if(nodes === undefined || edges === undefined){
    return emptyData;
  }

  return  [nodes,edges];
}
