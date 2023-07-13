import { useState } from "react";
import "../App.css";
import { DataTypeContext } from "./DataTypeContext";
import { DataTypeValue } from "../util/DataTypeUtil";

const DataTypeContextProvider = (props: any) => {
  const [dataType, setDataType] = useState<DataTypeValue>("json");

  const changeDataType = (value: DataTypeValue): void => {
    setDataType(value);
  };

  return (
    <>
      <DataTypeContext.Provider
        value={{
          dataType: dataType,
          changeDataType: changeDataType,
        }}
      >
        {props.children}
      </DataTypeContext.Provider>
    </>
  );
};

export default DataTypeContextProvider;
