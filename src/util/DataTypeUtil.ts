export type ObjectDataType = "mono"|"object"|"array"|"no-type";

export const identifyObjectDataType = (val: any): ObjectDataType => {
    if (val === null || val === undefined) {
      return "no-type";
    }
  
    if (Array.isArray(val)) {
      return "array";
    }
  
    if (val instanceof Object && !Array.isArray(val)) {
      return "object";
    }
  
    return "mono";
  };
  
  export type DataTypeValue = "json" | "yaml" | "toml" | "xml" | "csv";
