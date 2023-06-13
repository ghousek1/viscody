import { getMasterNodesAndEdges } from "./JsonHelper.js";
import { getElements } from "./DataConverter.js";

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




export const getNodesAndEdges = (dataType,value) =>{
  const emptyData = [[], []];
  const element = getElements(dataType,value);

  if(element === null){
    return emptyData;
  }

  const [nodes,edges] = getMasterNodesAndEdges(element);
  if(nodes === undefined || edges === undefined){
    return emptyData;
  }

  return  [nodes,edges];
}
