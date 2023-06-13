import { identifyJsonDataType } from "../util/DataTypeUtil";

const position = { x: 0, y: 0 };
const edgeType = "smoothstep";

export const getMasterNodesAndEdges = (element) => {
  const elementType = identifyJsonDataType(element);
  if (elementType === "array") {
    return getNodesAndEdgesOfArray(element);
  }

  return getNodesAndEdgesOfObject(element);
};


const getNodesAndEdgesOfObject = (element) => {
  let nodes = [];
  let edges = [];

  if (Object.keys(element).length === 0) {
    return nodes;
  }

  let elementName = "root";
  let masterNodes = getNodeBasedOnType(element, elementName, null);
  nodes.push(...masterNodes);
  if (masterNodes.length === 0) {
    return nodes;
  }

  [nodes, edges] = superFunc(nodes, edges, masterNodes);

  return [nodes, []];
};



const getNodesAndEdgesOfArray = (element) => {
  let nodes = [];
  let edges = [];
  if (element.length === 0) {
    return nodes;
  }

  let multiMasterNodes = [];
  element = element.flat();
  for (let i = 0; i < element.length; i++) {
    let elementName = `root~${i}`;
    let masterNodes = getNodeBasedOnType(element[i], elementName, null);
    multiMasterNodes.push(...masterNodes);
  }
  nodes.push(...multiMasterNodes);

  if (multiMasterNodes.length === 0) {
    return nodes;
  }

  [nodes, edges] = superFunc(nodes, edges, multiMasterNodes);

  return [nodes, []];
};

const getNodeBasedOnType = (element, elementName, parentId) => {
  let dataType = identifyJsonDataType(element);
  if (dataType === "object") {
    let resultNode = processObjectTypeNode(element, elementName, parentId);
    return [resultNode];
  }

  if (dataType === "array") {
    let resultNodes = processArrayTypeNode(element, elementName, parentId);
    return resultNodes;
  }

  if (dataType === "mono") {
    let resultNode = processMonoTypeNode(element, elementName, parentId);
    return [resultNode];
  }

  return [];
};

const generateIdOfElem = (parentId, elementName) => {
  if (parentId === null) {
    return elementName;
  }
  return `${parentId}-${elementName}`;
};

const processObjectTypeNode = (element, elementName, parentId) => {
  let ultraElem = {};
  let flatElem = {};
  let nestedElements = [];

  Object.entries(element).forEach((kv) => {
    let key = kv[0];
    let val = kv[1];
    let dataType = identifyJsonDataType(val);
    if (dataType === "array") {
      flatElem[key] = "<Array[" + val.length + "]>";
      let temp = new Object();
      temp[key] = val;
      nestedElements.push(temp);
    } else if (dataType === "object") {
      flatElem[key] = "<Object>";
      let temp = new Object();
      temp[key] = val;
      nestedElements.push(temp);
    } else {
      flatElem[key] = val;
    }
  });

  ultraElem["id"] = generateIdOfElem(parentId, elementName);
  ultraElem["parentId"] = parentId;
  ultraElem["value"] = flatElem;
  ultraElem["data"] = { label: JSON.stringify(flatElem) };
  ultraElem["nestedElements"] = nestedElements;
  ultraElem["position"] = position;
  return ultraElem;
};

const processArrayTypeNode = (element, elementName, parentId) => {
  element = element.flat();

  let ultraElems = [];

  for (let i = 0; i < element.length; i++) {
    let el = element[i];
    let ultraElem = {};

    ultraElem["id"] = generateIdOfElem(parentId, elementName);
    ultraElem["parentId"] = parentId;

    let key = `${elementName}-${i}`;

    let dataType = identifyJsonDataType(el);
    //no possiblity of array inside
    if (dataType === "object") {
      let temp = new Object();
      temp[key] = el;
      let nestedElements = [];
      nestedElements.push(temp);
      ultraElem["value"] = "<Object>";
      ultraElem["data"] = { label: "<Object>" };

      ultraElem["nestedElements"] = nestedElements;
    } else {
      ultraElem["value"] = el;
      ultraElem["data"] = { label: el };
      ultraElem["nestedElements"] = [];
    }

    ultraElem["position"] = position;

    ultraElems.push(ultraElem);
  }

  return ultraElems;
};

const processMonoTypeNode = (element, elementName, parentId) => {
  let ultraElem = {};
  ultraElem["id"] = generateIdOfElem(parentId, elementName);
  ultraElem["parentId"] = parentId;
  ultraElem["value"] = element;
  ultraElem["data"] = { label: element };
  ultraElem["nestedElements"] = [];
  ultraElem["position"] = position;
  return ultraElem;
};

const getElementsInNextLevel = (prevNodes) => {
  if (!prevNodes) {
    return 0;
  }

  let totalElements = 0;

  for (let prevNode of prevNodes) {
    let prevNodeElems = prevNode.nestedElements;
    totalElements += prevNodeElems.length;
  }

  return totalElements;
};

const superFunc = (nodes, edges, prevNodes) => {
  let elemententsInNextLevel = getElementsInNextLevel(prevNodes);
  if (elemententsInNextLevel === 0) {
    return [nodes, edges];
  }

  let [newNodes, newEdges] = getNewNodesAndEdges(prevNodes);
  nodes.push(...newNodes);
  edges.push(...newEdges);

  //recursion
  superFunc(nodes, edges, newNodes);

  return [nodes, edges];
};

const getNewNodesAndEdges = (nodes) => {
  let newNodes = [];
  let newEdges = [];

  for (let node of nodes) {
    let parentId = node.id;
    for (let element of node.nestedElements) {
      let elementKey = Object.keys(element)[0];
      let elementVal = Object.values(element)[0];
      let nodesOfObject = getNodeBasedOnType(elementVal, elementKey, parentId);

      if (nodesOfObject !== null && nodesOfObject.length != 0) {
        newNodes.push(...nodesOfObject);
      }
    }
  }

  return [newNodes, newEdges];
};
