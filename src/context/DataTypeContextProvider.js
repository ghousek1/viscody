import { React, useState, useEffect } from "react";
import "../App.css";
import { DataTypeContext } from "./DataTypeContext";

function DataTypeContextProvider(props) {
  const [dataType, setDataType] = useState("json");

  const changeDataType = (value) => {
    setDataType(value);
  };

  return (
    <>
      <DataTypeContext.Provider value={[dataType, changeDataType]}>
        {props.children}
      </DataTypeContext.Provider>
    </>
  );
}

export default DataTypeContextProvider;
