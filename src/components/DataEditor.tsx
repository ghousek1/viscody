import React, { ReactElement, useContext } from "react";
import Editor from "@monaco-editor/react";
import { DataTypeContext, IDataTypeContextType } from "../context/DataTypeContext";
import { IThemeContextType, ThemeContext } from "../context/ThemeContext";

interface IDataEditorProps{
  handleEditorChange(value: string|undefined): void;
}

const DataEditor = ({handleEditorChange}: IDataEditorProps): ReactElement => {
  
const editorDataTypeMap = {
    json: "json",
    yaml: "yaml",
    xml: "xml",
    csv: "csv",
  };

  const dataTypeContext = useContext<IDataTypeContextType>(DataTypeContext);
  const userThemeModeContext = useContext<IThemeContextType>(ThemeContext);

  return (
    <>
      <Editor
        className="w-[100%]"
        defaultLanguage={editorDataTypeMap[dataTypeContext.dataType]}
        theme={userThemeModeContext.themeMode === "dark" ? "vs-dark" : "vs-light"}
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
