import { DataTypeValue } from "../util/DataTypeUtil";

const convertYamlToJson = (codeText: string): string => {
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

const convertXmlToJson = (codeText: string): string => {
  let convert = require("xml-js");
  try {
    if (typeof codeText !== "undefined" && codeText !== "") {
      let result = convert.xml2json(codeText, { compact: false, spaces: 4 });
      return JSON.stringify(result);
    } else {
      return "";
    }
  } catch (exp) {
    console.log("XML parsing exp: ", exp);
    return "INVALID XML";
  }
};

const convertToJson = (dataType: DataTypeValue, codeText: string): string => {
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

  if (typeof result === "string") {
    return result;
  }
  return "";
};


const parseJson = (str: string): string | null => {
  try {
    let parsedObj = JSON.parse(str);
    return parsedObj;
  } catch (e) {
    return null;
  }
};

export const getElements =(dataType: DataTypeValue, codeText: string) =>{
  const jsonStr= convertToJson(dataType, codeText);
  const element= parseJson(jsonStr);
  return element;

}
