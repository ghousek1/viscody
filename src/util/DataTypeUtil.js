export const identifyJsonDataType = (val) => {
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
  