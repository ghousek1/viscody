import React, { useContext, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { DataTypeContext } from "../context/DataTypeContext";
import { ThemeContext } from "../context/ThemeContext";
// import XMLParser from "react-xml-parser";

function Visualizer(props) {
  const [dataType, changeDataType] = useContext(DataTypeContext);
  const [userThemeMode, toggleUserThemeMode] = useContext(ThemeContext);

  const visualizerDataTypeMap = {
    json: "json",
    yaml: "yaml",
    xml: "xml",
    csv: "csv",
  };

  const convertYamlToJson = (codeText) => {
    const yaml = require("js-yaml");
    try {
      if (typeof codeText !== "undefined" && codeText !== "") {
        const result = yaml.load(codeText);
        return JSON.stringify(result).toString();
      } else {
        return "";
      }
    } catch (exp) {
      return "INVALID YAML";
    }
  };

  const convertXmlToJson = (codeText) => {
    var convert = require("xml-js");
    try {
      if (typeof codeText !== "undefined" && codeText !== "") {
        // var result = convert.xml2json(codeText, { compact: true, spaces: 4 });
        var result = convert.xml2json(codeText, { compact: false, spaces: 4 });
        //console.log(result, "\n", result2);
        return JSON.stringify(result);
      } else {
        return "";
      }
    } catch (exp) {
      console.log("XML parsing exp: ",exp);
      return "INVALID XML";
    }
  };

  const convertToJson = (codeText) => {
    // const yaml = require("js-yaml");
    let result = "";
    switch (dataType) {
      case "json":
        result = codeText;
        break;
      case "yaml":
        result = convertYamlToJson(codeText);
        break;
      case "xml":
        result = convertXmlToJson(codeText);
        break;
      case "csv":
        result = "CSV";
        break;
      default:
        result = "";
    }

    console.log("type of data: ", typeof result);

    if (typeof result === "string") {
      return result;
    }
    return "";
  };

  return (
    <>
      <div id="visualizer" className="h-[40vh] w-full md:h-screen md:w-[60%]">
        <SyntaxHighlighter language={visualizerDataTypeMap[dataType]}>
        {convertToJson(props.codeText)}
        </SyntaxHighlighter>
      </div>
    </>
  );
}

export default Visualizer;
