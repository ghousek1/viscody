// import React from "react";
// import { useState, useRef, useCallback,useContext ,useEffect,MouseEvent} from "react";
// import Visualizer from "./Visualizer";
// import DataEditor from "./DataEditor";
// import { DataTypeContext, IDataTypeContextType } from "../context/DataTypeContext";
// import { IThemeContextType, ThemeContext } from "../context/ThemeContext";


// import { getNodesAndEdges } from "../helper/NodesAndEdgesMaker";
// import { Node } from "../models/Node";
// import { Edge } from "../models/Edge";

// function HomeSection() {
//   const dataTypeContext = useContext<IDataTypeContextType>(DataTypeContext);

//   const [codeText, setCodeText] = useState<string>("");
//   const [newNodes, setNewNodes] = useState<Node[]>([]);
//   const [newEdges, setNewEdges] = useState<Edge[]>([]);
  
//   function handleEditorChange(value: string): void {
//     setCodeText(value);
//   }

//   useEffect(() => {
//     let [newUpdatedNodes, newUpdatedEdges] = getNodesAndEdges(dataTypeContext.dataType,codeText);
//     setNewNodes([...newUpdatedNodes]);
//     setNewEdges([...newUpdatedEdges]);
//   }, [codeText]); 

//   const sidebarRef = useRef(null);
//   const [isResizing, setIsResizing] = useState(false);
//   const [sidebarWidth, setSidebarWidth] = useState(null);

//   const startResizing = useCallback((e: MouseEvent): void => {
//     setIsResizing(true);
//   }, []);

//   const stopResizing = useCallback(() => {
//     setIsResizing(false);
//   }, []);

//   const resize = useCallback(
//     (me: MouseEvent<HTMLDivElement, MouseEvent>) => {
//       if (isResizing) {
//         setSidebarWidth(
//           me.clientX -
//             sidebarRef.current.getBoundingClientRect().left
//         );
//       }
//     },
//     [isResizing]
//   );

//   React.useEffect(() => {
//     window.addEventListener("mousemove", resize);
//     window.addEventListener("mouseup", stopResizing);
//     return () => {
//       window.removeEventListener("mousemove", resize);
//       window.removeEventListener("mouseup", stopResizing);
//     };
//   }, [resize, stopResizing]);

//   return (
//     <div id="container-id" className="relative flex h-[100vh] flex-row">
//       <div
//         ref={sidebarRef}
//         id="sidebar"
//         style={{ width: sidebarWidth }}
//         className="z-2 flex w-[35%] min-w-[20%]
//          max-w-[70%] flex-row "
//         onMouseDown={(e) => e.preventDefault()}
//       >
//         <div
//           id="sidebar-content-id"
//           className="h-[100%]
//         flex-1 resize-y overflow-auto"
//         >
//           <DataEditor handleEditorChange={handleEditorChange} />
//         </div>

//         <div
//           id="sidebar-resizer-id"
//           className=" z-3
//               basis-2 cursor-col-resize 
//               hover:w-[3rem] hover:bg-gray-500"
//           onMouseDown={startResizing}
//         ></div>
//       </div>

//       <div id="content-id" className="flex-1 z-1">
//         <Visualizer
//           codeText={codeText}
//           newNodes={newNodes}
//           newEdges={newEdges}
//         />
//       </div>
//     </div>
//   );
// }

// export default HomeSection;
