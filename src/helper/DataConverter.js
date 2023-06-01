

export const convertYamlToJson = (codeText) => {
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


  export const convertXmlToJson = (codeText) => {
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
      console.log("XML parsing exp: ", exp);
      return "INVALID XML";
    }
  };


  export const convertToJson = (dataType,codeText) => {
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