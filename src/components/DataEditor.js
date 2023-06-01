import React, { useContext } from "react";
import Editor from "@monaco-editor/react";
import { DataTypeContext } from "../context/DataTypeContext";
import { ThemeContext } from "../context/ThemeContext";

function DataEditor({handleEditorChange}) {
  
  const editorDataTypeMap = {
    json: "json",
    yaml: "yaml",
    xml: "xml",
    csv: "csv",
  };

  const [dataType] = useContext(DataTypeContext);
  const [userThemeMode] = useContext(ThemeContext);

  return (
    <>
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
          automaticLayout: true,
        }}
        onChange={handleEditorChange}
      />
    </>
  );
}

export default DataEditor;
