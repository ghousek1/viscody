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
  let masterNodeAndEdges = getNodeAndEdgeBasedOnType(
    element,
    elementName,
    null
  );
  let masterNodes = masterNodeAndEdges.map((ne) => ne.node);
  let masterEdges = masterNodeAndEdges.map((ne) => ne.edge);

  nodes.push(...masterNodes);
  edges.push(...masterEdges);

  if (masterNodes.length === 0) {
    return [nodes, edges];
  }

  [nodes, edges] = superFunc(nodes, edges, masterNodes);

  return [nodes, edges];
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
    let masterNodeAndEdges = getNodeAndEdgeBasedOnType(
      element[i],
      elementName,
      null
    );
    let masterNodes = masterNodeAndEdges.map((ne) => ne.node);
    let masterEdges = masterNodeAndEdges.map((ne) => ne.edge);

    multiMasterNodes.push(...masterNodes);
    edges.push(...masterEdges);
  }

  nodes.push(...multiMasterNodes);

  if (multiMasterNodes.length === 0) {
    return nodes;
  }

  [nodes, edges] = superFunc(nodes, edges, multiMasterNodes);

  return [nodes, edges];
};

const getNodeAndEdgeBasedOnType = (element, elementName, parentId) => {
  let dataType = identifyJsonDataType(element);
  if (dataType === "object") {
    let resultNodeAndEdge = processObjectTypeNode(
      element,
      elementName,
      parentId
    );
    return [resultNodeAndEdge];
  }

  if (dataType === "array") {
    let resultNodeAndEdges = processArrayTypeNode(
      element,
      elementName,
      parentId
    );
    return resultNodeAndEdges;
  }

  if (dataType === "mono") {
    let resultNodeAndEdge = processMonoTypeNode(element, elementName, parentId);

    return [resultNodeAndEdge];
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
  let ultraNode = {};
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

  let ultraNodeId = generateIdOfElem(parentId, elementName);
  ultraNode["id"] = ultraNodeId;
  ultraNode["parentId"] = parentId;
  ultraNode["value"] = flatElem;
  ultraNode["data"] = { label: JSON.stringify(flatElem ,null, 4) };
  ultraNode["nestedElements"] = nestedElements;
  ultraNode["position"] = position;

  let ultraEdge = {};
  ultraEdge["id"] = `edge-${ultraNodeId}`;
  ultraEdge["source"] = parentId;
  ultraEdge["target"] = ultraNodeId;
  ultraEdge["type"] = edgeType;

  return { node: ultraNode, edge: ultraEdge };
};

const processArrayTypeNode = (element, elementName, parentId) => {
  element = element.flat();

  let ultraNodeAndEdges = [];

  for (let i = 0; i < element.length; i++) {
    let el = element[i];
    let ultraNode = {};
    let ultraNodeId = generateIdOfElem(parentId, elementName);
    ultraNode["id"] = ultraNodeId;
    ultraNode["parentId"] = parentId;

    let key = `${elementName}-${i}`;

    let dataType = identifyJsonDataType(el);
    //no possiblity of array inside
    if (dataType === "object") {
      let temp = new Object();
      temp[key] = el;
      let nestedElements = [];
      nestedElements.push(temp);
      ultraNode["value"] = "<Object>";
      ultraNode["data"] = { label: "<Object>" };

      ultraNode["nestedElements"] = nestedElements;
    } else {
      ultraNode["value"] = el;
      ultraNode["data"] = { label: el };
      ultraNode["nestedElements"] = [];
    }

    ultraNode["position"] = position;

    let ultraEdge = {};
    ultraEdge["id"] = `edge-${ultraNodeId}`;
    ultraEdge["source"] = parentId;
    ultraEdge["target"] = ultraNodeId;
    ultraEdge["type"] = edgeType;

    ultraNodeAndEdges.push({ node: ultraNode, edge: ultraEdge });
  }

  return ultraNodeAndEdges;
};

const processMonoTypeNode = (element, elementName, parentId) => {
  let ultraNode = {};
  let ultraNodeId = generateIdOfElem(parentId, elementName);
  ultraNode["id"] = ultraNodeId;
  ultraNode["parentId"] = parentId;
  ultraNode["value"] = element;
  ultraNode["data"] = { label: element };
  ultraNode["nestedElements"] = [];
  ultraNode["position"] = position;

  let ultraEdge = {};
  // { id: 'e12', source: '1', target: '2', type: edgeType }
  ultraEdge["id"] = `edge-${ultraNodeId}`;
  ultraEdge["source"] = parentId;
  ultraEdge["target"] = ultraNodeId;
  ultraEdge["type"] = edgeType;

  return { node: ultraNode, edge: ultraEdge };
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

      let nodeAndEdgesOfObject = getNodeAndEdgeBasedOnType(
        elementVal,
        elementKey,
        parentId
      );
      let nodesOfObject = nodeAndEdgesOfObject.map((ne) => ne.node);
      let edgesOfObject = nodeAndEdgesOfObject.map((ne) => ne.edge);

      if (nodesOfObject !== null && nodesOfObject.length != 0) {
        newNodes.push(...nodesOfObject);
      }

      if (edgesOfObject !== null && edgesOfObject.length != 0) {
        newEdges.push(...edgesOfObject);
      }
    }
  }

  return [newNodes, newEdges];
};
