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
  const element = getElements(dataType,value);

  
  if(element === null){
    return [[],[]];
  }

  const [nodes,edges] = getMasterNodesAndEdges(element);
  // console.log("nodes: ",nodes);

  return [nodes,[]];

  
}
