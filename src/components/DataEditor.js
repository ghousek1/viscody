import React, { useContext, useState } from "react";
import Editor from "@monaco-editor/react";
import { DataTypeContext } from "../context/DataTypeContext";
import { ThemeContext } from "../context/ThemeContext";

function DataEditor() {
  const editorDataTypeMap = {
    json: "json",
    yaml: "yaml",
    xml: "xml",
    csv: "csv",
  };

  const [codeText, setCodeText] = useState("");
  const [dataType, changeDataType] = useContext(DataTypeContext);
  const [userThemeMode, toggleUserThemeMode] = useContext(ThemeContext);

  function handleEditorChange(value, event) {
    setCodeText(value);
  }

  return (
    <>
      <div id="editor" className="h-[40vh] w-full md:h-screen md:w-[60%]">
        <Editor
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
    </>
  );
}

export default DataEditor;
