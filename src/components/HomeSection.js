import React, { useContext, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import Editor from "@monaco-editor/react";
import { DataTypeContext } from "../context/DataTypeContext";
import { ThemeContext } from "../context/ThemeContext";
import Visualizer from "./Visualizer";

function HomeSection() {
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

  return (
    <>
      <div
        id="homeSection"
        className="flex flex-col items-center w-full h-full my-3 md:flex-row"
      >
        <div id="editor" className="h-[40vh] w-full md:h-screen md:w-[35%]">
          <Editor
          width={100}
            defaultLanguage={editorDataTypeMap[dataType]}
            theme={userThemeMode === "dark" ? "vs-dark" : "vs-light"}
            defaultValue=""
            options={{
              minimap: {
                enabled: false,
              },
              matchBrackets: "always",
              automaticLayout: true,
              wordWrap: "on",
            }}
            onChange={handleEditorChange}
          />
        </div>

        <Visualizer codeText={codeText}/>
      </div>
    </>
  );
}

export default HomeSection;
