import React from "react";
import { useState, useRef,useContext, useCallback } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import Editor from "@monaco-editor/react";
import { DataTypeContext } from "../context/DataTypeContext";
import { ThemeContext } from "../context/ThemeContext";
import Visualizer from "./Visualizer";

function HomeSection2() {
  const editorDataTypeMap = {
    json: "json",
    yaml: "yaml",
    xml: "xml",
    csv: "csv",
  };

  const [codeText, setCodeText] = useState("");
 
  const [editorTheme, setEditorTheme] = useState("vs-light");
  const [dataType, changeDataType] = useContext(DataTypeContext);
  const [userThemeMode, toggleUserThemeMode] = useContext(ThemeContext);

  function handleEditorChange(value, event) {
    setCodeText(value);
  }
  const sidebarRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(500);

  const startResizing = useCallback((mouseDownEvent) => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        setSidebarWidth(
          mouseMoveEvent.clientX -
            sidebarRef.current.getBoundingClientRect().left
        );
      }
    },
    [isResizing]
  );

  React.useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);


  return (
    <div id="container-id" className="relative flex flex-row h-[100vh]">
      <div
        ref={sidebarRef}
        id="sidebar"
        style={{ width: sidebarWidth }}
        className="z-2 w-[35%] min-w-[20%] max-w-[70%]
         flex flex-row
        border-r-black border-[0.1rem] "

        onMouseDown={(e) => e.preventDefault()}>

        <div id="sidebar-content-id" className="flex-1
        resize-y overflow-auto
         border-red-600 border-[0.25rem] opacity-[50%] h-[100%]">
        <Editor
        className="w-[100%]"
            defaultLanguage={editorDataTypeMap[dataType]}
            theme={userThemeMode === "dark" ? "vs-dark" : "vs-light"}
            defaultValue=""
            options={{
              minimap: {
                enabled: false,
              },
              matchBrackets: "always",
              wordWrap: "on",
              automaticLayout: true
            }}
            onChange={handleEditorChange}
          />
          {/* <div className="bg-red-400 w-[100%] h-[100%]">tests</div> */}
        </div>

        <div id="sidebar-resizer-id"
             className=" basis-2
              hover:w-[3rem] hover:bg-gray-500 
              cursor-col-resize z-10"
             onMouseDown={startResizing}>
        </div>

      </div>

      <div id="content-id" 
           className="z-1 flex-1 bg-fuchsia-400">
      <Visualizer codeText={codeText}/>
      </div>
    </div>
  );
}

export default HomeSection2;
